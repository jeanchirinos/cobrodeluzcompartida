export class TokenNotFoundError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'TokenNotFoundError'
    this.cause = {
      status: 401,
    }
    this.message = message ?? 'Token not found'
  }
}
