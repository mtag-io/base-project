import { registerDecorator } from "class-validator";

export function JsonValidator() {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "JsonValidator",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: "Not a valid json parsable string."
      },
      validator: {
        validate(value: string) {
          try{
            JSON.parse(value)
            return true
          }
          catch(e){
            return false
          }
        }
      }
    });
  };
}