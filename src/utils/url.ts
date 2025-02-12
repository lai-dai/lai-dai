import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { env } from "~/env";

export function absoluteUrl(path?: string | StaticImport) {
  if (typeof path !== "string" || path?.startsWith("https")) {
    return path!;
  }
  return `${env.NEXT_PUBLIC_API_ENDPOINT_URL}${path ?? ""}`;
}
