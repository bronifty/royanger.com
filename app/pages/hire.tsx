import * as React from 'react'
import Head from 'next/head'
import Wrapper from '../components/Wrapper'
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik'
import * as Yup from 'yup'

interface Values {
   contactName: string
   contactEmail: string
   contactPhone: string
   contactMessage: string
}

const validateSchema = Yup.object().shape({
   contactName: Yup.string()
      .min(2, 'Your name is too short')
      .max(150, 'Your name is too long.')
      .required('Required'),
   contactEmail: Yup.string().email('Invalid Email').required('Required'),
   contactPhone: Yup.string()
      .min(2, 'Please enter a valid phone number')
      .max(20, 'Please enter a valid phone number')
      .required('Required'),
   contactMessage: Yup.string()
      .min(10, 'Please enter a longer message')
      .required('Required'),
})

const Hire = () => {
   return (
      <>
         <Head>
            <title>Roy Anger - Contact</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>
         <Wrapper
            bgColor="dark:bg-blue bg-gray"
            bgImage="/images/backgrounds/mailboxes.jpg"
            bgOpacity="dark:bg-opacity-90 bg-opacity-80"
         >
            <div className="py-3 px-5 text-white mt-5 mb-10">
               <h1 className="text-primary font-title text-5xl ">
                  Contact Roy
               </h1>
            </div>
            <div className="text-primary text-xl mt-16 mb-10 grid grid-cols-3 gap-40">
               <div className="">
                  <h2 className="text-title text-2xl mb-2">Contact Form</h2>
                  <p className="mb-2">
                     Please use the following form to shoot me a quick message.
                     I will get back to you ASAP. I'm looking forward to hearing
                     from you!
                  </p>
               </div>
               <div className="col-span-2">
                  <Formik
                     initialValues={{
                        contactName: '',
                        contactEmail: '',
                        contactPhone: '',
                        contactMessage: '',
                     }}
                     validationSchema={validateSchema}
                     onSubmit={(
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                     ) => {
                        alert(JSON.stringify(values, null, 2))
                        console.log('form was submitted')
                        setSubmitting(false)
                     }}
                  >
                     {({ values, errors, touched }) => (
                        <Form className="flex flex-col">
                           <div className="flex flex-row  mt-5 mb-1 text-2xl ">
                              <label
                                 htmlFor="contactName"
                                 className="w-48 block pt-2.5"
                              >
                                 Name
                              </label>
                              <div className="w-full">
                                 <Field
                                    className="w-full h-14 text-gray-900 text-3xl"
                                    name="contactName"
                                    type="text"
                                    id="contactName"
                                 />
                                 <div className="h-8 text-red-200">
                                    {errors.contactName && touched.contactName
                                       ? errors.contactName
                                       : null}
                                 </div>
                              </div>
                           </div>
                           <div className="flex flex-row mt-5 mb-1 text-2xl">
                              <label
                                 htmlFor="contactEmail"
                                 className="w-48 block pt-2.5"
                              >
                                 Email
                              </label>
                              <div className="w-full">
                                 <Field
                                    className="w-full h-14 text-gray-900 text-3xl"
                                    type="email"
                                    id="contactEmail"
                                    name="contactEmail"
                                 />
                                 <div className="h-8 text-red-200">
                                    {errors.contactEmail && touched.contactEmail
                                       ? errors.contactEmail
                                       : null}
                                 </div>
                              </div>
                           </div>
                           <div className="flex flex-row mt-5 mb-1 text-2xl">
                              <label
                                 htmlFor="contactPhone"
                                 className="w-48 block pt-2.5"
                              >
                                 Phone
                              </label>
                              <div className="w-full">
                                 <Field
                                    className="w-full h-14 text-gray-900 text-3xl"
                                    type="text"
                                    id="contactPhone"
                                    name="contactPhone"
                                 />
                                 <div className="h-8 text-red-200">
                                    {errors.contactPhone && touched.contactPhone
                                       ? errors.contactPhone
                                       : null}
                                 </div>
                              </div>
                           </div>
                           <div className="flex flex-row items-start mt-5 mb-1 text-2xl">
                              <label
                                 htmlFor="contactMessage"
                                 className="w-48 block pt-1.5"
                              >
                                 Message
                              </label>
                              <div className="w-full">
                                 <Field
                                    id="contactMessage"
                                    name="contactMessage"
                                    as="textarea"
                                    className="w-full h-48 text-gray-900 text-3xl"
                                 ></Field>
                                 <div className="h-8 text-red-200">
                                    {errors.contactMessage &&
                                    touched.contactMessage
                                       ? errors.contactMessage
                                       : null}
                                 </div>
                              </div>
                           </div>
                           <div className="mt-5 mb-6 ml-40 text-2xl">
                              <button
                                 type="submit"
                                 className="bg-yellow text-blue-700 font-bold py-4 px-6"
                              >
                                 Send Message
                              </button>
                           </div>
                        </Form>
                     )}
                  </Formik>
               </div>
            </div>
         </Wrapper>
      </>
   )
}

export default Hire
