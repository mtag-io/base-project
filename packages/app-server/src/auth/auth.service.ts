import {Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {User} from "../user/user.entity";
import {AuthDto} from "./@types/auth.dto";
import {HttpSuccess} from "../@types/http.types";
import {JWT_PAYLOAD_FIELDS} from "./auth.config";
import {createAccessUrl, dbSuccess, httpSuccess} from "../@helpers";
import {uuid, pick} from "back-common"
import {ACTIONS} from "../@config/actions.config";
import {AuthResponseDto} from "./@types/auth-response.dto";
import {NotificationService} from "../notification/notification.service";
import {UserService} from "../user/user.service";
import {ProfileService} from "../user/profile.service";
import {LinkService} from "../link/link.service";
import {ResetPasswordDto} from "./@types/reset-password.dto";
import {EMAIL_VERIFY_EMAIL} from "../@constants";
import {ResourceExpiredException} from "../@errors/resource-expired.class";
import {APP_OPEN_AUTH} from "./auth.config";

@Injectable()
export class AuthService {
    private readonly _refreshSecret: string;
    private readonly _jwtSecret: string;
    private readonly _refreshExpiration: string;
    private readonly _jwtExpiration: string

    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService,
        private readonly linkService: LinkService,
        private readonly jwtService: JwtService,
        private readonly notificationService: NotificationService,
    ) {
        this._refreshSecret = process.env["REFRESH_SECRET"]
        this._jwtSecret = process.env["JWT_SECRET"]
        this._refreshExpiration = process["JWT_EXPIRATION"]
        this._jwtExpiration = process.env["JWT_EXPIRATION"]
    }

    async refreshHash(refreshToken) {
        return await bcrypt.hash(
            refreshToken,
            this._refreshSecret
        )
    }

    createAccessToken(user: User): string {
        const secret = this._jwtSecret
        const expiresIn = this._jwtExpiration
        return this.jwtService.sign(
            {...pick(user, JWT_PAYLOAD_FIELDS)},
            {secret, expiresIn}
        );
    }

    async createRefreshToken(): Promise<any> {
        const refreshToken = uuid(64)
        const refreshHash = this.refreshHash(refreshToken)
        const refreshExp = Date.now() + this._refreshExpiration
        return {
            refreshToken,
            refreshHash,
            refreshExp
        }
    }

    async authResponse(user: User): Promise<AuthResponseDto> {
        const accessToken = this.createAccessToken(user);
        const {refreshToken, refreshHash, refreshExp} = await this.createRefreshToken();
        const res = await this.userService.updateUser(
            user.userId,
            {refreshHash, refreshExp});
        if (!dbSuccess(res)) {
            throw new InternalServerErrorException("Couldn't update the user's data on login.");
        }
        return {
            user,
            accessToken,
            refreshToken
        };
    }

    async signIn(authDto: AuthDto): Promise<AuthResponseDto> {
        const user = await this.userService.validateUser(authDto);
        if (user) {
            return this.authResponse(user);
        } else throw new UnauthorizedException("Invalid login credentials");
    }

    async signup(authDto: AuthDto): Promise<AuthResponseDto | HttpSuccess> {
        const user = await this.userService.createUser(authDto);
        if (!APP_OPEN_AUTH) {
            await this.notificationService.send(ACTIONS.REGISTRATION_REQUEST, user);
            return httpSuccess("Email successfully sent. Please check your inbox for further instructions");
        }
        return this.authResponse(user);
    }

    googleLogin(req) {
        if (!req.user) {
            return 'No user from google'
        }

        return {
            message: 'User information from google',
            user: req.user
        }
    }


    async refreshToken(token: string): Promise<AuthResponseDto> {
        const refreshHash = await this.refreshHash(token)
        const user = await this.userService.getUser({refreshHash})
        if (!user) throw new UnauthorizedException('Invalid access credentials')
        if (!user.refreshExpired()) throw new ResourceExpiredException('Resource has expired')
        return this.authResponse(user)
    }

    async verifyEmailRequest(userId): Promise<HttpSuccess> {
        const user = await this.userService.getUser({userId});
        if (user) {
            if (user.verified) return httpSuccess("Email already verified");
            const {hash} = await this.linkService.createLink(
                {user, action: ACTIONS.EMAIL_VERIFY_EMAIL});
            await this.notificationService.send(
                ACTIONS.EMAIL_VERIFY_EMAIL,
                user,
                {url: createAccessUrl(hash, EMAIL_VERIFY_EMAIL)});
        } else throw new NotFoundException("User not found.");
        return httpSuccess("An email containing further instructions will be send" +
            " to the registered email address");
    }

    async verifyEmailAccess(hash: string): Promise<HttpSuccess> {
        const {userId} = await this.linkService.verifyLink({
            hash, action: ACTIONS.EMAIL_VERIFY_EMAIL
        });
        const res = await this.userService.updateUser(userId, {verified: true});
        if (!dbSuccess(res)) throw new InternalServerErrorException();
        return httpSuccess("Email verified");
    }

    async resetPasswordRequest(email: string): Promise<HttpSuccess> {
        const user = await this.userService.getUser({email});
        if (user) {
            const {hash} = await this.linkService.createLink({
                user, action: ACTIONS.RESET_PASSWORD_EMAIL
            });
            await this.notificationService.send(
                ACTIONS.RESET_PASSWORD_EMAIL,
                user,
                {url: createAccessUrl(hash, ACTIONS.RESET_PASSWORD_EMAIL)});
        }
        return httpSuccess("If registered, An email containing further instruction has been " +
            "successfully sent to the provided email address.");
    }

    async resetPasswordAccess(hash: string): Promise<void> {
        const link = await this.linkService.verifyLink({
            hash, action: ACTIONS.RESET_PASSWORD_EMAIL
        });
        const newLink = await this.linkService.createLink({
            user: link.user, action: ACTIONS.RESET_PASSWORD_PAGE
        });
        console.log(newLink);
        // return await resetPasswordPage({
        //   email: link.user.email,
        //   hash: newLink.hash
        // });
    }

    async resetPasswordSubmit(resetPasswordDto: ResetPasswordDto) {
        const link = await this.linkService.verifyLink({
            hash: resetPasswordDto.hash, action: ACTIONS.RESET_PASSWORD_PAGE
        });
        const ok = await this.userService.updateUser(
            link.userId,
            {password: resetPasswordDto.password});
        if (ok) return httpSuccess("Password update. Head back to login.");
        throw new NotFoundException("User not found");
    }
}