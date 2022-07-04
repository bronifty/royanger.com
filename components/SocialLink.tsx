import Link from 'next/link'
import { COLORS } from '../lib/constants/socials'

import {
   GitHubIcon,
   LinkedInIcon,
   TwitterIcon,
   InstagramIcon,
   EnvelopeIcon,
   NPMIcon,
} from './icons'

export const SocialLink = ({ type, label, link }) => {
   const components = {
      github: GitHubIcon,
      linkedin: LinkedInIcon,
      twitter: TwitterIcon,
      npm: NPMIcon,
      instagram: InstagramIcon,
      contact: EnvelopeIcon,
   }

   // const color =

   const SelectComponent = components[type]

   return (
      <Link href={link} passHref>
         <a target="_blank" className={COLORS[type]} aria-label={label}>
            <SelectComponent className="h-8" />
         </a>
      </Link>
   )
}
