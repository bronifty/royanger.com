import * as React from 'react'
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
      <article className="shadow-md shadow-black-50 bg-white border-[1px] border-grey-100 dark:border-black-600 dark:bg-black-700 dark:shadow-black-900 rounded flex flex-col mb-12">
         <div className="relative">
            <div className="rounded-t bottom-0 right-0 left-0 bg-white dark:bg-black-700 text-blue dark:text-blue-100 overflow-hidden whitespace-nowrap">
               <Link href={`/portfolio/${slug}`}>
                  <a>
                     <Title type="h2" variant="portfolio">
                        {title}
                     </Title>
                  </a>
               </Link>
            </div>
            <div>
               {/* <Link href={`/portfolio/${slug}`} passHref> */}
               <Image
                  alt={`Preview of ${title}`}
                  src={`/images/portfolio/${image.split('|')[0]}`}
                  height={image.split('|')[2]}
                  width={image.split('|')[1]}
               />
               {/* </Link> */}
            </div>
         </div>
         <div className="p-4 flex flex-col grow">
            <div className="grow">
               <p>{description}</p>
            </div>

            <div className="mt-10 mb-4 flex flex-wrap">
               {techstack.map((item, index) => {
                  return <Tag key={index} item={item} />
               })}
            </div>
            <div>
               <div className="inline-flex flex-row flex-wrap relative border-[1px] rounded border-grey-500 p-3 pr-0 mt-5 mb-3">
                  <span className="absolute top-0 bg-white dark:bg-black-700 text-grey-700 dark:text-grey-100 text-sm translate-y-[-50%] px-2">
                     View the Project
                  </span>

                  <Button
                     link={`/portfolio/${slug}`}
                     name="More Details"
                     title={title}
                  />
                  <ExternalLinkButton
                     link={github}
                     name="GitHub"
                     label={`${title} on GitHub`}
                  />
                  <ExternalLinkButton
                     link={preview}
                     name="Preview"
                     label={`${title}'s preview`}
                  />
               </div>
            </div>
         </div>
      </article>
   )
}
