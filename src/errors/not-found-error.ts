import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors = () => {
    return [
      {
        message: this.message,
      },
    ];
  };
}
