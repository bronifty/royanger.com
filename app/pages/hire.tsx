import * as React from 'react'
import Head from 'next/head'
import Wrapper from '../src/components/Wrapper'
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik'
import * as Yup from 'yup'

interface Values {
   contactName: string
   contactEmail: string
   contactPhone: number
   contactMessage: string
}

// const validate = ({
//    contactName,
//    contactEmail,
//    contactPhone,
//    contactMessage,
// }: Values) => {
//    console.log('validating')
//    const errors = {}

//    return errors
// }

const validateSchema = Yup.object().shape({
   contactName: Yup.string()
      .min(2, 'Your name is too short')
      .max(150, 'Your name is too long.')
      .required('Required'),
   contactEmail: Yup.string().email('Invalid Email').required('Required'),
   contactPhone: Yup.number(),
   contactMessage: Yup.string(),
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
            bgColor="bg-blue-700"
            bgImage="/images/backgrounds/mailboxes.jpg"
            bgOpacity="bg-opacity-90"
         >
            <div className="py-3 px-5 text-white mt-5 mb-10">
               <h1 className="text-white font-title text-5xl">Contact Roy</h1>
            </div>
            <div className="text-white text-xl mt-16 mb-10 grid grid-cols-3 gap-40">
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
                        contactName: 'sdf',
                        contactEmail: 'asdf',
                        contactPhone: 3234,
                        contactMessage: 'asdfd',
                     }}
                     validateSchema={validateSchema}
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
                           <div className="flex flex-row items-center mt-5 mb-6 text-2xl ">
                              <label
                                 htmlFor="contactName"
                                 className="w-48 block"
                              >
                                 Name
                              </label>
                              <Field
                                 className="w-full h-14 text-gray-900 text-3xl"
                                 name="contactName"
                                 type="text"
                                 id="contactName"
                              />
                              {errors.contactName && touched.contactName ? (
                                 <div>{errors.contactName}</div>
                              ) : null}
                           </div>
                           <div className="flex flex-row items-center  mt-5 mb-6 text-2xl">
                              <label
                                 htmlFor="contactEmail"
                                 className="w-48 block"
                              >
                                 Email
                              </label>
                              <Field
                                 className="w-full h-14 text-gray-900 text-3xl"
                                 type="email"
                                 id="contactEmail"
                                 name="contactEmail"
                              />
                           </div>
                           <div className="flex flex-row items-center  mt-5 mb-6 text-2xl">
                              <label
                                 htmlFor="contactPhone"
                                 className="w-48 block"
                              >
                                 Phone
                              </label>
                              <Field
                                 className="w-full h-14 text-gray-900 text-3xl"
                                 type="text"
                                 id="contactPhone"
                                 name="contactPhone"
                              />
                           </div>
                           <div className="flex flex-row items-start  mt-5 mb-6 text-2xl">
                              <label
                                 htmlFor="contactMessage"
                                 className="w-48 block pt-1.5"
                              >
                                 Message
                              </label>
                              <Field
                                 id="contactMessage"
                                 name="contactMessage"
                                 as="textarea"
                                 className="w-full h-48 text-gray-900 text-3xl"
                              ></Field>
                           </div>
                           <div className="mt-5 mb-6 ml-40 text-2xl">
                              <button
                                 type="submit"
                                 className="bg-yellow text-blue-700 font-bold py-4 px-6"
                              >
                                 Send Message
                              </button>
                              <div className="bg-white text-black">
                                 <pre>
                                    Values: {JSON.stringify(values, null, 2)}
                                 </pre>
                                 <pre>
                                    Errors: {JSON.stringify(errors, null, 2)}
                                 </pre>
                                 {/* <pre>
                                    Yup:{' '}
                                    {JSON.stringify(validateSchema, null, 2)}
                                 </pre> */}
                              </div>
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
