import { allPosts } from '../../.contentlayer/generated'
import type { Post } from '../../.contentlayer/generated'

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
