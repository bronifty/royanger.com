import * as React from 'react'

interface Props {
   children: any
   bgImage?: string
   styles?: string
   bgOpacity?: string
   bgColor?: string
}

const Wrapper = ({ children, bgImage, styles, bgOpacity, bgColor }: Props) => {
   const bgImageDivClassNames = 'w-full flex flex-row justify-center'
   const bgColorDivClassNames = 'w-full flex flex-row justify-center'
   const coreDivClassNames = 'w-full xl:w-1440 pt-20'
   //const bgOpacityRendered = `bg-opacity-${bgOpacity}`

   if (bgImage && bgColor) {
      return (
         <div
            style={{
               backgroundImage: `url(${bgImage})`,
               backgroundSize: 'cover',
            }}
            className={bgImageDivClassNames}
         >
            <div className={`${bgColorDivClassNames} ${bgColor} ${bgOpacity}`}>
               <div className={`${coreDivClassNames} ${styles}`}>
                  {children}
               </div>
            </div>
         </div>
      )
   }
   if (bgImage) {
      return (
         <div
            style={{
               backgroundImage: `url(${bgImage})`,
               backgroundSize: 'cover',
            }}
            className={bgImageDivClassNames}
         >
            <div className={`${coreDivClassNames} ${styles}`}>{children}</div>
         </div>
      )
   }

   if (bgColor) {
      return (
         <div
            className={`${bgColorDivClassNames} ${bgColor} bg-opacity-${bgOpacity}`}
         >
            <div className={`${coreDivClassNames} ${styles}`}>{children}</div>
         </div>
      )
   }

   return <div className={`${coreDivClassNames} ${styles}`}>{children}</div>
}

export default Wrapper
