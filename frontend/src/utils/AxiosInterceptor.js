import axios from 'axios'
import { toast } from 'react-toastify'

import { API_BASE } from './constants'

const authHeader = () => {
    const token = localStorage.getItem('token')
    if (token) {
        return { Authorization: 'Bearer ' + token }
    }
    return {}
}

export default (history) => {
    const axiosInstance = axios.create({
        baseURL: API_BASE,
        headers: authHeader(),
    })

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (
                error.response.status === 502 ||
                error.response.status === 401
            ) {
                const { msg } = error.response.data
                if (msg) {
                    toast.error(msg, {
                        toastId: 'logout',
                    })
                } else {
                    toast.error('Logging Out!!', {
                        toastId: 'logout',
                    })
                }
                setTimeout(() => {
                    localStorage.clear()
                    if (history) {
                        history.push('/login')
                    } else {
                        window.location.pathname = '/login'
                    }
                }, 10)
            }
            return Promise.reject(error)
        }
    )

    return axiosInstance
}
