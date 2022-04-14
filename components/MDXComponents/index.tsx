const Quote = ({ author, children }) => {
   return (
      <div className="border-2 border-blue-50 p-4">
         <div className="text-lg">{children}</div>
         <div className="italic">{author}</div>
      </div>
   )
}

const MDXComponents = {
   Quote,
}

export default MDXComponents
