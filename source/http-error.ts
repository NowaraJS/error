import { BaseError } from './base-error';
import { HTTP_STATUS_CODES } from './enums/http-status-codes';

export type HttpStatusKey = keyof typeof HTTP_STATUS_CODES;
export type HttpStatusCode = typeof HTTP_STATUS_CODES[HttpStatusKey];

export class HttpError extends BaseError {
	public readonly httpStatusCode: number;

	public constructor(message: string, cause?: unknown);
	public constructor(message: string, httpStatusCode: HttpStatusKey | HttpStatusCode, cause?: unknown);
	public constructor(message: string, a?: unknown, b?: unknown) {
		const isStatus = typeof a === 'number' || (typeof a === 'string' && a in HTTP_STATUS_CODES);
		const status = isStatus
			? (typeof a === 'number' ? a : HTTP_STATUS_CODES[a as keyof typeof HTTP_STATUS_CODES])
			: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

		super(message, isStatus ? b : a);
		this.httpStatusCode = status;
	}

	public get isClientError(): boolean {
		return this.httpStatusCode >= 400 && this.httpStatusCode < 500;
	}

	public get isServerError(): boolean {
		return this.httpStatusCode >= 500 && this.httpStatusCode < 600;
	}
}
