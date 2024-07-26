import axios from 'axios'
import { API_BASE } from '../utils/constants'
import AxiosInterceptor from '../utils/AxiosInterceptor'

const API_URL = API_BASE + '/auth/'
const apiAuth = {
    register: (value) => axios.post(API_URL + 'register', value),

    login: (value) => axios.post(API_URL + 'login', value),
    getProfile: () => AxiosInterceptor().get(API_BASE + '/users/me'),
    getUserById: (value) =>
        AxiosInterceptor().post(API_BASE + '/users/getUserById', value),
    follow: (value) =>
        AxiosInterceptor().post(API_BASE + `/users/${value.userId}/follow`, value),
}

export default apiAuth
