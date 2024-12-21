import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { cache } from "react"
import { type ContentDir, type Metadata } from "~/types/content"

function getFiles(dir: string, files: string[] = [], direct?: string) {
  const listing = fs.readdirSync(dir, { withFileTypes: true })
  const dirs = []
  for (const f of listing) {
    let fileName = f.name
    if (f.isFile()) {
      if (direct) {
        fileName = direct + '/' + fileName
      }
      files.push(fileName)
    } else if (f.isDirectory()) {
      dirs.push(fileName)
    }
  }
  for (const d of dirs) {
    const fullName = path.join(dir, d)
    getFiles(fullName, files, d)
  }
  return files
}

function getMDXFiles(dir: string) {
  return getFiles(dir).filter(file => path.extname(file) === ".mdx")
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return matter(rawContent)
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map(file => {
    const { content, data } = readMDXFile(path.join(dir, file))
    const slug = file.replace(path.extname(file), '')
    return {
      metadata: data as Metadata,
      slug,
      content,
    }
  })
}

export const getContents = cache(function getContents(contentDir: ContentDir) {
  return getMDXData(path.join(process.cwd(), "src/content", contentDir))
})
