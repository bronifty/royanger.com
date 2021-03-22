import * as React from 'react'
import client from '../../src/client'
import SanityPortableText, {
   PortableTextProps,
   PortableTextSerializers,
} from '@sanity/block-content-to-react'
import serializers from './serializer'
// import blockContent from '../../../sanity/schemas/blockContent'

interface BaseBlockContent {
   blocks: string
   className: string
   imageOptions: {
      w: number
      h: number
      fit: string
   }
}

// export function BaseBlockContent({
//    blocks,
//    className,
// }: BaseBlockContent & { serializers?: PortableTextSerializers }) => (
//    return function PortableText(props: PortableTextProps) {
//    return (<SanityPortableText
//       blocks={blocks}
//       className={className}
//       serializers={serializers}
//       {...client}
//    />)
//    }
// )

// export default BaseBlockContent
