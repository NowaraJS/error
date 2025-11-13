# 🐞 NowaraJS Error

## 📌 Table of Contents

- [🐞 NowaraJS Error](#-nowarajs-error)
	- [📌 Table of Contents](#-table-of-contents)
	- [📝 Description](#-description)
	- [✨ Features](#-features)
	- [🔧 Installation](#-installation)
	- [⚙️ Usage](#-usage)
		- [HttpError - Client-Facing Errors](#httperror---client-facing-errors)
		- [InternalError - Server-Side Errors](#internalerror---server-side-errors)
		- [AppError - Base Class (Advanced)](#apperror---base-class-advanced)
	- [🐞 Error Classes](#-error-classes)
		- [AppError (Base Class)](#apperror-base-class)
		- [HttpError](#httperror)
		- [InternalError](#internalerror)
	- [📚 API Reference](#-api-reference)
	- [⚖️ License](#-license)
	- [📧 Contact](#-contact)

## 📝 Description

> A comprehensive collection of error classes for robust error handling in TypeScript applications, with built-in tracing and HTTP status support.

**NowaraJS Error** provides a structured approach to error handling with enhanced error classes that include automatic UUID generation for tracing, timestamps, and HTTP status codes. Perfect for APIs and production applications where error tracking and security are critical.

## ✨ Features

- 🔍 **UUID Tracking**: Auto-generated UUID v7 for every error (traceable across logs)
- 📅 **Timestamps**: Automatic error creation timestamps
- 🌐 **HTTP Status Codes**: Built-in HTTP error support with status codes
- 🔒 **Security-First**: Separate classes for client-facing vs internal errors
- 🎯 **Type Safety**: Full TypeScript support with generics for error causes
- 📦 **Lightweight**: 0 dependencies
- 🛠️ **Easy Integration**: Simple import and usage

## 🔧 Installation

```bash
bun add @nowarajs/error
```

## ⚙️ Usage

### HttpError - Client-Facing Errors

Use `HttpError` for controlled errors that you want to expose to API clients:

```ts
import { HttpError } from '@nowarajs/error';

// HTTP error with custom details
try {
	throw new HttpError(
		'Validation failed',
		'BAD_REQUEST',
		{ fields: ['email', 'password'] } // Safe to expose to client
	);
} catch (error) {
	if (error instanceof HttpError) {
		// Client response
		return {
			status: error.httpStatusCode,  // 400
			message: error.message,
			uuid: error.uuid,              // For support tickets
			details: error.cause           // { fields: [...] }
		};
	}
}
```

### InternalError - Server-Side Errors

Use `InternalError` for unexpected errors that should **never** expose details to clients:

```ts
import { InternalError } from '@nowarajs/error';

// Database or unexpected errors
try {
	await db.query('SELECT * FROM users');
} catch (dbError) {
	// Wrap the error - details stay server-side
	throw new InternalError('Database query failed', dbError);
}

// In your error handler
try {
	// ... some operation
} catch (error) {
	if (error instanceof InternalError) {
		// Log full details server-side
		console.error({
			uuid: error.uuid,
			message: error.message,
			cause: error.cause,     // Full database error
			stack: error.stack
		});

		// Send safe response to client (never expose error.cause!)
		return {
			statusCode: 500,
			message: 'An error occurred',
			uuid: error.uuid        // Client can reference this in support
		};
	}
}
```

### AppError - Base Class (Advanced)

`AppError` is the base class for all errors. Typically, you'll use `HttpError` or `InternalError` instead:

```ts
import { AppError } from '@nowarajs/error';

// Custom error class example
class ValidationError extends AppError {
	constructor(message: string, fields: string[]) {
		super(message, { fields });
	}
}

const error = new ValidationError('Invalid input', ['email']);
console.log(error.uuid);   // Auto-generated UUID v7
console.log(error.date);   // Timestamp
console.log(error.cause);  // { fields: ['email'] }
```

## 🐞 Error Classes

### AppError (Base Class)

The foundation error class with enhanced metadata and automatic UUID generation:

| Property | Type | Description |
|----------|------|-------------|
| `uuid` | `string` | Auto-generated UUID v7 for error tracking |
| `date` | `Date` | Timestamp when the error was created |
| `message` | `string` | Error message |
| `cause` | `TCause` | Optional cause of the error (generic type) |

### HttpError

Extends `AppError` for **controlled, client-facing errors** with HTTP status codes:

| Property | Type | Description |
|----------|------|-------------|
| `httpStatusCode` | `number` | HTTP status code (e.g., 404, 400, 500) |
| `isClientError` | `boolean` | True if status code is 4xx |
| `isServerError` | `boolean` | True if status code is 5xx |

*Inherits: `uuid`, `date`, `message`, `cause` from AppError*

**Use cases:** Validation errors, not found, unauthorized, forbidden, etc.

### InternalError

Extends `AppError` for **unexpected, server-side errors** that should never expose details:

No additional properties beyond AppError. Always returns status 500.

*Inherits: `uuid`, `date`, `message`, `cause` from AppError*

**Use cases:** Database errors, external service failures, unexpected exceptions.

**⚠️ Security Note:** Always return status 500 with a generic message and only the `uuid` to clients. Log full details server-side only.

## 📚 API Reference

For the complete list of available HTTP status codes and full API documentation, see:

- [Reference Documentation](https://nowarajs.github.io/error/)

## ⚖️ License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

## 📧 Contact

- Mail: [nowarajs@pm.me](mailto:nowarajs@pm.me)
- GitHub: [NowaraJS](https://github.com/NowaraJS)