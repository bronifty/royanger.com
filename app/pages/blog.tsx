import * as React from 'react';
import sanityClient from '../src/client.js';

const Blog = () => {
  const [posts, setPosts] = React.useState(null);

  React.useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
               _id,
               title,
               slug{
                  current
               },
               mainImage{
                  asset{
                     _ref
                  }
               }
            }`
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  if (posts) {
    console.log(posts);
  }

  return (
    <div>
      <h1>Blog</h1>
      <div>
        {posts &&
          posts.map((post, index) => {
            return (
              <div key={index}>
                <h2>{post.title}</h2>
                <img src={post.mainImage.asset._ref} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Blog;
