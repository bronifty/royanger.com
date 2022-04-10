import ExternalLinkButton from '../Buttons/ExternalLinkButton'
import Title from '../Title'

export default function Card({
   title,
   description,
   github,
   preview,
   techstack,
}) {
   return (
      <article className="shadow-sm shadow-blue-100 shadow-black-100 p-4">
         <Title type="h3">{title}</Title>
         <p>{description}</p>

         <div className="">
            {techstack.map((item, index) => {
               return <span key={index}>{item}</span>
            })}
         </div>

         <div className="inline-flex flex-row relative border-2 rounded border-grey-700 p-3 pr-0 mt-5 mb-3">
            <span className="absolute top-0 bg-white text-grey-700 text-sm translate-y-[-50%] px-2">
               View the Project
            </span>
            <ExternalLinkButton link={github} name="GitHub" />
            <ExternalLinkButton link={preview} name="Preview" />
         </div>
         <p>{techstack}</p>
         {/* <div
                              className="page-content"
                              dangerouslySetInnerHTML={{
                                 __html: item.body.html,
                              }}
                           /> */}
      </article>
   )
}
