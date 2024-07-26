import React from 'react'
import { CustomTextAreaField } from '../../components/misc/CustomInput'
import { Form, FormikProvider, useFormik } from 'formik'
import { CreatePostSchema } from '../../utils/Schema'
import apiPost from '../../api/post.api'
import errorHandler from '../../utils/errorHandler'
import { toast } from 'react-toastify'
import { getPosts } from '../../store/features/PostSlice'
import { useDispatch } from 'react-redux'

function CreatePost() {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            content: '',
        },
        validationSchema: CreatePostSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                let res = await apiPost.add(values)
                toast.success('Post Published')
                dispatch(getPosts())
            } catch (err) {
                errorHandler(err)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const { handleSubmit, isSubmitting } = formik

    return (
        <div>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <div className="d-flex flex-column">
                        <CustomTextAreaField
                            name="content"
                            label="Create Post"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary mt-2 align-self-end"
                            disabled={isSubmitting}
                        >
                            Publish Post
                        </button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    )
}

export default CreatePost
