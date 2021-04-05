import * as React from 'react'
import SanityPortableText, {
   PortableTextProps,
   PortableTextSerializers,
} from '@sanity/block-content-to-react'
import { ProjectConfig } from '../lib/@types/types'

export function createPortableTextComponent({
   projectId,
   dataset,
   serializers,
}: ProjectConfig & { serializers?: PortableTextSerializers }) {
   return function PortableText(props: PortableTextProps) {
      return (
         <SanityPortableText
            projectId={projectId}
            dataset={dataset}
            serializers={serializers}
            {...props}
         />
      )
   }
}
