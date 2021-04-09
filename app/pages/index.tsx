import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import sanityClient from '../lib/sanity/client'

// import components
import WrapperHeader from '../components/Wrapper/WrapperHeader'
import WrapperBody from '../components/Wrapper/WrapperBody'
import IndexCard from '../components/IndexCard'

const Index = ({ posts }) => {
   return (
      <>
         <Head>
            <title>Roy Anger - Full Stack Developer</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>

         <WrapperHeader
            styles="h-screen"
            bgSVG="index-bg"
            bgColor="dark:bg-blue bg-gray"
            bgOpacity="dark:bg-opacity-90 bg-opacity-80"
         >
            <div className="h-full flex flex-col lg:items-center justify-center">
               <h1 className="text-6xl md:text-9xl font-code text-secondary p-3">
                  Roy Anger
               </h1>
               <h2 className="text-3xl md:text-6xl font-title leading-loose text-accent p-3">
                  # full stack web developer
               </h2>
               <h3 className="text-xl md:text-4xl font-sans text-primary mt-10 bg-opacity-70 font-bold p-3">
                  Watch for the new site and portfolio - coming soon!
               </h3>
            </div>
         </WrapperHeader>
         <WrapperBody
            bgGradient={{
               direction: 'bg-gradient-to-b',
               dark: {
                  from: 'from-blue',
                  via: 'via-blue-300',
                  to: 'to-blue-100',
               },
               light: {
                  from: 'from-blue-50',
                  via: 'via-brightyellow-50',
                  to: 'to-brightyellow-200',
               },
            }}
         >
            <h2 className="text-6xl text-secondary font-title mt-10">
               # languages and skills
            </h2>
            {/*
               Over the last six months I have been focusing on learning React,
               Node and some of the other technologies involved in the wide
               world of full stack development. I come from a WordPress/PHP
               background before that, but React and Node are much more fun and
               interesting to work with. I've been loving the learning curve and
               the switch to Javascript, React and the related technologies. */}

            <div className="text-white grid grid-cols-2 mt-6 mb-10">
               {posts.map(post => {
                  return <IndexCard key={post._id} post={post} />
               })}
            </div>
            <svg
               id="visual"
               viewBox="0 0 960 540"
               width="960"
               height="540"
               xmlns="http://www.w3.org/2000/svg"
               version="1.1"
            >
               <rect x="0" y="0" width="960" height="540" fill="#FFF5D6"></rect>
               <g id="index-bg-light-sky" fill="#FFE45C">
                  <circle
                     id="index-bg-light-sun"
                     r="29"
                     cx="47"
                     cy="85"
                  ></circle>
               </g>

               <g id="index-bg-light-waves">
                  <path
                     id="index-bg-light-wave1"
                     d="M0 409L12.3 409.5C24.7 410 49.3 411 74 413.7C98.7 416.3 123.3 420.7 148 419.2C172.7 417.7 197.3 410.3 221.8 407.3C246.3 404.3 270.7 405.7 295.2 405.2C319.7 404.7 344.3 402.3 369 400.3C393.7 398.3 418.3 396.7 443 398C467.7 399.3 492.3 403.7 517 405.5C541.7 407.3 566.3 406.7 591 408.7C615.7 410.7 640.3 415.3 664.8 414.2C689.3 413 713.7 406 738.2 405.2C762.7 404.3 787.3 409.7 812 408.7C836.7 407.7 861.3 400.3 886 401.3C910.7 402.3 935.3 411.7 947.7 416.3L960 421L960 541L947.7 541C935.3 541 910.7 541 886 541C861.3 541 836.7 541 812 541C787.3 541 762.7 541 738.2 541C713.7 541 689.3 541 664.8 541C640.3 541 615.7 541 591 541C566.3 541 541.7 541 517 541C492.3 541 467.7 541 443 541C418.3 541 393.7 541 369 541C344.3 541 319.7 541 295.2 541C270.7 541 246.3 541 221.8 541C197.3 541 172.7 541 148 541C123.3 541 98.7 541 74 541C49.3 541 24.7 541 12.3 541L0 541Z"
                     fill="#000A14"
                  ></path>

                  <path
                     id="index-bg-light-wave2"
                     d="M0 437L12.3 436C24.7 435 49.3 433 74 431.7C98.7 430.3 123.3 429.7 148 428.5C172.7 427.3 197.3 425.7 221.8 427.7C246.3 429.7 270.7 435.3 295.2 437.7C319.7 440 344.3 439 369 440.5C393.7 442 418.3 446 443 445C467.7 444 492.3 438 517 435.2C541.7 432.3 566.3 432.7 591 433.3C615.7 434 640.3 435 664.8 433.8C689.3 432.7 713.7 429.3 738.2 430C762.7 430.7 787.3 435.3 812 438.5C836.7 441.7 861.3 443.3 886 440.7C910.7 438 935.3 431 947.7 427.5L960 424L960 541L947.7 541C935.3 541 910.7 541 886 541C861.3 541 836.7 541 812 541C787.3 541 762.7 541 738.2 541C713.7 541 689.3 541 664.8 541C640.3 541 615.7 541 591 541C566.3 541 541.7 541 517 541C492.3 541 467.7 541 443 541C418.3 541 393.7 541 369 541C344.3 541 319.7 541 295.2 541C270.7 541 246.3 541 221.8 541C197.3 541 172.7 541 148 541C123.3 541 98.7 541 74 541C49.3 541 24.7 541 12.3 541L0 541Z"
                     fill="#001D3D"
                  ></path>

                  <path
                     id="index-bg-light-wave3"
                     d="M0 456L12.3 456.8C24.7 457.7 49.3 459.3 74 459.8C98.7 460.3 123.3 459.7 148 461C172.7 462.3 197.3 465.7 221.8 468.3C246.3 471 270.7 473 295.2 470.2C319.7 467.3 344.3 459.7 369 456.3C393.7 453 418.3 454 443 454C467.7 454 492.3 453 517 452C541.7 451 566.3 450 591 452.8C615.7 455.7 640.3 462.3 664.8 462.8C689.3 463.3 713.7 457.7 738.2 455C762.7 452.3 787.3 452.7 812 452.5C836.7 452.3 861.3 451.7 886 454.7C910.7 457.7 935.3 464.3 947.7 467.7L960 471L960 541L947.7 541C935.3 541 910.7 541 886 541C861.3 541 836.7 541 812 541C787.3 541 762.7 541 738.2 541C713.7 541 689.3 541 664.8 541C640.3 541 615.7 541 591 541C566.3 541 541.7 541 517 541C492.3 541 467.7 541 443 541C418.3 541 393.7 541 369 541C344.3 541 319.7 541 295.2 541C270.7 541 246.3 541 221.8 541C197.3 541 172.7 541 148 541C123.3 541 98.7 541 74 541C49.3 541 24.7 541 12.3 541L0 541Z"
                     fill="#003166"
                  ></path>

                  <path
                     id="index-bg-light-wave4"
                     d="M0 494L12.3 491.5C24.7 489 49.3 484 74 480.8C98.7 477.7 123.3 476.3 148 475.7C172.7 475 197.3 475 221.8 476.8C246.3 478.7 270.7 482.3 295.2 485.5C319.7 488.7 344.3 491.3 369 493.2C393.7 495 418.3 496 443 492.8C467.7 489.7 492.3 482.3 517 479.5C541.7 476.7 566.3 478.3 591 478.3C615.7 478.3 640.3 476.7 664.8 478.7C689.3 480.7 713.7 486.3 738.2 486C762.7 485.7 787.3 479.3 812 478.5C836.7 477.7 861.3 482.3 886 486C910.7 489.7 935.3 492.3 947.7 493.7L960 495L960 541L947.7 541C935.3 541 910.7 541 886 541C861.3 541 836.7 541 812 541C787.3 541 762.7 541 738.2 541C713.7 541 689.3 541 664.8 541C640.3 541 615.7 541 591 541C566.3 541 541.7 541 517 541C492.3 541 467.7 541 443 541C418.3 541 393.7 541 369 541C344.3 541 319.7 541 295.2 541C270.7 541 246.3 541 221.8 541C197.3 541 172.7 541 148 541C123.3 541 98.7 541 74 541C49.3 541 24.7 541 12.3 541L0 541Z"
                     fill="#003B7A"
                  ></path>

                  <path
                     id="index-bg-light-wave5"
                     d="M0 519L12.3 519.3C24.7 519.7 49.3 520.3 74 517.2C98.7 514 123.3 507 148 505.5C172.7 504 197.3 508 221.8 510.8C246.3 513.7 270.7 515.3 295.2 516.2C319.7 517 344.3 517 369 518.3C393.7 519.7 418.3 522.3 443 522.3C467.7 522.3 492.3 519.7 517 516.8C541.7 514 566.3 511 591 510.8C615.7 510.7 640.3 513.3 664.8 515.2C689.3 517 713.7 518 738.2 517.2C762.7 516.3 787.3 513.7 812 511.3C836.7 509 861.3 507 886 506.3C910.7 505.7 935.3 506.3 947.7 506.7L960 507L960 541L947.7 541C935.3 541 910.7 541 886 541C861.3 541 836.7 541 812 541C787.3 541 762.7 541 738.2 541C713.7 541 689.3 541 664.8 541C640.3 541 615.7 541 591 541C566.3 541 541.7 541 517 541C492.3 541 467.7 541 443 541C418.3 541 393.7 541 369 541C344.3 541 319.7 541 295.2 541C270.7 541 246.3 541 221.8 541C197.3 541 172.7 541 148 541C123.3 541 98.7 541 74 541C49.3 541 24.7 541 12.3 541L0 541Z"
                     fill="#004FA3"
                  ></path>
               </g>
            </svg>
         </WrapperBody>
      </>
   )
}

export const getStaticProps = async () => {
   const posts = await sanityClient.fetch(`*[_type == "indexpage" && type == "techstacks"] | order(order){
      _id,
      section,
      description,
      "featuredImage": featuredImage.asset->url,
      "featuredImageAlt": featuredImage.alt,
      "images": images[]{ _key, alt, "src": asset->url }
    }`)

   return { props: { posts } }
}

export default Index
