export function setStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  for (const s in styles) {
    // @ts-ignore
    element.style[s] = styles[s]
  }
}
