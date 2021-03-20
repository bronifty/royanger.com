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
                  <form className="flex flex-col">
                     <div className="flex flex-row items-center mt-5 mb-6 text-2xl ">
                        <label htmlFor="contactName" className="w-48 block">
                           Name
                        </label>
                        <input
                           className="w-full h-14 text-gray-900 text-3xl"
                           type="text"
                           id="contactName"
                        />
                     </div>
                     <div className="flex flex-row items-center  mt-5 mb-6 text-2xl">
                        <label htmlFor="contactEmail" className="w-48 block">
                           Email
                        </label>
                        <input
                           className="w-full h-14 text-gray-900 text-3xl"
                           type="email"
                           id="contactForm"
                        />
                     </div>
                     <div className="flex flex-row items-center  mt-5 mb-6 text-2xl">
                        <label htmlFor="contactPhone" className="w-48 block">
                           Phone
                        </label>
                        <input
                           className="w-full h-14 text-gray-900 text-3xl"
                           type="text"
                           id="contactPhone"
                        />
                     </div>
                     <div className="flex flex-row items-center  mt-5 mb-6 text-2xl">
                        <label htmlFor="contactMessage" className="w-48 block">
                           Message
                        </label>
                        <textarea
                           id="contactMessage"
                           className="w-full h-48 text-gray-900 text-3xl"
                        ></textarea>
                     </div>
                     <div className="mt-5 mb-6 ml-40 text-2xl">
                        <button
                           type="submit"
                           className="bg-yellow text-blue-700 font-bold py-4 px-6"
                        >
                           Send Message
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </Wrapper>
      </>
   )
}

export default Hire
