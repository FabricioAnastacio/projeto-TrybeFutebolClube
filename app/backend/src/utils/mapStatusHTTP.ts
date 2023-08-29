export default function mapStatusHTTP(type: string): number {
  switch (type) {
    case 'SUCCESSFUL': return 200;
    case 'CREATED': return 201;
    case 'DELETED': return 204;
    case 'INVALID_VALUE': return 400;
    case 'UNAUTHORIZED': return 401;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 409;
    case 'INVALID_SIZE': return 422;
    default: return 500;
  }
}
