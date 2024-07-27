import { ErrorMessage, Field, useField, useFormikContext } from 'formik'

export const CustomInputField = ({
    name,
    placeholder,
    label,
    disabled,
    type,
    props,
}) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <Field
                type={type ? type : 'text'}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                className="form-control"
                {...props}
            />
            <ErrorMessage component="p" className="text-danger" name={name} />
        </div>
    )
}

export const CustomTextAreaField = ({ name, placeholder, label, disabled }) => {
    return (
        <>
            <div className="form-group">
                <label>{label}</label>
                <Field
                    type={'textarea'}
                    as="textarea"
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="form-control"
                />
                <ErrorMessage
                    component="p"
                    className="text-danger"
                    name={name}
                />
            </div>
        </>
    )
}

export function CustomSelectInput({ name, label, options }) {
    if (options == undefined || label == undefined)
        return <option value="">Please Select</option>
    const [field] = useField(name)
    const { setFieldValue } = useFormikContext()

    return (
        <div className="form-group">
            <label>{label}</label>
            <Field as="select" className={'form-control'} {...field}>
                <option selected={true} disabled={true} value="">
                    Please Select
                </option>
                {options.map((option, idx) => (
                    <option value={option.value} key={idx}>
                        {option.label}
                    </option>
                ))}
            </Field>
            <ErrorMessage component="p" className="text-danger" name={name} />
        </div>
    )
}
