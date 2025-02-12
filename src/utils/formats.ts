export function formatDate(timestamp: string | number): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString("en-EN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
