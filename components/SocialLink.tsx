import Link from 'next/link'

import {
   GitHubIcon,
   LinkedInIcon,
   TwitterIcon,
   InstagramIcon,
   EnvelopeIcon,
   NPMIcon,
} from './icons'

export const COLORS = {
   github: 'hover:text-github',
   linkedin: 'hover:text-linkedin',
   twitter: 'hover:text-twitter',
   npm: 'hover:text-npm',
   instagram: 'hover:text-instagram',
   contact: 'hover:text-blue',
}

interface SocialLink {
   type: string
   label: string
   link: string
}

export const SocialLink = ({ type, label, link }: SocialLink) => {
   const components = {
      github: GitHubIcon,
      linkedin: LinkedInIcon,
      twitter: TwitterIcon,
      npm: NPMIcon,
      instagram: InstagramIcon,
      contact: EnvelopeIcon,
   }

   const SelectComponent = components[type]

   return (
      <Link href={link} passHref>
         <a target="_blank" className={COLORS[type]} aria-label={label}>
            <SelectComponent className="h-8" />
         </a>
      </Link>
   )
}
