export type ServiceErrorType =
'UNAUTHORIZED' | 'NOT_FOUND' | 'INVALID_DATA' | 'INVALID_VALUE' | 'UNAUTHORIZED' | 'INVALID_SIZE';

export type ServiceError = {
  status: ServiceErrorType,
  data: {
    message: string,
  },
};

export type ServiceSuccessResponse = {
  status: 'SUCCESSFUL',
  data: {
    message: string,
  },
};

export type ServiceValidateError = {
  status: ServiceErrorType,
  message: string,
} | undefined;

export type ServiceSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: T
};

export type ServiceRespose<T> = ServiceSuccess<T> | ServiceError | ServiceSuccessResponse;
