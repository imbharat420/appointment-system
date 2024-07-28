import * as Yup from 'yup'
export const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
})

export const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    password: Yup.string().required('Password is required'),
})

export const bookAppointmentSchema = Yup.object().shape({
    teacherId: Yup.string().required('Please Select a Teacher'),
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    // studentId: Yup.string().required('Student is required'),
    topic: Yup.string().required('Topic is required'),
})
