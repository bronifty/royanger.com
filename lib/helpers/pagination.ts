import { allPosts } from '../../.contentlayer/generated'

const postsPerPage = 12

export function calculatePages() {
   return Math.round(allPosts.length / postsPerPage)
}

export function sortPosts(posts) {
   return posts.sort(
      (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
   )
}

export function pageOfPosts(posts, page) {
   return posts.slice((page - 1) * postsPerPage, page * postsPerPage)
}

export function paginationLinks(currentRoute: number | string) {
   const pageArray = Array.from(Array(calculatePages()).keys()).map(x => x + 1)

   type Pages = {
      label: string
      page: number
      current: boolean
   }

   const pages: Pages[] = [
      {
         label: 'Previous',
         page: 1,
         current: currentRoute === '/reading' ? true : false,
      },
   ]

   pageArray.map(page => {
      pages.push({
         label: page.toString(),
         page: page,
         current: currentRoute === page ? true : false,
      })
   })

   pages.push({
      label: 'Next',
      page: calculatePages(),
      current: currentRoute === '/reading' ? true : false,
   })

   return pages
}
