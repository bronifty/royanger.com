import * as React from 'react';
import Link from 'next/link';

interface Props {
  title: string;
  byline: string;
  author: string;
  slug: string;
  image: string;
  categories?: [string];
}

const BlogCard = ({
  title,
  byline,
  author,
  slug,
  image,
  categories,
}: Props) => {
  return (
    <div className='w-1/2 border border-gray-900 p-3 m-2'>
      <Link href={`/articles/${slug}`}>
        <a>
          <h2>{title}</h2>
        </a>
      </Link>
      <h3>{byline}</h3>
      <h4>by: {author}</h4>
      <img src={image} />
      <p>Slug: {slug}</p>
      <p>{categories ? categories.map((cat) => cat) : ''}</p>
    </div>
  );
};

export default BlogCard;
