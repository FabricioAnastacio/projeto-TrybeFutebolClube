import { ServiceErrorType } from '../Interfaces/serviceResponse';

export default function mapSchemaStatusHTTP(message: string): ServiceErrorType {
  const response = message.split(' ').length;
  console.log(message);
  console.log(response);
  switch (response) {
    case 9 || 5:
      return 'INVALID_SIZE';
    default:
      return 'INVALID_VALUE';
  }
}
