import * as React from 'react'

const serializers = {
   types: {
      Code: ({ node = {} }) => {
         const { code, language } = node
         if (!code) {
            return null
         }
         return (
            <pre data-language={language}>
               <code>{code}</code>
            </pre>
         )
      },
   },
}

export default serializers
