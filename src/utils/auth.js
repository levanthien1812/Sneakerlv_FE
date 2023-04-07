import {
    useDispatch
} from "react-redux"
import {
    actions as authActions
} from "../store/auth"
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
    runLogoutTimer(EXPIRES_IN)
};

export function getAuthToken() {
    const token = localStorage.getItem('token')
    if (!token) return null

    if (isTokenExpired()) return 'EXPIRED'

    return token
}

export function runLogoutTimer(expires_in) {
    setTimeout(() => {
        localStorage.removeItem('token')
    }, expires_in * 60 * 60 * 1000)
}

export function isAuthened() {
    const token = getAuthToken()
    if (token === 'EXPIRED' || token === null) return false
    return true
}