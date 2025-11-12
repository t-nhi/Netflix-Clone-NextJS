import { HttpStatusCode } from '@/constants/http.enum'
import { HttpException, HttpExceptionParams } from '@/exceptions/http.exception'
import { HttpResponseWithError } from '@/types/common/http-response.type'
import _ from 'lodash'

export class UnauthorizedException extends HttpException {
    constructor(payload: Pick<HttpResponseWithError, 'method' | 'path' | 'detail'>) {
        const _payload: HttpExceptionParams['payload'] = {
            ...payload,
            title: 'Unauthorized'
        }

        super({ payload: _payload, status: HttpStatusCode.UNAUTHORIZED })
        Object.setPrototypeOf(this, UnauthorizedException.prototype)
    }
}
