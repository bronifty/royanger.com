import * as React from 'react';

interface Props {
  children: any;
  bgImage?: string;
  styles?: string;
}

const Wrapper = ({ children, bgImage, styles }: Props) => {
  if (bgImage) {
    return (
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className='w-full flex flex-row justify-center'
      >
        <div className={`w-full xl:w-1440 pt-20 ${styles}`}>{children}</div>
      </div>
    );
  }

  return <div className={`w-full xl:w-1440 pt-20 ${styles}`}>{children}</div>;
};

export default Wrapper;
