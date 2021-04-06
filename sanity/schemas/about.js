export default {
   name: 'about',
   title: 'About Page',
   type: 'document',
   fields: [
      {
         name: 'section',
         title: 'Section',
         type: 'string',
         validation: Rule => Rule.required(),
      },
      {
         name: 'order',
         title: 'Order',
         type: 'number',
      },
      {
         name: 'description',
         title: 'Content',
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
