import React from "react"
import { getGrammarBySlug, getGrammarSlugs } from "~/app/english/grammar/api"
import { nonNullable } from "~/utils/ables"

export default async function GrammarPage() {
  const grammarSlugs = await getGrammarSlugs()

  const grammars = (await Promise.all(grammarSlugs.map(getGrammarBySlug)))
    .filter(nonNullable)
    .filter(post => !post.meta?.private)

  if (grammars.length === 0) {
    return <div>Empty</div>
  }

  return (
    <div className="space-y-3">
      {grammars.map((gramma, index) => (
        <div key={index}>{gramma.meta.title}</div>
      ))}
    </div>
  )
}
