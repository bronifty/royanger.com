import ExternalLinkButton from '../Buttons/ExternalLinkButton'
import Card from './Card'

type ProjectCard = {
   title: string
   date: string
   type: string
   tags: string[]
   link: string
   children: React.ReactNode
}

const ProjectCard = ({
   title,
   date,
   type,
   tags,
   link,
   children,
}: ProjectCard) => {
   return (
      <Card type={type} tags={tags} title={title} date={date}>
         <div className="flex flex-col h-full">
            <div className="grow">{children}</div>
            <div className="flex items-end border-t-[1px] border-grey-300 mt-6">
               <ExternalLinkButton
                  link={link}
                  name="View on GitHub"
                  label={`${title} on GitHub`}
               />
            </div>
         </div>
      </Card>
   )
}
export default ProjectCard
