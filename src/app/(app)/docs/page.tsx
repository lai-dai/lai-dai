import Link from "next/link"
import { getContents } from "~/lib/content"

export default function PostPage() {
  const docs = getContents('docs')

  return (
    <div className={"mx-auto py-6"}>
      <div className={"flex flex-col gap-3"}>
        {docs.map((doc, key) => (
          <Link
            className={"hover:underline"}
            href={`/posts/${doc.slug}`}
            key={key}>
            {doc.metadata.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
