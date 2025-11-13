export enum UnauthPaths {
    LOGIN = '/login',
    REGISTER = '/signup'
}

export enum AuthPaths {
    REFRESH_TOKEN = '/refresh-token'
}

export enum AdminPaths {
    DASHBOARD = '/admin'
}

export enum UserPaths {
    ACCOUNT = '/account',
    PASSWORD = '/password',
    PAYMENT = '/payment',
    FAVORITES = '/favorites',
    HISTORY = '/history',
    NOTIFICATIONS_SETTINGS = '/notification-settings'
}

export enum CommonPaths {
    HOME = '/',
    RESET_PASSWORD = '/reset-password',
    LOGOUT = '/logout',
    MOVIES = '/movies'
}

export function isPathIncluded(paths: string[], pathname: string): boolean {
    return paths.some((path) => pathname === path || (path !== '/' && pathname.startsWith(path + '/')))
}
