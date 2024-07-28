import React, { useEffect } from 'react'
import { FormikProvider, Form, useFormik } from 'formik'
import { CustomInputField } from '../../components/misc/CustomInput'
import apiAuth from '../../api/auth.api'
import { getUser } from '../../store/features/AuthSlice'
import { useDispatch } from 'react-redux'
import errorHandler from '../../utils/errorHandler'
import { toast } from 'react-toastify'
function MyProfile({ user }) {
    const dispatch = useDispatch()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: user?.id || '',
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            role: user?.role || '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await apiAuth.edit(values)
                dispatch(getUser())
                toast.success(`Profile updated successfully`)
            } catch (error) {
                errorHandler(error)
            }
            setSubmitting(false)
        },
    })

    return (
        <div className="d-flex justify-content-center align-items-center w-100">
            <div className="card p-3 appointment-form">
                <h5 className="card-title text-center">
                    Welcome Back {user?.name}
                </h5>
                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit}>
                        <h1 className="text-center"></h1>

                        <div className="card-body">
                            <CustomInputField name="name" label="Name" />
                            <CustomInputField
                                type="email"
                                name="email"
                                label="email"
                            />
                            <CustomInputField
                                name="phone"
                                label="Phone"
                                type="number"
                            />
                        </div>
                        <div className="card-footer bg-none">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block w-100 mx-auto"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    )
}

export default MyProfile
