import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { cache } from "react"
import { type ContentDir, type Metadata } from "~/types/content"

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return matter(rawContent)
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map(file => {
    const { content, data } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return {
      metadata: data as Metadata,
      slug,
      content
    }
  })
}

export const getContents = cache(function getContents(contentDir: ContentDir) {
  return getMDXData(path.join(process.cwd(), 'src/content', contentDir))
})
