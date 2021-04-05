import * as React from 'react'

interface Props {
   children: any
   bgImage?: string
   bgSVG?: string
   styles?: string
   bgOpacity?: string
   bgColor?: string
}

const WrapperBody = ({
   children,
   bgImage,
   bgSVG,
   styles,
   bgOpacity,
   bgColor,
}: Props) => {
   const bgImageDivClassNames = 'w-full flex flex-row justify-center'
   const bgColorDivClassNames = 'w-full flex flex-row justify-center'
   const coreDivClassNames = 'w-full xl:w-1440'

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
   if (bgSVG && bgColor) {
      return (
         // <div
         //    style={{
         //       backgroundImage: `url(/images/svgs/circle-scatter-haikei.svg)`,
         //    }}
         // >
         <div
            style={{
               backgroundImage: `url(${bgSVG})`,
               backgroundSize: 'cover',
            }}
            className={`${bgImageDivClassNames} ${bgColor}`}
         >
            <div className={`${bgColorDivClassNames} ${bgOpacity}`}>
               <div className={`${coreDivClassNames} ${styles}`}>
                  {children}
               </div>
            </div>
         </div>
         // </div>
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

export default WrapperBody