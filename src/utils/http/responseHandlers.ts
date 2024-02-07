import { type AppResponse, HttpStatus } from './protocols'

/**
 * Handle and parse success HTTP responses.
 *
 * @param {any} data - The data to be included in the response body.
 * @param {number} [status=200] - The HTTP status code for the response. Defaults to 200 (OK).
 * @param {Record<string, unknown>} [headers={}] - Additional headers to include in the response.
 *
 * @returns {AppResponse} An object representing the HTTP response.
 *
 * @typedef {Object} AppResponse
 * @property {any} data - The data to be included in the response body.
 * @property {number} status - The HTTP status code for the response.
 * @property {Record<string, unknown>} headers - Additional headers included in the response.
 *
 * @example
 * const response = handleSuccess({ message: 'Success!' });
 * // response is { data: { message: 'Success!' }, status: 200, headers: {} }
 */
export function handleSuccess (
  data: any,
  status: HttpStatus = HttpStatus.OK,
  headers: Record<string, unknown> = {}
): AppResponse {
  return {
    data,
    status,
    headers
  }
}

/**
 * Handle and parse error responses.
 *
 * @param {Error} error - The error object containing information about the error.
 * @param {number} [status=500] - The HTTP status code for the error response. Defaults to 500 (Internal Server Error).
 * @param {Record<string, unknown>} [headers={}] - Additional headers to include in the error response.
 *
 * @returns {AppResponse} An object representing the HTTP error response.
 *
 * @typedef {Object} AppResponse
 * @property {Object} data - The data to be included in the error response body.
 * @property {string} data.message - The error message.
 * @property {number} status - The HTTP status code for the error response.
 * @property {Record<string, unknown>} headers - Additional headers included in the error response.
 *
 * @example
 * const error = new Error('Something went wrong');
 * const errorResponse = handleError(error);
 * // errorResponse is { data: { message: 'Something went wrong' }, status: 500, headers: {} }
 */
export function handleError (
  error: Error,
  status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  headers: Record<string, unknown> = {}
): AppResponse {
  const data = { message: error.message }

  return {
    data,
    status,
    headers
  }
}
