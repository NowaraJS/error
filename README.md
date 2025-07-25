# 🐞 NowaraJS Error

## 📌 Table of Contents

- [🐞 NowaraJS Error](#-nowarajs-error)
	- [📌 Table of Contents](#-table-of-contents)
	- [📝 Description](#-description)
	- [✨ Features](#-features)
	- [🔧 Installation](#-installation)
	- [⚙️ Usage](#-usage)
	- [🐞 Error Classes](#-error-classes)
	- [📚 API Reference](#-api-reference)
	- [⚖️ License](#-license)
	- [📧 Contact](#-contact)

## 📝 Description

> A comprehensive collection of error classes for robust error handling in TypeScript applications.

**NowaraJS Error** provides a structured approach to error handling with enhanced error classes that include additional metadata like unique identifiers, timestamps, and HTTP status codes. It's designed to improve debugging and error tracking in modern applications.

## ✨ Features

- 🆔 **Unique Error IDs**: Each error gets a UUID for tracking
- 📅 **Timestamps**: Automatic error creation timestamps
- 🌐 **HTTP Status Codes**: Built-in HTTP error support with status codes
- 🐞 **Error Classification**: Distinguish between client and server errors
- 🎯 **Type Safety**: Full TypeScript support with generics
- 📦 **Lightweight**: Minimal dependencies and optimized for performance
- 🛠️ **Easy Integration**: Simple import and usage

## 🔧 Installation

```bash
bun add @nowarajs/error
```

> **Note**: This package supports both Bun and Node.js environments.

## ⚙️ Usage

### Basic Error Handling

```ts
import { BaseError, HttpError } from '@nowarajs/error';

// Basic error with message
try {
	throw new BaseError({ message: 'Something went wrong' });
} catch (error) {
	if (error instanceof BaseError) {
		console.log(`Error ID: ${error.uuid}`);
		console.log(`Occurred at: ${error.date.toISOString()}`);
		console.log(`Message: ${error.message}`);
	}
}

// HTTP error with status code
try {
	throw new HttpError({
		message: 'User not found',
		httpStatusCode: 'NOT_FOUND'
	});
} catch (error) {
	if (error instanceof HttpError) {
		console.log(`HTTP Status: ${error.httpStatusCode}`); // 404
		console.log(`Is client error: ${error.isClientError}`); // true
		console.log(`Is server error: ${error.isServerError}`); // false
	}
}
```

### Error Options

```ts
import type { BaseErrorOptions, HttpErrorOptions } from '@nowarajs/error/types';

// Base error options
interface BaseErrorOptions<TCause = unknown> {
	message?: string;    // Error message
	cause?: TCause;      // Error cause (original error or context)
}

// HTTP error options
interface HttpErrorOptions<TCause = unknown> extends BaseErrorOptions<TCause> {
	httpStatusCode?: keyof typeof HTTP_STATUS_CODES;  // HTTP status code
}
```

### Advanced Usage with Custom Causes

```ts
import { BaseError, HttpError } from '@nowarajs/error';

// Error with custom cause type
interface ValidationContext {
	field: string;
	value: unknown;
	rule: string;
}

try {
	throw new BaseError<ValidationContext>({
		message: 'Validation failed',
		cause: {
			field: 'email',
			value: 'invalid-email',
			rule: 'email_format'
		}
	});
} catch (error) {
	if (error instanceof BaseError && error.cause) {
		console.log(`Field: ${error.cause.field}`);
		console.log(`Invalid value: ${error.cause.value}`);
		console.log(`Failed rule: ${error.cause.rule}`);
	}
}

// Chaining errors
try {
	// Some operation that might fail
	throw new Error('Database connection failed');
} catch (originalError) {
	throw new HttpError({
		message: 'Unable to fetch user data',
		httpStatusCode: 'INTERNAL_SERVER_ERROR',
		cause: originalError
	});
}
```

## 🐞 Error Classes

### BaseError

The foundation error class with enhanced metadata:

| Property | Type | Description |
|----------|------|-------------|
| `uuid` | `string` | Unique identifier for the error |
| `date` | `Date` | Timestamp when the error was created |
| `message` | `string` | Error message |
| `cause` | `TCause` | Optional cause of the error |

### HttpError

Extends BaseError with HTTP-specific functionality:

| Property | Type | Description |
|----------|------|-------------|
| `httpStatusCode` | `number` | HTTP status code (400-511) |
| `isClientError` | `boolean` | True if status code is 4xx |
| `isServerError` | `boolean` | True if status code is 5xx |

### Available HTTP Status Codes

```ts
// Client errors (4xx)
'BAD_REQUEST', 'UNAUTHORIZED', 'FORBIDDEN', 'NOT_FOUND', 
'METHOD_NOT_ALLOWED', 'CONFLICT', 'UNPROCESSABLE_ENTITY', 
'TOO_MANY_REQUESTS', // ... and more

// Server errors (5xx)
'INTERNAL_SERVER_ERROR', 'NOT_IMPLEMENTED', 'BAD_GATEWAY',
'SERVICE_UNAVAILABLE', 'GATEWAY_TIMEOUT' // ... and more
```

## 📚 API Reference

You can find the complete API reference documentation for `NowaraJS Error` at:

- [Reference Documentation](https://nowarajs.github.io/error/)

## ⚖️ License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

## 📧 Contact

- GitHub: [NowaraJS](https://github.com/NowaraJS)
- Package: [@nowarajs/error](https://www.npmjs.com/package/@nowarajs/error)
