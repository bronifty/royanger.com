import * as React from 'react'
import { Field } from 'formik'

const TextInput = ({ name, label, touched, errors }) => {
   return (
      <div className="text text-xlarge">
         <label htmlFor={name} className="label">
            {label}
         </label>
         <div className="input">
            <Field className="text-xxlarge" name={name} type="text" id={name} />
            <div className="error">
               {errors.contactName && touched.contactName
                  ? errors.contactName
                  : null}
            </div>
         </div>
      </div>
   )
}

export default TextInput
