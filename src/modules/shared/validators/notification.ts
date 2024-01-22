export class Notification {
  errors = new Map<string, string[] | string>()

  addError(error: string, field?: string): void {
    if (field) {
      const errors = (this.errors.get(field) ?? []) as string[]
      errors.indexOf(error) === -1 && errors.push(error)
      this.errors.set(field, errors)
    } else {
      this.errors.set(error, error)
    }
  }

  hasErrors(): boolean {
    return this.errors.size > 0
  }

  getErrors(): Map<string, string[] | string> {
    return this.errors
  }

  clear(): void {
    this.errors.clear()
  }

  getErrorsByField(field: string): string[] | string | undefined {
    return this.errors.get(field)
  }

  hasErrorsByField(field: string): boolean {
    return this.errors.has(field)
  }

  setErrors(error: string | string[], field?: string): void {
    if (field) {
      this.errors.set(field, Array.isArray(error) ? error : [error])
    } else {
      if (Array.isArray(error)) {
        error.forEach(error => {
          this.errors.set(error, error)
        })
        return
      }
      this.errors.set(error, error)
    }
  }

  copyErrors(notification: Notification): void {
    notification.getErrors().forEach((value, key) => {
      this.setErrors(value, key)
    })
  }

  toJSON(): any {
    const errors: Array<string | { [key: string]: string[] }> = []
    this.errors.forEach((value, key) => {
      if (typeof value === 'string') {
        errors.push(value)
      } else {
        errors.push({ [key]: value })
      }
    })
    return errors
  }
}
