import * as React from 'react'
import { Field } from 'formik'

const TextInput = ({ name, label, touched, errors }) => {
   return (
      <div>
         <label htmlFor={name} className="">
            {label}
         </label>
         <div>
            <Field name={name} type="text" id={name} />
            <div>
               {errors.contactName && touched.contactName
                  ? errors.contactName
                  : null}
            </div>
         </div>
      </div>
   )
}

export default TextInput
