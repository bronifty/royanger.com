import Image from 'next/image'

type Images = {
   images: Image[]
}

type Image = {
   name: string
   height: number
   width: number
   alt: string
}

const SkillsImages = ({ images }: Images) => {
   return (
      <>
         <div className="flex flex-row gap-6">
            {images.map((image, index) => {
               return (
                  <Image
                     key={index}
                     src={`/images/skills/${image.name}`}
                     height={image.height / 25}
                     width={image.width / 25}
                     alt={image.alt}
                  />
               )
            })}
         </div>
      </>
   )
}

export default SkillsImages
