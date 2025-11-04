import { createMiddlewareChain } from '@/middlewares/createMiddlewareChain'
import AuthenticationMiddleware from '@/middlewares/handlers/auth.middlewares'
import i18nMiddleware from '@/middlewares/handlers/i18n.middlewares'
import RoleAccessMiddleware from '@/middlewares/handlers/role.middlewares'

export default function composeMiddlewares() {
    return createMiddlewareChain(i18nMiddleware, AuthenticationMiddleware, RoleAccessMiddleware)
}
