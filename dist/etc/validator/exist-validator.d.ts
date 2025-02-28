import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class ExistValidator implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsExist(option: any, validationOption?: ValidationOptions): (object: any, propertyName: string) => void;
