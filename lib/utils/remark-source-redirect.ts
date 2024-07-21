import path from 'path'
import { visit } from 'unist-util-visit'

/**
 * Analyzes local markdown/MDX images & videos and rewrites their `src`.
 * Supports both markdown-style images, MDX <Image /> components, and `source`
 * elements. Can be easily adapted to support other sources too.
 * @param {string} options.root - The root path when reading the image file.
 */
export const remarkSourceRedirect = (options: any) => {
  return (tree: any, file: any) => {
    // You need to grab a reference of your post's slug.
    // I'm using Contentlayer (https://www.contentlayer.dev/), which makes it
    // available under `file.data`.But if you're using something different, you
    // should be able to access it under `file.path`, or pass it as a parameter
    // the the plugin `options`.

    const slug = options?.slug
      ? options.slug
      : file.history?.length > 0
        ? path.dirname(file.history[0].slice(file.history[0].indexOf('blog')))
        : ''
    // // This matches all images that use the markdown standard format ![label](path).
    visit(tree, 'paragraph', (node) => {
      const image = node.children.find((child: any) => child.type === 'image')
      if (image && slug) {
        image.url = `/${slug}/${image.url.replace(/(\/|.\/)/g, '')}`
      }
    })
    // // This matches all MDX' <Image /> components & source elements that I'm
    // // using within a custom <Video /> component.
    // // Feel free to update it if you're using a different component name.
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if ((node.name === 'Image' || node.name === 'source') && slug) {
        const srcAttr = node.attributes.find(
          (attribute: any) => attribute.name === 'src'
        )
        srcAttr.value = `/${slug}/${srcAttr.value.replace(/(\/|.\/)/g, '')}`
      }
    })
  }
}
