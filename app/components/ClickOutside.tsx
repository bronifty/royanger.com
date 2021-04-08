import * as React from 'react'

type onClickFunction = () => void

interface ClickOutside {
   children: any
   onClick?: onClickFunction
}

const ClickOutside = ({ children, onClick }: ClickOutside) => {
   const refs = React.Children.map(children, () => React.createRef())

   const handleClick = (e: any) => {
      const isOutside = refs.every(ref => {
         return !ref.current.contains(e.target)
      })
      if (isOutside) {
         onClick()
      }
   }

   React.useEffect(() => {
      document.addEventListener('click', handleClick)

      return function () {
         console.log('cleanup run')

         document.removeEventListener('click', handleClick)
      }
   })

   return React.Children.map(children, (element, idx) =>
      React.cloneElement(element, { ref: refs[idx] })
   )
}

export default ClickOutside
