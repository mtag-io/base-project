import {registerDecorator, ValidationOptions} from "class-validator";

export function StringOrNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "wrongType",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: (value: any) =>
                    typeof value === "string" ||
                    typeof value === "number",
                defaultMessage: () => "The provided element is not of string nor number type"
            }
        });
    };
}