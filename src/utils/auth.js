export function isTokenExpired() {
    const loginTimeISO = localStorage.getItem('login-time')
    const loginTime = new Date(loginTimeISO)
    const now = new Date()
    const duration = now.getTime() - loginTime.getTime()
    return duration > 1 * 1000 * 60 * 60
}

export const setToken = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("login-time", (new Date()).toISOString())
    const EXPIRES_IN = 1
    setCookies('jwt', token)
    runLogoutTimer(EXPIRES_IN)
};

export function getAuthToken() {
    const token = localStorage.getItem('token')
    if (!token || token === 'undefined') return null

    if (isTokenExpired()) return 'EXPIRED'

    return token
}

export function runLogoutTimer(expires_in) {
    setTimeout(() => {
        localStorage.removeItem('token')
    }, expires_in * 60 * 60 * 1000)
}

export function isAuthenticated() {
    const token = getAuthToken()
    if (token === 'EXPIRED' || token === null) return false
    return true
}

export function logout() {
    if (localStorage.getItem('token') && localStorage.getItem('login-time')) {
        localStorage.removeItem('token')
        localStorage.removeItem('login-time')
    }
}

export function getUser() {
    const user = localStorage.getItem('user')
    if (user) {
        return JSON.parse(user)
    }
    return null
}

export function setCookies(name, value) {
    document.cookie = `${name}=${value}; expires=${(new Date(Date.now() + 5*3600*1000))}; path=/`
}