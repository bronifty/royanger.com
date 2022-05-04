export const GTM = 'GTM-K427PD5'

declare global {
   interface Window {
      dataLayer?: any
   }
}

export const pageview = (url: any) => {
   window.dataLayer.push({
      event: 'pageview',
      page: url,
   })
}

export const SITENAME = 'Roy Anger'
