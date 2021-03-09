import * as React from 'react';
import sanityClient from '../src/client';
import Head from 'next/head';

// import components
import BlogCard from '../src/components/BlogCard';

const Blog = () => {
  const [posts, setPosts] = React.useState(null);

  React.useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
               _id,
               title,
               byline,
               "name": author->name,
               "categories": categories[]->title,
               "slug": slug.current,
               "imageUrl": mainImage.asset->url
            }`
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Head>
        <title>Roy Anger - Articles</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <h1>Blog</h1>
      <div className='flex flex-row'>
        {posts &&
          posts.map(
            ({ _id, title, name, byline, slug, imageUrl, categories }) => {
              return (
                <BlogCard
                  key={_id}
                  title={title}
                  author={name}
                  byline={byline}
                  slug={slug}
                  image={imageUrl}
                  categories={categories}
                />
              );
            }
          )}
      </div>
    </div>
  );
};

export default Blog;
