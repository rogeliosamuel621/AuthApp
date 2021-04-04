import { ErrorHandler } from './message';

export function HandleHttpExceptions(message, SetMessage) {
  switch (message) {
    case 'Request failed with status code 401':
      ErrorHandler(SetMessage, 'Wrong credentials');
      break;

    case 'Network Error':
      ErrorHandler(SetMessage, 'Internal server error, try it later');
      break;

    case 'Request failed with status code 400':
      ErrorHandler(
        SetMessage,
        'You should fill the inputs with the correct format'
      );
      break;

    case 'Request failed with status code 404':
      ErrorHandler(
        SetMessage,
        `The content that you are looking for doesn't exits`
      );
      break;

    default:
      ErrorHandler(SetMessage, message);
  }
}

export function HandleEditProfileExceptions(message, setMessage) {
  switch (message) {
    case 'Request failed with status code 401':
      ErrorHandler(setMessage, 'That email is already registered');
      break;

    case 'Network Error':
      ErrorHandler(setMessage, 'Internal server error, try it later');
      break;

    case 'Request failed with status code 400':
      ErrorHandler(setMessage, `Email doesn't have to be empty`);
      break;

    case 'Request failed with status code 404':
      console.log('not found');
      ErrorHandler(
        setMessage,
        `The content that you are looking for doesn't exits`
      );
      break;

    default:
      ErrorHandler(setMessage, message);
  }
}
