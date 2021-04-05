import * as React from 'react'

interface serializer {
   node: {
      code: string
      language?: string
   }
}

const serializers = {
   types: {
      Code: ({ node = { code: 'javascript' } }: serializer) => {
         const { code, language } = node
         if (!code) {
            return null
         }
         return (
            <pre>
               <code className={`language-${language}`}>{code}</code>
            </pre>
         )
      },
   },
}

export default serializers
