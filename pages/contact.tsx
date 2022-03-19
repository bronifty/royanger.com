import * as React from 'react'
import Head from 'next/head'
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Title from '../components/Title'
import TextInput from '../components/Contact/TextInput'
import TextareaInput from '../components/Contact/TextareaInput'
import SubmitButton from '../components/Buttons/Submit'

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

         <div>
            <section>
               <Title type="h1">Contact Roy</Title>
               <section>
                  <div>
                     <Title type="h2">Send a message</Title>
                     <p>
                        Please use the following form to shoot me a quick
                        message. I will get back to you ASAP. I'm looking
                        forward to hearing from you!
                     </p>
                  </div>
                  <div>
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
                           console.log('form was submitted')
                           axios.post(
                              '/api/send-email',
                              {},
                              {
                                 params: {
                                    name: values.contactName,
                                    email: values.contactEmail,
                                    phone: values.contactPhone,
                                    message: values.contactMessage,
                                 },
                              }
                           )
                           setSubmitting(false)
                        }}
                     >
                        {({ values, errors, touched }) => (
                           <Form>
                              <TextInput
                                 name="contactName"
                                 label="Name"
                                 errors={errors}
                                 touched={touched}
                              />

                              <TextInput
                                 name="contactEmail"
                                 label="Email"
                                 errors={errors}
                                 touched={touched}
                              />

                              <TextInput
                                 name="contactPhone"
                                 label="Phone"
                                 errors={errors}
                                 touched={touched}
                              />

                              <TextareaInput
                                 name="contactMessage"
                                 label="Message"
                                 errors={errors}
                                 touched={touched}
                              />
                              <SubmitButton label="Submit Message" />
                           </Form>
                        )}
                     </Formik>
                  </div>
               </section>
            </section>
         </div>
      </>
   )
}

export default Hire
