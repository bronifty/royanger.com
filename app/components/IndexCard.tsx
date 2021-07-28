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
      <div className="m-5 mt-10 mb-10 bg-white text-blue p-8 pb-14 rounded-3xl">
         <div className="flex flex-col h-full">
            <h2 className="text-4xl font-title mt-8 mb-5">{section}</h2>
            <BaseBlockContent
               blocks={description}
               className="text-blue-300 text-xl leading-relaxed mt-5 mb-7 flex-grow"
            />
            <div className="grid grid-cols-2 mt-2 items-end justify-end">
               {images
                  ? images.map((image, i) => {
                       return (
                          <div
                             key={image._key}
                             className="flex items-end justify-center p-3"
                          >
                             <img
                                key={i}
                                className="h-24 w-auto"
                                src={image.src}
                                alt={image.alt}
                             />
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
