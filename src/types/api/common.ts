import { HttpStatusMessage } from '@/constants/http.enum'

export interface HttpResponse {
    status: (typeof HttpStatusMessage)[keyof typeof HttpStatusMessage]
    message: string
    path: string
    method: string
}

export interface HttpResponseWithData<T> extends HttpResponse {
    data: T
}

export interface HttpResponseWithMeta<T, M> extends HttpResponse {
    data: T
    meta: M
}

export interface HttpResponseWithError extends HttpResponse {
    title: string
    detail: string
}

export interface EntityError {
    field: string
    code: string
    message: string
}

export interface HttpResponseWithEntityErrors extends HttpResponse {
    errors: EntityError[]
}
