export default {
   name: 'indexpage',
   title: 'Index Page',
   type: 'document',
   fields: [
      {
         name: 'section',
         title: 'Section',
         type: 'string',
         validation: Rule => Rule.required(),
      },
      {
         name: 'featuredImage',
         title: 'Featured Image',
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
         name: 'description',
         title: 'Description',
         type: 'blockContent',
         validation: Rule => Rule.required(),
      },
      {
         name: 'images',
         type: 'array',
         title: 'Alternate Images',
         of: [
            {
               name: 'image',
               type: 'image',
               title: 'Image',
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
         ],
         options: {
            layout: 'grid',
         },
      },
   ],
}
