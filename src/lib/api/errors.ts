export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly retryAfter?: number,
  ) {
    super(message);
  }
}

export const unavailableLink = () =>
  new ApiError(
    410,
    "LINK_UNAVAILABLE",
    "This link is unavailable or has expired. Request a new one.",
  );
