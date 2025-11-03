import { HttpStatusCode } from '@/constants/http.enum'
import { HttpError } from '@/exceptions/http.exception'
import { HttpResponseWithEntityErrors } from '@/types/api/common'
import { EntityError as EntityErrorType } from '@/types/api/common'
import _ from 'lodash'

export class EntityError extends HttpError {
    _errors: EntityErrorType[]
    constructor(payload: HttpResponseWithEntityErrors) {
        super({ payload: _.omit(payload, 'errors'), status: HttpStatusCode.ENTITY_ERROR_STATUS })
        this._errors = payload.errors
        Object.setPrototypeOf(this, EntityError.prototype)
    }
    get errors() {
        return this._errors
    }
}
