import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPost, getPostSlugs } from '@/lib/mdx';

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">{post.date}</p>
      <div className="prose dark:prose-invert">
        <MDXRemote source={post.content} />
      </div>
    </div>
  );
}