import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { number } from 'yup'

const Post = defineDocumentType(() => ({
   name: 'Post',
   filePathPattern: `posts/**/*.md`,
   fields: {
      title: {
         type: 'string',
         description: 'The title of the post',
         required: true,
      },
      date: {
         type: 'string',
         description: 'The date of the post',
         required: true,
      },
   },
   computedFields: {
      url: {
         type: 'string',
         resolve: doc => `/content/posts/${doc._raw.flattenedPath}`,
      },
   },
}))

const Pages = defineDocumentType(() => ({
   name: 'Page',
   filePathPattern: `pages/**/*.md`,
   fields: {
      pageTitle: {
         type: 'string',
         description: 'The title of the page for the head tag',
         required: true,
      },
      pageKeywords: {
         type: 'string',
         description: 'The keywords for the page',
         required: true,
      },
      title: {
         type: 'string',
         description: 'The title to be displayed on page',
         required: true,
      },
      subTitle: {
         type: 'string',
         description: 'A subtitle to display under the title. Optional',
         required: false,
      },
   },
   computedFields: {
      url: {
         type: 'string',
         resolve: doc => `/content/pages/${doc._raw.flattenedPath}`,
      },
   },
}))

const Portfolio = defineDocumentType(() => ({
   name: 'Portfolio',
   filePathPattern: `portfolio/**/*.md`,
   fields: {
      project: {
         type: 'string',
         description: 'The title of the project',
         required: true,
      },
      slug: {
         type: 'string',
         description: 'Slug for viewing individual projects',
         required: true,
      },
      index: {
         type: 'number',
         description: 'Order to list on portfolio',
         required: true,
      },
      description: {
         type: 'string',
         description: 'A description for the page',
         required: true,
      },
      github: {
         type: 'string',
         description: 'GitHub URL for project',
         required: true,
      },
      preview: {
         type: 'string',
         description: 'A link to preview the project where deployed',
         required: true,
      },
      techstack: {
         type: 'list',
         description:
            'A list of the languages, frameworks, libraries, databases, etc, used in the project.',
         required: true,
         of: Portfolio,
      },
      image: {
         type: 'string',
         description:
            'The image name, minus the extension, for the portfolio image.',
         required: false,
      },
   },
   computedFields: {
      url: {
         type: 'string',
         resolve: doc => `/content/portfolio/${doc._raw.flattenedPath}`,
      },
   },
}))

export default makeSource({
   contentDirPath: 'content',
   documentTypes: [Post, Pages, Portfolio],
})
