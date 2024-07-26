import { toast } from 'react-toastify'

const errorHandler = (err) => {
    console.log('errorHandler', err)
    if (err.response?.data) {
        const { msg } = err.response.data
        console.log(msg)
        // if (status === 0 && Array.isArray(error) && error.length > 0) {
        //   error.map((err) => toast.error(err.msg));
        //   return;
        // }
        if (msg) {
            toast.error(msg, { toastId: 'msgerror' })
            return
        }

        toast.error('Something went wrong!', { toastId: 'error' })
    } else {
        toast.error('An error occurred', { toastId: 'elseerror' })
    }
}

export default errorHandler
