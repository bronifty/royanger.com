import * as React from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon, NextIcon, PrevIcon } from './icons'

export default function Modal({
   show,
   onClose,
   image,
   alt,
   handleImageChange,
}) {
   const [isBrowser, setIsBrowser] = React.useState(false)
   const modalRef = React.useRef<HTMLDivElement>(null)

   const handleCloseClick = e => {
      e.preventDefault()
      onClose()
   }

   const clickOffToClose = e => {
      console.log('click')

      if (!modalRef) {
         return
      }
      const ref = modalRef.current
      if (!ref?.contains(e.target)) {
         console.log('closing')
         window.removeEventListener('click', clickOffToClose)
         onClose()
      }
   }

   React.useEffect(() => {
      setIsBrowser(true)

      window.addEventListener('click', clickOffToClose)
      // return () => {
      //    window.removeEventListener('click', clickOffToClose)
      // }
   }, [show])

   const modalContent = show ? (
      <div
         className={`fixed ${
            show ? 'top-0' : 'top-[-100%]'
         } left-0 bg-white bg-opacity-50 h-50 w-screen flex justify-center items-center`}
      >
         <div
            ref={modalRef}
            className=" bg-white m-2 p-6 relative shadow shadow-grey-600"
         >
            <a
               className="absolute top-0 right-0 bg-white py-1 px-2 rounded-bl-lg z-10"
               href="#"
               onClick={handleCloseClick}
            >
               <CloseIcon className="w-5 h-auto" />
            </a>
            <div className=" max-w-7xl relative">
               <div className="absolute left-0 top-1/2 bg-white bg-opacity-80 py-16 px-2 rounded-r-xl translate-y-[-50%]">
                  <a href="#" onClick={e => handleImageChange(e, 'prev')}>
                     <PrevIcon className="w-6" />
                  </a>
               </div>
               <img
                  className=""
                  alt={`Screenshot of ${alt} landing page`}
                  src={`/images/portfolio/${image}.jpg`}
                  srcSet={`/images/portfolio/${image}-tablet.jpg 1000w, /images/portfolio/${image}-mobile.jpg 680w,  /images/portfolio/${image}.jpg`}
               />
               <div className="absolute right-0 top-1/2 bg-white bg-opacity-80 py-16 px-2 rounded-l-xl  translate-y-[-50%]">
                  <a href="#" onClick={e => handleImageChange(e, 'next')}>
                     <NextIcon className="w-6" />
                  </a>
               </div>
            </div>
         </div>
      </div>
   ) : null

   if (isBrowser) {
      return ReactDOM.createPortal(
         modalContent,
         document.querySelector('#modal-root')
      )
   }
   return null
}
