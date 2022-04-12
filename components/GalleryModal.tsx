import * as React from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon, NextIcon, PrevIcon } from './icons'

type Modal = {
   show: Function
   onClose: React.MouseEventHandler<HTMLAnchorElement>
   image: string
   alt: string
   handleImageChange: Function
}

const Modal = React.forwardRef<HTMLDivElement, Modal>(
   ({ show, onClose, image, alt, handleImageChange }: Modal, ref) => {
      const [isBrowser, setIsBrowser] = React.useState(false)

      React.useEffect(() => {
         setIsBrowser(true)
      }, [show])

      const modalContent = show ? (
         <div
            className={`fixed top-0 left-0 right-0 bg-white bg-opacity-50 h-screen screen flex justify-center items-center`}
         >
            <div
               ref={ref}
               className=" bg-white m-2 p-6 relative shadow shadow-grey-600"
            >
               <a
                  className="absolute top-0 right-0 bg-white py-1 px-2 rounded-bl-lg z-10"
                  href="#"
                  onClick={onClose}
               >
                  <CloseIcon className="w-5 h-auto" />
               </a>
               <div className=" max-w-7xl relative">
                  <div className="absolute left-0 top-1/2 bg-white bg-opacity-80  rounded-r-xl translate-y-[-50%]">
                     <a
                        className="block py-16 px-2"
                        href="#"
                        onClick={e => handleImageChange(e, 'prev')}
                     >
                        <PrevIcon className="w-6" />
                     </a>
                  </div>
                  <img
                     className=""
                     alt={`Screenshot of ${alt} landing page`}
                     src={`/images/portfolio/${image}.jpg`}
                     srcSet={`/images/portfolio/${image}-tablet.jpg 1000w, /images/portfolio/${image}-mobile.jpg 680w,  /images/portfolio/${image}.jpg`}
                  />
                  <div className="absolute right-0 top-1/2 bg-white bg-opacity-80  rounded-l-xl  translate-y-[-50%]">
                     <a
                        className="block py-16 px-2 "
                        href="#"
                        onClick={e => handleImageChange(e, 'next')}
                     >
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
)

export default Modal
