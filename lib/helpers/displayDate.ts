const months = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
]

export const displayDate = (timestamp: string) => {
   const date = new Date(timestamp)

   return `${date.getUTCDate()} ${
      months[date.getUTCMonth()]
   }, ${date.getUTCFullYear()}`
}
