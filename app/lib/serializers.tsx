import * as React from 'react'
import BlockContent from '@sanity/block-content-to-react'

interface serializer {
   node: {
      code: string
      language?: string
   }
}

const overrides = {
   p: props => <p className="TESTTEST" {...props} />,
   normal: props => <p className="mb-6" {...props} />,
}
console.log(overrides.p({ children: 'test' }))

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
      block: props =>
         //console.log(props.node.style),
         overrides[props.node.style]
            ? overrides[props.node.style]({ children: props.children })
            : BlockContent.defaultSerializers.types.block(props),
   },
}

export default serializers
