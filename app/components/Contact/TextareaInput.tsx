import * as React from 'react'
import { Field } from 'formik'

const TextareaInput = ({ name, label, errors, touched }) => {
   return (
      <div className="textarea text-xlarge">
         <label htmlFor={name} className="label">
            {label}
         </label>
         <div className="input">
            <Field
               id={name}
               name={name}
               as="textarea"
               className="text-xxlarge"
            ></Field>
            <div className="error">
               {errors.contactMessage && touched.contactMessage
                  ? errors.contactMessage
                  : null}
            </div>
         </div>
      </div>
   )
}

export default TextareaInput
