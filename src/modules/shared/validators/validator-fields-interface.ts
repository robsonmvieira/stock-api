import { Notification } from './notification'
export interface IValidatorFields {
  validate(notification: Notification, props: any, fields?: string[]): void
}
