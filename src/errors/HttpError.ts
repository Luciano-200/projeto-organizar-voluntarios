export class HttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export const to = async <T>(promise: Promise<T>): Promise<[null, T] | [Error]> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (error: unknown) {
    return [error instanceof Error ? error : new Error(String(error))];
  }
}