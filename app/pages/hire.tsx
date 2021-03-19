import * as React from 'react'
import Head from 'next/head'
import Wrapper from '../src/components/Wrapper'
import { Formik } from 'formik'

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
         <Wrapper bgColor="bg-gray-900">
            <div className="py-3 px-5 text-gray-90 mt-5 mb-10">
               <h1 className="text-gray-200 font-title text-5xl">
                  Contact Roy
               </h1>
            </div>
            <div className="text-gray-200 text-xl mb-10">
               <h2 className="text-title text-2xl mb-2">Contact Form</h2>
               <p className="mb-2">
                  Please use the following form to shoot me a quick message. I
                  will get back to you ASAP. I'm looking forward to hearing from
                  you!
               </p>

               <form className="flex flex-col">
                  <div className="flex flex-row items-center mt-5 mb-6 text-2xl ">
                     <label htmlFor="contactName" className="w-48 block">
                        Your Name
                     </label>
                     <input
                        className="border w-1/2 h-14 text-gray-900 text-3xl"
                        type="name"
                        id="contactName"
                     />
                  </div>
                  <div className="flex flex-row items-center  mt-5 mb-6 text-2xl">
                     <label htmlFor="contactEmail" className="w-48 block">
                        Your Email
                     </label>
                     <input
                        className="w-1/2 h-14 text-gray-900 text-3xl"
                        type="email"
                        id="contactForm"
                     />
                  </div>
                  <div className="flex flex-row items-center  mt-5 mb-6 text-2xl">
                     <label htmlFor="contactPhone" className="w-48 block">
                        Your Phone
                     </label>
                     <input
                        className="w-1/2 h-14 text-gray-900 text-3xl"
                        type="text"
                        id="contactPhone"
                     />
                  </div>
               </form>
            </div>
         </Wrapper>
      </>
   )
}

export default Hire
