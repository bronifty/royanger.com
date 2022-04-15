import * as React from 'react'
import { Field, FormikErrors, FormikTouched } from 'formik'

type FormValues = {
   contactName: string
   contactEmail: string
   contactPhone: string
   contactMessage: string
}

type TextInput = {
   name: string
   label: string
   touched: FormikTouched<FormValues>
   errors: FormikErrors<FormValues>
}

const TextInput = ({ name, label, touched, errors }: TextInput) => {
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
