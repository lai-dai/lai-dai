/**
 * Part of this code is taken from https://github.com/developit/dlv#readme
 */

type GetIndexedField<O, K, D = undefined> = K extends keyof O
  ? O[K]
  : K extends `${number}`
    ? "length" extends keyof O
      ? number extends O["length"]
        ? number extends keyof O
          ? O[number]
          : D
        : D
      : D
    : D

type FieldWithPossiblyUndefined<O, K, D = undefined> =
  | GetFieldType<Exclude<O, undefined>, K, D>
  | Extract<O, undefined>

type IndexedFieldWithPossiblyUndefined<O, K, D = undefined> =
  | GetIndexedField<Exclude<O, undefined>, K, D>
  | Extract<O, undefined>

type GetFieldType<
  O,
  K,
  D = undefined,
> = K extends `${infer Left}.${infer Right}`
  ? Left extends keyof Exclude<O, undefined>
    ?
        | FieldWithPossiblyUndefined<Exclude<O, undefined>[Left], Right, D>
        | Extract<O, undefined>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof O
        ? FieldWithPossiblyUndefined<
            IndexedFieldWithPossiblyUndefined<O[FieldKey], IndexKey, D>,
            Right,
            D
          >
        : D
      : D
  : K extends keyof O
    ? O[K]
    : K extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof O
        ? IndexedFieldWithPossiblyUndefined<O[FieldKey], IndexKey, D>
        : D
      : IndexedFieldWithPossiblyUndefined<O, K, D>

type Paths<O> =
  O extends Array<infer U>
    ? `${Paths<U>}`
    : O extends object
      ? {
          [K in keyof O & (string | number)]: K extends string
            ?
                | `${K}`
                | (O[K] extends Array<infer U>
                    ? U extends object
                      ? `${K}[0].${Paths<U>}`
                      : `${K}[0]`
                    : `${K}.${Paths<O[K]>}`)
            : never
        }[keyof O & (string | number)]
      : never

export function delve<O extends object, K extends string, D = undefined>(
  obj: O,
  key: K | Paths<O>,
  def?: D,
): GetFieldType<O, K, D>

/**
 * Gets the property value at path of object. If the resolved value is undefined the defaultValue is used
 * in its place.
 *
 * @param obj The object to query.
 * @param key The path of the property to get.
 * @param def The value returned if the resolved value is undefined.
 * @return Returns the resolved value.
 */
export function delve<O extends Record<string, unknown>, K extends string>(
  obj: O,
  key: K,
  def?: unknown,
): unknown {
  const strArr = key?.match(/\w+|\d+/gi)

  return strArr?.reduce((o, k) => o?.[k] as O, obj) ?? def
}
