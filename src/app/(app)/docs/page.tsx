import Link from "next/link"
import { allDocs } from "~/contentlayer/generated"

export default function PostPage() {
  return (
    <div className={"mx-auto py-6"}>
      <div className={"flex flex-col gap-3"}>
        {allDocs.map((doc, key) => (
          <Link
            className={"hover:underline"}
            href={`/docs/${doc.slug}`}
            key={key}>
            {doc.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
