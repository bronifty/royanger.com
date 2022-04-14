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

const TextareaInput = ({ name, label, errors, touched }) => {
   return (
      <div>
         <label htmlFor={name}>{label}</label>
         <div>
            <Field id={name} name={name} as="textarea" className=""></Field>
            <div className="">
               {errors.contactMessage && touched.contactMessage
                  ? errors.contactMessage
                  : null}
            </div>
         </div>
      </div>
   )
}

export default TextareaInput
