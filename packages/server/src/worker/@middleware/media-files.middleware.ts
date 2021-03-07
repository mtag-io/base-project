import {SEQ_FILES_REGEXP} from "../@constants/regexp";
import {BadRequestException} from "@nest/core";

export const sourceFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(avi|mov|mp4|mpeg)$/))
        return callback(new BadRequestException('Only video source of type avi, mov, mp4, mpeg are allowed!'), false);
    callback(null, true);
};

export const widgetFilesFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/))
        return callback(new BadRequestException('Only image file sequence of type png, jpeg, jpg are allowed!'), false);
    if (!file.originalname.match(SEQ_FILES_REGEXP))
        return callback(new BadRequestException('The uploaded source do not look like a valid image sequence.'), false);
    callback(null, true);
};