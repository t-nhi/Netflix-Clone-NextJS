import { CustomErrorCode } from '@/constants/custom-error-code.enum'
import { isEntityError } from '@/store/utils/errorSafeType'
import { FieldValues, UseFormSetError, Path } from 'react-hook-form'

interface HandleFormErrorParams<T extends FieldValues> {
    error: unknown
    setFormError: UseFormSetError<T>
}

export function handleFormError<T extends FieldValues>({ error, setFormError }: HandleFormErrorParams<T>): void {
    if (isEntityError(error)) {
        error.data.errors.forEach((err) => {
            console.log(err)
            setFormError(err.field as Path<T>, {
                type: CustomErrorCode.SERVER_ENTITY_ERROR,
                message: err.message
            })
        })
    }
}
