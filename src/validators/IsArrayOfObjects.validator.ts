import {
  ValidationOptions,
  ValidateBy,
  buildMessage,
  ValidationArguments,
} from 'class-validator';

export const IS_ARRAY_OF_OBJECTS = 'isArrayofObjects';

export function IsArrayOfObjects(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_ARRAY_OF_OBJECTS,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) {
            return false;
          }
          for (const item of value) {
            if (typeof item !== 'object' || item === null || Array.isArray(item)) {
              return false;
            }
          }
          return true;
        },
        defaultMessage: buildMessage(
          eachPrefix =>
            eachPrefix +
            '$property must be an array of objects',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}