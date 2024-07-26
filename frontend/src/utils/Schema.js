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

export const CreatePostSchema = Yup.object().shape({
    content: Yup.string().required('Post is required'),
})
