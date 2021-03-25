import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { USER_REJECTED_FIELDS } from "./auth.config";
import { omit } from "back-common"
import { PROFILE_REJECTED_FIELDS } from "../user/profile.config";
import { AuthResponseDto } from "./@types/auth-response.dto";

@Injectable()
export class AuthResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((authResponse: AuthResponseDto) => {
        authResponse.user = omit(authResponse.user, USER_REJECTED_FIELDS);
        authResponse.user.profile = omit(
          authResponse.user.profile,
          PROFILE_REJECTED_FIELDS
        );
      })
    );
  }
}
