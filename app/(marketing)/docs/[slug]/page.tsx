import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { MdxContent } from '@/components/mdx-content'

export async function generateStaticParams() {
  const blogDir = 'content/blogs/tailwindcss'
  const files = fs.readdirSync(path.join(blogDir))

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }))

  return paths
}

function getPost({ slug }: { slug: string }) {
  const blogDir = 'content/blogs/tailwindcss'

  const markdownFile = fs.readFileSync(
    path.join(blogDir, slug + '.mdx'),
    'utf-8'
  )

  const { data: frontMatter, content } = matter(markdownFile)

  return {
    frontMatter,
    slug,
    content,
  }
}

export default function Post({ params }: any) {
  const props = getPost(params)

  return (
    <>
      <h1>{props.frontMatter.title}</h1>

      <MdxContent source={props.content} />
    </>
  )
}

export async function generateMetadata({ params }: any) {
  const blog = getPost(params)

  return {
    title: blog.frontMatter.title,
    description: blog.frontMatter.description,
  }
}
