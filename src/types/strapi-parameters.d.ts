export type Operator =
  | "$eq" /** @description Equal */
  | "$eqi" /** @description Equal (case-insensitive) */
  | "$ne" /** @description Not equal */
  | "$nei" /** @description Not equal (case-insensitive) */
  | "$lt" /** @description Less than */
  | "$lte" /** @description Less than or equal to */
  | "$gt" /** @description Greater than */
  | "$gte" /** @description Greater than or equal to */
  | "$in" /** @description Included in an array */
  | "$notIn" /** @description Not included in an array */
  | "$contains" /** @description Contains */
  | "$notContains" /** @description Does not contain */
  | "$containsi" /** @description Contains (case-insensitive) */
  | "$notContainsi" /** @description Does not contain (case-insensitive) */
  | "$null" /** @description Is null */
  | "$notNull" /** @description Is not null */
  | "$between" /** @description Is between */
  | "$startsWith" /** @description Starts with */
  | "$startsWithi" /** @description Starts with (case-insensitive) */
  | "$endsWith" /** @description Ends with */
  | "$endsWithi" /** @description Ends with (case-insensitive) */
  | "$or" /** @description Joins the filters in an "or" expression */
  | "$and" /** @description Joins the filters in an "and" expression */
  | "$not" /** @description Joins the filters in an "not" expression */

type Locale = "vi" | "en"

type Status = "draft" | "published"

type Sort<T extends Record<string, unknown>> =
  | keyof T
  | `${keyof T}:asc`
  | `${keyof T}:desc`

type Filters<O extends Record<string, unknown>> = O extends object
  ? {
      [K in keyof O]: Filters<O[K]>
    }
  : Record<Operator, unknown>

export type StrapiQuery<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  populate?: string | Record<keyof T, Parameters<T>>
  fields?: (keyof T)[]
  filters?: Partial<Filters<T>> | Partial<Record<Operator, unknown>>
  locale?: Locale
  status?: Status
  sort?: Sort<T> | Sort<T>[]
  pagination?: {
    /** @description Return page/pageSize (default: true) */
    withCount?: boolean
    /** @description Page number (default: 0) */
    page?: number
    /** @description Page size (default: 25) */
    pageSize?: number
    /** @description Offset value (default: 0) */
    start?: number
    /** @description Number of entities to return (default: 25) */
    limit?: number
  }
}
