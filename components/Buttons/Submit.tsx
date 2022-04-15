import * as React from 'react'

type SubmitButton = {
   label: string
}
const SubmitButton = ({ label }: SubmitButton) => {
   return (
      <div>
         <button type="submit">{label}</button>
      </div>
   )
}

export default SubmitButton
