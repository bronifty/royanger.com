import * as React from 'react'
import { Field, FormikErrors, FormikTouched } from 'formik'

type FormValues = {
   contactName: string
   contactEmail: string
   contactPhone: string
   contactMessage: string
}

type TextAreaInput = {
   name: string
   label: string
   touched: FormikTouched<FormValues>
   errors: FormikErrors<FormValues>
   handleChange: Function
}

const TextareaInput = ({
   name,
   label,
   errors,
   touched,
   handleChange,
}: TextAreaInput) => {
   return (
      <>
         <div className=" flex flex-row mb-8">
            <div className="w-28 text-lg font-code pt-2 pr-2">
               <label htmlFor={name}>{label}</label>
            </div>
            <div className="flex flex-col grow h-24">
               <div>
                  <Field
                     id={name}
                     name={name}
                     as="textarea"
                     className="w-full border-blue-600 border-2 dark:border-4  dark:border-cyan-700 dark:text-grey-800  focus:dark:border-cyan-100"
                     onKeyUp={handleChange}
                  ></Field>
               </div>
               <div className="font-code text-red-700 dark:text-red-300">
                  {errors[name] && touched[name] ? errors[name] : null}
               </div>
            </div>
         </div>
      </>
   )
}

export default TextareaInput
