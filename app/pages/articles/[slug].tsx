import * as React from 'react';
import client from '../../src/client';
import Head from 'next/head';

const Post = ({ title, byline, name, imageUrl, categories }) => {
  return (
    <div>
      <Head>
        <title>Roy Anger - {title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <h1> {title}</h1>
      <h2>{byline}</h2>
      <h3>by: {name}</h3>
      <img src={imageUrl} />
      <p>{categories.map((cat) => cat)}</p>
    </div>
  );
};

const query = `*[_type == "post" && slug.current == $slug][0]{
                 _id,
                 title,
                 byline,
                 "name": author->name,
                 "categories": categories[]->title,
                 "slug": slug.current,
                 "imageUrl": mainImage.asset->url
              }`;

Post.getInitialProps = async function (context) {
  // default slug to empty string to prevent undefined error
  const { slug = '' } = context.query;
  return await client.fetch(query, { slug });
};

export default Post;
