import { FieldsErrors, IValidatorFields, Notification } from "@modules/shared";
import { validateSync } from "class-validator";

export abstract class BaseValidatorFields 
implements IValidatorFields {
  errors: FieldsErrors;
   validate(notification: Notification ,props: any, fields?: string[]): boolean {
    const errors = validateSync(props, {
      groups: fields
    }
    );    
    if (errors.length) {
      
      for (const error of errors) {
        const field = error.property;
        Object.values(error.constraints).forEach(message => {
          notification.addError(message, field);
        })
      }
    }
    return !errors.length;
  }
}