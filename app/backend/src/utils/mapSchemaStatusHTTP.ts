import { ServiceErrorType } from '../Interfaces/serviceResponse';

export default function mapSchemaStatusHTTP(message: string): ServiceErrorType {
  const response = message.split(' ').length;

  if (response === 9 || response === 5) return 'INVALID_SIZE';
  return 'INVALID_VALUE';
}
