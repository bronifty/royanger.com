import ExternalLinkButton from '../Buttons/ExternalLinkButton'
import Title from '../Title'

export default function Card({
   title,
   description,
   github,
   preview,
   techstack,
   image,
}) {
   return (
      <article className="shadow-md  shadow-black-100 dark:shadow-black-700 rounded">
         <div className="relative">
            <div className="">
               <img
                  alt={`Preview of ${title}`}
                  src={`/images/portfolio/${image}.jpg`}
                  srcSet={`/images/portfolio/${image}-tablet.jpg 1000w, /images/portfolio/${image}-mobile.jpg 680w,  /images/portfolio/${image}.jpg`}
               />
            </div>
            <div className="absolute bottom-0 right-0 left-0 bg-white bg-opacity-90 text-blue">
               <Title type="portfolio">{title}</Title>
            </div>
         </div>
         <div className="p-4">
            <p>{description}</p>

            <div className="mt-10 mb-4">
               {techstack.map((item, index) => {
                  return (
                     <span
                        key={index}
                        className="text-blue rounded dark:text-lightblue-300 bg-grey-200 dark:bg-grey-700 py-1 px-2 my-1 mr-2"
                     >
                        {item}
                     </span>
                  )
               })}
            </div>
            <div className="inline-flex flex-row relative border-[1px] rounded border-grey-500 p-3 pr-0 mt-5 mb-3">
               <span className="absolute top-0 bg-white dark:bg-black text-grey-700 dark:text-grey-100 text-sm translate-y-[-50%] px-2">
                  View the Project
               </span>
               <ExternalLinkButton link={github} name="GitHub" />
               <ExternalLinkButton link={preview} name="Preview" />
            </div>
         </div>

         {/* <div
                              className="page-content"
                              dangerouslySetInnerHTML={{
                                 __html: item.body.html,
                              }}
                           /> */}
      </article>
   )
}
