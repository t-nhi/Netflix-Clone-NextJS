import { HttpResponseWithError } from '@/types/api/common'

export class HttpError extends Error {
    _payload: HttpResponseWithError
    _httpStatus: number

    constructor({ payload, status }: { payload: HttpResponseWithError; status: number }) {
        super(payload.title)
        this._payload = payload
        this._httpStatus = status
        Object.setPrototypeOf(this, HttpError.prototype)
    }

    get payload() {
        return this._payload
    }
    get status() {
        return this._httpStatus
    }
}
