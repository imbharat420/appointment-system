import axios from 'axios'
import { API_BASE } from '../utils/constants'
import AxiosInterceptor from '../utils/AxiosInterceptor'

const API_URL = API_BASE + '/auth/'
const apiAuth = {
    register: (value) => axios.post(API_URL + 'register', value),

    login: (value) => axios.post(API_URL + 'login', value),
    edit: (value) =>
        AxiosInterceptor().put(API_BASE + `/users/${value.id}`, value),
    getProfile: () => AxiosInterceptor().get(API_BASE + '/users/me'),
    getTeachers: (value) =>
        AxiosInterceptor().get(API_BASE + '/users/type/teachers'),
    getUserById: (value) =>
        AxiosInterceptor().post(API_BASE + '/users/getUserById', value),
}

export default apiAuth
