import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'yontm4t8',
  dataset: 'production',
  useCdn: true,
});
