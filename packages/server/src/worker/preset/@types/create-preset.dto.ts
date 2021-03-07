import {IsString} from "class-validator";
import {JsonValidator} from "../../../@validation/json.validation";

export class CreatePresetDto {

    @IsString()
    name: string;

    @JsonValidator()
    data: string;
}
