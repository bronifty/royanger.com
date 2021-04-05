import * as React from 'react'
//import { createPortableTextComponent } from

interface Props {
   title: string
   image: string
   content: string[]
}

const IndexCard = props => {
   const { section, featuredImage, featuredImageAlt, images } = props.post

   return (
      <div className="m-5 mt-10 mb-10 grid grid-cols-3 bg-white text-blue p-5">
         <div className="w-36">
            <img src={featuredImage} alt={featuredImageAlt} />
         </div>
         <div className="col-span-2">
            <h2 className="text-3xl font-title mb-5">{section}</h2>
            {/* {content.map((paragraph, i) => {
               return (
                  <p key={i} className="pb-3 text-lg">
                     {paragraph}
                  </p>
               )
            })} */}
            {images
               ? images.map((image, i) => {
                    return <img key={i} src={image.src} alt={image.alt} />
                 })
               : ''}
         </div>
      </div>
   )
}

export default IndexCard
