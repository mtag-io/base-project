import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:8080/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const userPayload = {
            user: {
                email: emails[0].value,
                profile: {
                    fullName: name.givenName + ' ' + name.familyName,
                    avatar: photos[0].value,
                }
            },
            accessToken
        }
        done(null, userPayload);
    }
}