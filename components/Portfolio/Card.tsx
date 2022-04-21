import Image from 'next/image'
import Link from 'next/link'
import Button from '../Buttons/Button'
import ExternalLinkButton from '../Buttons/ExternalLinkButton'
import Tag from '../Tag'
import Title from '../Title'

type Card = {
   title: string
   description: string
   github: string
   image: string
   slug: string
   preview: string
   techstack: string[]
}

export default function Card({
   title,
   description,
   github,
   preview,
   techstack,
   image,
   slug,
}: Card) {
   return (
      <article className="shadow-md  shadow-black-50 bg-white dark:bg-grey-800 dark:shadow-black-900 rounded">
         <div className="relative">
            <div className="rounded-t">
               <Image
                  alt={`Preview of ${title}`}
                  src={`/images/portfolio/${image.split('|')[0]}`}
                  height={image.split('|')[2]}
                  width={image.split('|')[1]}
                  className="rounded-t"
               />
            </div>
            <div className="absolute bottom-0 right-0 left-0 bg-white bg-opacity-90 text-blue overflow-hidden whitespace-nowrap">
               <Link href={`/portfolio/${slug}`} passHref>
                  <a>
                     <Title type="portfolio">{title}</Title>
                  </a>
               </Link>
            </div>
         </div>
         <div className="p-4">
            <p>{description}</p>

            <div className="mt-10 mb-4 flex flex-wrap">
               {techstack.map((item, index) => {
                  return <Tag key={index} item={item} />
               })}
            </div>
            <div className="inline-flex flex-row flex-wrap relative border-[1px] rounded border-grey-500 p-3 pr-0 mt-5 mb-3">
               <span className="absolute top-0 bg-white dark:bg-grey-800 text-grey-700 dark:text-grey-100 text-sm translate-y-[-50%] px-2">
                  View the Project
               </span>

               <Button link={`/portfolio/${slug}`} name="More Details" />
               <ExternalLinkButton link={github} name="GitHub" />
               <ExternalLinkButton link={preview} name="Preview" />
            </div>
         </div>
      </article>
   )
}
