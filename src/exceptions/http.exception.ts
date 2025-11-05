import { HttpStatusMessage } from '@/constants/http.enum'
import { HttpResponseWithError } from '@/types/common/http-response'

export interface HttpExceptionParams {
    payload: Omit<HttpResponseWithError, 'status'>
    status: number
}

export class HttpException extends Error {
    private _payload: HttpResponseWithError
    private _httpStatus: number

    constructor({ payload, status }: HttpExceptionParams) {
        super(payload.title)
        this._payload = { ...payload, status: HttpStatusMessage.ERROR }
        this._httpStatus = status
        Object.setPrototypeOf(this, HttpException.prototype)
    }

    get payload() {
        return this._payload
    }
    get status() {
        return this._httpStatus
    }
}
