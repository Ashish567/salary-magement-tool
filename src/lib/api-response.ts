import { NextResponse } from 'next/server';

export class ApiResponse {
  static success<T>(data: T, status = 200) {
    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status }
    );
  }

  static error(message: string, status = 400, details?: any) {
    return NextResponse.json(
      {
        success: false,
        error: message,
        ...(details && { details }),
      },
      { status }
    );
  }

  static created<T>(data: T) {
    return this.success(data, 201);
  }

  static conflict(message: string) {
    return this.error(message, 409);
  }

  static badRequest(message: string, details?: any) {
    return this.error(message, 400, details);
  }

  static notFound(message: string) {
    return this.error(message, 404);
  }

  static internalError(message = 'Internal Server Error') {
    return this.error(message, 500);
  }
}
