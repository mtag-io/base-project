import { registerDecorator } from "class-validator";
import { PASSWORD_REGEXP } from "../auth.config";

export const PasswordValidator = () => {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "PasswordValidator",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: "Password too weak."
      },
      validator: {
        validate(value: string) {
          return typeof value === "string" &&
            PASSWORD_REGEXP.test(value);
        }
      }
    });
  };
}
