// AppointmentForm.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiAuth from '../../api/auth.api'
import { FormikProvider, Form, useFormik } from 'formik'
import {
    CustomInputField,
    CustomSelectInput,
} from '../../components/misc/CustomInput'
import apiAppointment from '../../api/appointment.api'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bookAppointmentSchema } from '../../utils/Schema'
// import './AppointmentForm.css'

function AppointmentForm() {
    const { user } = useSelector((state) => state.auth)
    const [teachers, setTeachers] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await apiAuth.getTeachers()
                setTeachers(response.data)
            } catch (error) {
                console.error('Error fetching teachers:', error)
            }
        }
        fetchTeachers()
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            teacherId: '',
            date: '',
            time: '',
            studentId: user?.id,
            topic: '',
        },
        validationSchema: bookAppointmentSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await apiAppointment.create(values)
                navigate('/feed')
            } catch (error) {
                console.error('Error booking appointment:', error)
            }
            setSubmitting(false)
        },
    })

    return (
        <div className="d-flex justify-content-center align-items-center w-100">
            <div className="card p-3 appointment-form">
                <h5 className="card-title">Book Appointment</h5>
                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="topic">Topic</label>
                            <CustomInputField name="topic" id="topic" />
                        </div>
                        <div className="form-group">
                            <CustomSelectInput
                                name="teacherId"
                                label="Teacher"
                                options={
                                    teachers?.map((teacher) => ({
                                        value: teacher.id,
                                        label: teacher.name,
                                    })) ?? []
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <CustomInputField
                                type="date"
                                name="date"
                                id="date"
                                onChange={formik.handleChange}
                                value={formik.values.date}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <CustomInputField
                                type="time"
                                name="time"
                                id="time"
                                onChange={formik.handleChange}
                                value={formik.values.time}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                        >
                            Book Appointment
                        </button>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    )
}

export default AppointmentForm
