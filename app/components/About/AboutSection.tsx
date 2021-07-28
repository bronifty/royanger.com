import * as React from 'react'
import BaseBlockContent from '../BaseBlockContent'
import Title from '../Title'

const AboutSection = ({ content }) => {
   return (
      <div className="section">
         <div>
            <Title type="h2">{content.title}</Title>
            <BaseBlockContent
               blocks={content.description}
               className="block-content"
            />
         </div>
         <div>
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
