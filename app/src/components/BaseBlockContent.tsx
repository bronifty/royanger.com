import * as React from 'react'
import client from '../../src/client'
import BlockContent from '@sanity/block-content-to-react'
import serializers from './serializer'
import blockContent from '../../../sanity/schemas/blockContent'

const BaseBlockContent = ({ blocks, className }) => (
   <BlockContent
      blocks={blocks}
      className={className}
      serializers={serializers}
      {...client}
   />
)

export default BaseBlockContent
