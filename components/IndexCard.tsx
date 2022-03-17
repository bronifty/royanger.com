import * as React from 'react'
import BaseBlockContent from '../components/BaseBlockContent'

interface Props {
   title: string
   image: string
   section: string
   description: string[]
}

const IndexCard = props => {
   const { section, description, images } = props.post

   return (
      <div>
         <div>
            <h2>{section}</h2>
            <BaseBlockContent blocks={description} className="" />
            <div>
               {images
                  ? images.map((image, i) => {
                       return (
                          <div key={image._key}>
                             <img key={i} src={image.src} alt={image.alt} />
                          </div>
                       )
                    })
                  : ''}
            </div>
         </div>
      </div>
   )
}

export default IndexCard
