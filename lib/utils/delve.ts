type GetIndexedField<T, K, D = undefined> = K extends keyof T
  ? T[K]
  : K extends `${number}`
    ? 'length' extends keyof T
      ? number extends T['length']
        ? number extends keyof T
          ? T[number]
          : D
        : D
      : D
    : D

type FieldWithPossiblyUndefined<T, Key, D = undefined> =
  | GetFieldType<Exclude<T, undefined>, Key, D>
  | Extract<T, undefined>

type IndexedFieldWithPossiblyUndefined<T, Key, D = undefined> =
  | GetIndexedField<Exclude<T, undefined>, Key, D>
  | Extract<T, undefined>

type GetFieldType<
  T,
  P,
  D = undefined,
> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof Exclude<T, undefined>
    ?
        | FieldWithPossiblyUndefined<Exclude<T, undefined>[Left], Right, D>
        | Extract<T, undefined>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? FieldWithPossiblyUndefined<
            IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey, D>,
            Right,
            D
          >
        : D
      : D
  : P extends keyof T
    ? T[P]
    : P extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey, D>
        : D
      : IndexedFieldWithPossiblyUndefined<T, P, D>

type Paths<T> =
  T extends Array<infer U>
    ? `${Paths<U>}`
    : T extends object
      ? {
          [K in keyof T & (string | number)]: K extends string
            ?
                | `${K}`
                | (T[K] extends Array<infer U>
                    ? `${K}[0].${Paths<U>}`
                    : `${K}.${Paths<T[K]>}`)
            : never
        }[keyof T & (string | number)]
      : never

export function delve<
  TObject extends object,
  TKey extends string,
  TDef = undefined,
>(
  obj: TObject,
  key: TKey | TKey[] | Paths<TObject>,
  def?: TDef
): string extends TKey ? any : GetFieldType<TObject, TKey, TDef>

/**
 * Gets the property value at path of object. If the resolved value is undefined the defaultValue is used
 * in its place.
 *
 * @param obj The object to query.
 * @param key The path of the property to get.
 * @param def The value returned if the resolved value is undefined.
 * @return Returns the resolved value.
 */
export function delve<TObject extends Record<string, any>, TKey extends string>(
  obj: TObject,
  key: TKey,
  def?: any
): any {
  let arr
  if (typeof key === 'string') {
    arr = key.replace(/\[|\]/g, '.').split(/\.+/g)
  } else if (Array.isArray(key)) {
    arr = key
  }
  if (!arr || !obj) return def
  return arr.reduce((o, k) => o?.[k], obj) || def
}
