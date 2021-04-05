// TODO Probably won't need this anymore
// declare module '*.svg' {
//    import React = require('react')
//    export const ReactComponent: React.FunctionComponent<
//       React.SVGProps<SVGSVGElement>
//    >
//    const src: string
//    export default src
// }

export interface ProjectConfig {
   projectId: string
   dataset: string
}
