import { AppError } from './base-error';

export class InternalError<const TCause = unknown> extends AppError<TCause> {
	public constructor(message: string, cause?: TCause) {
		super(message, cause);
	}
}
