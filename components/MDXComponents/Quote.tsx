type Quote = {
   author: string
   children: React.ReactChild
}

const Quote = ({ author, children }: Quote) => {
   return (
      <div className=" p-4 relative flex flex-row justify-center">
         <div>
            <div className="text-lg quotes max-w-3xl"> {children}</div>
            <div className="italic">{author}</div>
         </div>
      </div>
   )
}

export default Quote
