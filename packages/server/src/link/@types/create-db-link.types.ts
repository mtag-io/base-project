import {User} from "../../user/user.entity";
import {Actions} from "../../@types/index.types";

export interface CreateLink {
    user: User;
    action: Actions,
}