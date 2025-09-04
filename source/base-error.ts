export class BaseError extends Error {
	public readonly date: Date = new Date();

	public constructor(message: string, cause?: unknown) {
		super(message, { cause });
		this.name = new.target.name;

		if (Error.captureStackTrace)
			Error.captureStackTrace(this, new.target);
	}
}
