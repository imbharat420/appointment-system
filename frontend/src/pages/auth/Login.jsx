import { Form, FormikProvider, useFormik } from 'formik'
import React from 'react'
import errorHandler from '../../utils/errorHandler'
import { CustomInputField } from '../../components/misc/CustomInput'
import { LoginSchema } from '../../utils/Schema'
import apiAuth from '../../api/auth.api'
import { toast } from 'react-toastify'
import { login } from '../../store/features/AuthSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: LoginSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            apiAuth
                .login(values)
                .then((res) => {
                    toast.success('Logged In Successfully')
                    dispatch(login(res.data))
                })
                .catch((err) => {
                    console.log(err)
                    errorHandler(err)
                    setSubmitting(false)
                })
        },
    })

    const { handleSubmit, isSubmitting } = formik

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">
                                Sign In
                            </h5>
                            <FormikProvider value={formik}>
                                <Form
                                    autoComplete="off"
                                    noValidate
                                    onSubmit={handleSubmit}
                                >
                                    <div className="my-3">
                                        <CustomInputField
                                            name="email"
                                            label="Email"
                                            placeholder={'Enter your email'}
                                        />
                                    </div>
                                    <div className="my-3">
                                        <CustomInputField
                                            name="password"
                                            label="Password"
                                            placeholder={'Enter your password'}
                                        />
                                    </div>

                                    <div className="d-grid">
                                        <button
                                            className="btn btn-primary btn-login text-uppercase fw-bold"
                                            type="submit"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </Form>
                            </FormikProvider>
                            <div className="text-center mt-2">
                                <Link
                                    to="/register"
                                    className="text-primary link-info"
                                >
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
