import { HttpStatusCode } from '@/constants/http.enum'
import { HttpException, HttpExceptionParams } from '@/exceptions/http.exception'
import { HttpResponseWithError } from '@/types/common/http-response.type'

export class InternalException extends HttpException {
    constructor(payload: Pick<HttpResponseWithError, 'method' | 'path' | 'detail'>) {
        const _payload: HttpExceptionParams['payload'] = {
            ...payload,
            title: 'Internal Server Error'
        }

        super({ payload: _payload, status: HttpStatusCode.INTERNAL_SERVER_ERROR })
        Object.setPrototypeOf(this, InternalException.prototype)
    }
}
