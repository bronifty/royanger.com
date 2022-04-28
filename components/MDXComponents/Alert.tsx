import { string } from 'yup'

type Alert = {
   children: React.ReactChild
   type?: string
   emoji?: any
}

const alertTypes = {
   alert: 'bg-red-900',
   info: 'bg-yellow-700',
   callout: 'bg-cyan-700',
}

const Alert = ({ children, type, emoji }: Alert) => {
   const alert =
      Object.keys(alertTypes).indexOf(type) > -1 ? alertTypes[type] : undefined

   return (
      <div
         className={`alert bg-grey-100 dark:bg-black-700 font-code flex flex-row my-4 rounded-xl`}
      >
         {alert !== undefined && emoji ? (
            <div
               className={`${alert} min-w-[3rem] flex items-center justify-center rounded-l-xl`}
            >
               {emoji}
            </div>
         ) : (
            <>
               {alert !== undefined ? (
                  <div className={`${alert} min-w-[3rem]  rounded-l-xl`}></div>
               ) : (
                  ''
               )}
               {emoji ? (
                  <div className="min-w-[3rem] flex items-center justify-center rounded-l-xl">
                     {emoji}
                  </div>
               ) : (
                  ''
               )}
            </>
         )}

         <div className="p-2 pl-4">{children}</div>
      </div>
   )
}

export default Alert
