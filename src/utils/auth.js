export function getTokenDuration() {
    const expirationISO = localStorage.getItem('expiration')
    const expiration = new Date(expirationISO)
    const now = new Date()
    const duration = expiration.getTime() - now.getTime()

    return duration
}

export function getAuthToken() {
    const token = localStorage.getItem('token')
    if (!token) return null

    if (getTokenDuration() < 0) return 'EXPIRED'

    return token
}

export function isAuthenticated() {
    const token = getAuthToken()
    return token !== null && token !== 'EXPIRED'
}