import * as React from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import 'yup-phone'
import axios from 'axios'
import Title from '../components/Title'
import TextInput from '../components/Contact/TextInput'
import TextareaInput from '../components/Contact/TextareaInput'
import SubmitButton from '../components/Buttons/Submit'
import ListItem from '../components/Contact/ListItem'
import HTMLHead from '../components/HTMLHead'
import { allPages } from '../.contentlayer/generated'
import { Page } from '../.contentlayer/generated'
import { SOCIALS } from '../lib/constants/socials'

interface Values {
   contactName: string
   contactEmail: string
   contactPhone: string
   contactMessage: string
}

const validateSchema = Yup.object().shape({
   contactName: Yup.string()
      .min(2, 'Your name is too short')
      .max(150, 'Your name is too long')
      .required('This field is required'),
   contactEmail: Yup.string()
      .email('Invalid Email')
      .required('This field is required'),
   contactPhone: Yup.string()
      .phone('CA', true, 'Please enter a valid phone number')
      .required('This field is required'),
   contactMessage: Yup.string()
      .min(10, 'Please enter a longer message')
      .required('This field is required'),
})

// load titles and meta info from contentlayer
export async function getStaticProps() {
   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/contact'
   )
   return {
      props: {
         page,
      },
   }
}

function Contact({ page }: { page: Page }) {
   const [submitted, setSubmitted] = React.useState(false)

   const handleChange = () => {
      setSubmitted(false)
   }

   const meta = {
      title: page?.pageTitle,
      keywords: page?.pageKeywords,
   }

   return (
      <>
         <HTMLHead pageMeta={meta} />

         <div className="flex flex-row justify-center">
            <div className="w-full max-w-7xl">
               <article>
                  <Title type="h1">{page.title}</Title>
                  <Title type="h2">{page.subTitle ? page.subTitle : ''}</Title>
                  <section className="max-w-2xl mt-16">
                     <div className="">
                        <Title type="h3" variant="h3ash4">
                           Send a message
                        </Title>
                        <p className="max-w-2xl mt-6 mb-10">
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
                              setSubmitted(true)
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
                           {({ values, errors, touched, isSubmitting }) => (
                              <Form>
                                 <TextInput
                                    name="contactName"
                                    label="Name"
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                 />

                                 <TextInput
                                    name="contactEmail"
                                    label="Email"
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                 />

                                 <TextInput
                                    name="contactPhone"
                                    label="Phone"
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                 />

                                 <TextareaInput
                                    name="contactMessage"
                                    label="Message"
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                 />
                                 <div className="ml-28">
                                    {submitted ? (
                                       <SubmitButton submitted={true}>
                                          Submitted
                                       </SubmitButton>
                                    ) : (
                                       <SubmitButton submitted={false}>
                                          {isSubmitting
                                             ? 'Submitting'
                                             : 'Submit Form'}
                                       </SubmitButton>
                                    )}
                                    <div className="h-10">
                                       {submitted ? (
                                          <div className="bg-grey-200 p-4 text-xl font-code font-bold rounded-lg mt-2">
                                             {' '}
                                             Your form was successfully
                                             submitted
                                          </div>
                                       ) : (
                                          ''
                                       )}
                                    </div>
                                 </div>
                              </Form>
                           )}
                        </Formik>
                     </div>
                  </section>
                  <section className="max-w-2xl mt-16">
                     <Title type="h3" className="mb-4" variant="h3ash4">
                        Places to find me:
                     </Title>
                     <ul className="text-lg mt-8">
                        {SOCIALS.filter(
                           platform => platform.type !== 'contact'
                        ).map(platform => {
                           return (
                              <ListItem
                                 key={platform.type}
                                 label={platform.title}
                                 link={platform.link}
                                 type={platform.type}
                              />
                           )
                        })}
                     </ul>
                  </section>
               </article>
            </div>
         </div>
      </>
   )
}

export default Contact
