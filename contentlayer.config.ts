import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypeExternalLinks from 'rehype-external-links'
import { getLastEditedDate } from './lib/utils'

const Post = defineDocumentType(() => ({
   name: 'Post',
   filePathPattern: `posts/**/*.mdx`,
   contentType: 'mdx',
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
      postType: {
         type: 'string',
         description: 'Specify that this is a "bookmark" or "article"',
         required: true,
      },
      tags: {
         type: 'list',
         description:
            'Tags to display at the bottom of the article/whatever card',
         required: true,
         of: Post,
      },
      link: {
         type: 'string',
         description: 'The link to a bookmark',
         required: false,
      },
      slug: {
         type: 'string',
         description: 'A slug for blog posts',
         required: false,
      },
      excerpt: {
         type: 'string',
         description: 'Short text to show on card for articles',
         required: true,
      },
      image: {
         type: 'string',
         description:
            'The image shown both in the reading material index and, if a blog post, the article header. Do not include extension -- .jpg is assumed',
         required: false,
      },
      imageWidth: {
         type: 'number',
         required: false,
      },
      imageHeight: {
         type: 'number',
         required: false,
      },
   },
   computedFields: {
      url: {
         type: 'string',
         resolve: doc => `/content/posts/${doc._raw.flattenedPath}`,
      },
      readingTime: { type: 'json', resolve: doc => readingTime(doc.body.raw) },
      wordCount: {
         type: 'number',
         resolve: doc => doc.body.raw.split(/\s+/gu).length,
      },
      last_edited: { type: 'date', resolve: getLastEditedDate },
   },
}))

const Pages = defineDocumentType(() => ({
   name: 'Page',
   filePathPattern: `pages/**/*.mdx`,
   contentType: 'mdx',
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
   filePathPattern: `portfolio/**/*.mdx`,
   contentType: 'mdx',
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
      gallery: {
         type: 'list',
         description: 'Images to display as gallery',
         required: false,
         of: Portfolio,
      },
   },
   computedFields: {
      url: {
         type: 'string',
         resolve: doc => `/content/portfolio/${doc._raw.flattenedPath}`,
      },
   },
}))

const contentLayerConfig = makeSource({
   contentDirPath: 'content',
   documentTypes: [Post, Pages, Portfolio],
   mdx: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
         rehypeAccessibleEmojis,
         rehypeSlug,
         rehypeCodeTitles,
         [rehypePrism, { showLineNumbers: true }],
         [rehypeExternalLinks, { target: ['_blank'], rel: ['nofollow'] }],
         [
            rehypeAutolinkHeadings,
            {
               properties: {
                  className: ['anchor'],
               },
            },
         ],
      ],
   },
})

export default contentLayerConfig
