export default {
   name: 'post',
   title: 'Post',
   type: 'document',
   fields: [
      {
         name: 'title',
         title: 'Title',
         type: 'string',
         validation: Rule => Rule.required(),
      },
      {
         name: 'byline',
         title: 'Byline',
         type: 'string',
         validation: Rule =>
            Rule.max(255)
               .required('A byline is required')
               .warning('A byline is required, and limited to 255 characters'),
      },
      {
         name: 'slug',
         title: 'Slug',
         type: 'slug',
         options: {
            source: 'title',
         },
         validation: Rule => Rule.required(),
      },
      {
         name: 'author',
         title: 'Author',
         type: 'reference',
         validation: Rule => Rule.required(),
         to: { type: 'author' },
      },
      {
         name: 'mainImage',
         title: 'Main image',
         type: 'image',
         validation: Rule => Rule.required(),
         options: {
            hotspot: true,
         },
         fields: [
            {
               name: 'alt',
               type: 'string',
               title: 'Alt Tag',
               validation: Rule => Rule.required(),
            },
         ],
      },
      {
         name: 'categories',
         title: 'Categories',
         type: 'array',
         validation: Rule => Rule.required(),
         of: [{ type: 'reference', to: { type: 'category' } }],
      },
      {
         name: 'publishedAt',
         title: 'Published at',
         type: 'datetime',
         validation: Rule => Rule.required(),
      },
      {
         name: 'body',
         title: 'Body',
         type: 'blockContent',
         validation: Rule => Rule.required(),
      },
   ],

   preview: {
      select: {
         title: 'title',
         author: 'author.name',
         media: 'mainImage',
      },
      prepare(selection) {
         const { author } = selection
         return { ...selection, subtitle: author && `by ${author}` }
      },
   },
}
