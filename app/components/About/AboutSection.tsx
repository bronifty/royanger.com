import * as React from 'react'
import BaseBlockContent from '../BaseBlockContent'

const AboutSection = ({ content }) => {
   console.log(content)

   return (
      <div className="grid grid-cols-5 mb-16">
         <div className="col-span-3 pr-20">
            <h2 className="font-title text-4xl mb-10">{content.title}</h2>
            <BaseBlockContent
               blocks={content.description}
               className="text-white font-sans text-lg mb-8"
            />
         </div>
         <div className="col-span-2">
            {content.images &&
               content.images.map(image => {
                  return (
                     <img key={image._key} src={image.src} alt={image.alt} />
                  )
               })}
         </div>
      </div>
   )
}

export default AboutSection
