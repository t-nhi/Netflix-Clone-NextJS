export enum HttpStatusMessage {
    SUCCESS = 'success',
    ERROR = 'error'
}

export enum HttpStatusCode {
    ENTITY_ERROR = 422,
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
    OK = 200,
    TOO_MANY_REQUESTS = 429,
    FORBIDDEN = 403,
    NOT_FOUND = 404
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}
