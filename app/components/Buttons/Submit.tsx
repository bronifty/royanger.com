import * as React from 'react'

const SubmitButton = ({ label }) => {
   return (
      <div className="submit text-xlarge">
         <button type="submit">{label}</button>
      </div>
   )
}

export default SubmitButton
