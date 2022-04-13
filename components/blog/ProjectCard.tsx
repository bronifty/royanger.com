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
            {children}
            <div className="grow flex items-end">
               <ExternalLinkButton link={link} name="View on GitHub" />
            </div>
         </div>
      </Card>
   )
}
export default ProjectCard
