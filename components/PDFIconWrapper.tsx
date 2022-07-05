import * as React from 'react'
import { PDFIcon } from './icons'

const PDFIconWrapper = React.forwardRef<HTMLDivElement>((_, ref) => {
   return (
      <div ref={ref}>
         <PDFIcon className="w-6 md:w-6 h-auto mr-2" />
      </div>
   )
})
PDFIconWrapper.displayName = 'PDFIconWrapper'

export default PDFIconWrapper
