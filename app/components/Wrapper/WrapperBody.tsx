import * as React from 'react'
import { ThemeContext } from '../../lib/context/themeContext'

interface Props {
   children: any
   bgImage?: string
   bgSVG?: string
   styles?: string
   bgOpacity?: string
   bgColor?: string
   bgGradient?: {
      direction: string
      dark: { from: string; via: string; to: string },
      light: { from: string; via: string; to: string }
   }
}

const WrapperBody = ({
   children,
   bgImage,
   bgSVG,
   styles,
   bgOpacity,
   bgColor,
   bgGradient,
}: Props) => {
   const { theme } = React.useContext(ThemeContext)

   const bgImageDivClassNames = 'w-full flex flex-row justify-center'
   const bgColorDivClassNames = 'w-full flex flex-row justify-center'
   const coreDivClassNames = 'w-full xl:w-1440'

   if (bgImage && bgColor) {
      console.log('image and color')

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
         <div
            style={{
               backgroundImage: `url(${bgSVG})`,
               backgroundSize: 'cover',
            }}
            className={`${bgImageDivClassNames} ${backgroundClasses}`}
         >
            <div className={`${bgColorDivClassNames} ${bgOpacity}`}>
               <div className={`${coreDivClassNames} ${styles}`}>
                  {children}
               </div>
            </div>
         </div>
      )
   }

   if (bgGradient) {
      const gradientClasses = `${bgGradient.direction} ${bgGradient.[theme].from} ${bgGradient.[theme].via} ${bgGradient.[theme].to}`

      return (
         <div className={`${bgImageDivClassNames} ${gradientClasses}`}>
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
      console.log('image only')

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
      console.log('color only')

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
