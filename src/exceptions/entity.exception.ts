import { HttpStatusCode } from '@/constants/http.enum'
import { HttpException } from '@/exceptions/http.exception'
import { EntityError as EntityErrorType, HttpResponseWithEntityErrors } from '@/types/common/http-response'
import _ from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EntityExceptionParams extends Omit<HttpResponseWithEntityErrors, 'status'> {}

export class EntityException extends HttpException {
    private _errors: EntityErrorType[]
    constructor(payload: EntityExceptionParams) {
        super({ payload: _.omit(payload, 'errors'), status: HttpStatusCode.ENTITY_ERROR })
        this._errors = payload.errors
        Object.setPrototypeOf(this, EntityException.prototype)
    }
    get errors() {
        return this._errors
    }
}
