import { allPages, allPosts, allPortfolios } from '../.contentlayer/generated'

export async function getServerSideProps({ res }) {
   const posts = allPosts
      .filter(post => {
         return post.postType === 'article' || 'snippet'
      })
      .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))

   const portfolios = allPortfolios.sort((a, b) => {
      return (a.index as number) - (b.index as number)
   })

   console.log('test', allPages)

   res.setHeader('Content-Type', 'text/xml')
   res.setHeader(
      'Cache-Control',
      'public, s-maxage=122, stale-while-revalidate=600'
   )

   res.write(
      `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${allPages.map(page => {
            return `<url><loc>${`https://royanger.dev/${page._raw.flattenedPath.replace(
               /^\pages\//,
               ''
            )}`}</loc></url>`
         })}
         ${portfolios.map(portfolio => {
            return `<url><loc>${`https://royanger.dev/${portfolio._raw.flattenedPath}`}</loc></url>`
         })}
         ${posts.map(post => {
            return `<url><loc>${`https://royanger.dev/${post._raw.flattenedPath}`}</loc></url>`
         })}
      </urlset>
      `
   )
   res.end()

   return { props: {} }
}

export default function Sitemap() {
   return null
}
