// Exemples d'utilisation du typage générique TCause

import { BaseError, HttpError } from '../source';

// Exemple 1: BaseError avec cause typée comme objet
interface ValidationError {
	field: string;
	value: unknown;
	message: string;
}

const baseErrorWithTypedCause = new BaseError<ValidationError>(
	'Validation failed',
	{
		field: 'email',
		value: 'invalid-email',
		message: 'Email format is invalid'
	}
);

// TypeScript sait maintenant que cause est de type ValidationError | undefined
if (baseErrorWithTypedCause.cause) {
	console.log(`Field: ${baseErrorWithTypedCause.cause.field}`); // ✅ Type safe
	console.log(`Value: ${baseErrorWithTypedCause.cause.value}`); // ✅ Type safe
}

// Exemple 2: HttpError avec cause typée comme Error natif
const httpErrorWithErrorCause = new HttpError<Error>(
	'Database connection failed',
	'INTERNAL_SERVER_ERROR',
	new Error('Connection timeout')
);

if (httpErrorWithErrorCause.cause) {
	console.log(`Original error: ${httpErrorWithErrorCause.cause.message}`); // ✅ Type safe
	console.log(`Stack: ${httpErrorWithErrorCause.cause.stack}`); // ✅ Type safe
}

// Exemple 3: HttpError avec cause typée comme string
const httpErrorWithStringCause = new HttpError<string>(
	'Authentication failed',
	'UNAUTHORIZED',
	'Invalid token signature'
);

if (httpErrorWithStringCause.cause)
	console.log(`Cause: ${httpErrorWithStringCause.cause.toUpperCase()}`); // ✅ Type safe

// Exemple 4: Cause typée comme union type
type ApiErrorCause = {
	code: number;
	details: string;
} | string | Error;

const httpErrorWithUnionCause = new HttpError<ApiErrorCause>(
	'API request failed',
	'BAD_REQUEST',
	{
		code: 1001,
		details: 'Missing required parameter'
	}
);

if (httpErrorWithUnionCause.cause)
	if (typeof httpErrorWithUnionCause.cause === 'object' && 'code' in httpErrorWithUnionCause.cause)
		console.log(`API Error Code: ${httpErrorWithUnionCause.cause.code}`); // ✅ Type safe

// Exemple 5: Sans spécifier le type générique (utilise unknown par défaut)
const baseErrorDefault = new BaseError('Default error', { anything: 'goes here' });

// TypeScript traite cause comme unknown | undefined
if (baseErrorDefault.cause)
	// Il faudra faire du type narrowing pour utiliser les propriétés
	console.log(baseErrorDefault.cause); // ✅ Mais pas de type safety sur les propriétés

export {
	baseErrorWithTypedCause,
	httpErrorWithErrorCause,
	httpErrorWithStringCause,
	httpErrorWithUnionCause,
	baseErrorDefault
};
