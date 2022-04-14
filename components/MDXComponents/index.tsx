const Quote = ({ author, children }) => {
   return (
      <div className=" p-4 relative flex flex-row justify-center">
         <div>
            <div className="text-lg quotes max-w-3xl"> {children}</div>
            <div className="italic">{author}</div>
         </div>
      </div>
   )
}

const MDXComponents = {
   Quote,
}

export default MDXComponents
