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

**NowaraJS Error** provides a structured approach to error handling with enhanced error classes that include additional metadata like timestamps, and HTTP status codes. It's designed to improve debugging and error tracking.

## ✨ Features

- 📅 **Timestamps**: Automatic error creation timestamps
- 🌐 **HTTP Status Codes**: Built-in HTTP error support with status codes
- 🎯 **Type Safety**: Full TypeScript support with generics for the cause of Errors
- 📦 **Lightweight**: 0 dependencies
- 🛠️ **Easy Integration**: Simple import and usage

## 🔧 Installation

```bash
bun add @nowarajs/error
```

## ⚙️ Usage

### Basic Error Handling

```ts
import { BaseError, HttpError } from '@nowarajs/error';

// Basic error with message
try {
	throw new BaseError({ message: 'Something went wrong' });
} catch (error) {
	if (error instanceof BaseError) {
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

## 🐞 Error Classes

### BaseError

The foundation error class with enhanced metadata:

| Property | Type | Description |
|----------|------|-------------|
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
// Informational responses (1xx)
'CONTINUE', 'SWITCHING_PROTOCOLS', 'PROCESSING', // ... and more

// Successful responses (2xx)
'OK', 'CREATED', 'ACCEPTED', 'NON_AUTHORITATIVE_INFORMATION', // ... and more

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
