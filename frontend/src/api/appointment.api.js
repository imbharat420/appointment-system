import { API_BASE } from '../utils/constants'
import AxiosInterceptor from '../utils/AxiosInterceptor'

const API_URL = API_BASE + '/appointments'
const apiAppointment = {
    create: (value) => AxiosInterceptor().post(API_URL, value),
    getAll: (value) =>
        AxiosInterceptor().get(API_URL, {
            params: { type: value },
        }),
    edit: (value) =>
        AxiosInterceptor().put(API_URL + `/${value?.appointmentId}`, value),
}

export default apiAppointment
