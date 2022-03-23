import { defineDocumentType, makeSource } from 'contentlayer/source-files'

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

export default makeSource({
   contentDirPath: 'content',
   documentTypes: [Post, Pages],
})
