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
      <div className=" flex flex-row">
         <div className="w-28 text-lg font-code pt-2  pr-2">
            <label htmlFor={name} className="">
               {label}:
            </label>
         </div>
         <div className="flex flex-col grow h-24">
            <div>
               <Field
                  name={name}
                  type="text"
                  id={name}
                  className="w-full border-blue-600 border-2"
               />
            </div>
            <div className="font-code text-red-700">
               {errors[name] && touched[name] ? errors[name] : ''}
            </div>
         </div>
      </div>
   )
}

export default TextInput
