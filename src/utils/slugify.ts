export function slugify(str: string, space = "-") {
  return str
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, "") // xóa các ký tự dấu sau khi tách tổ hợp
    .replace(/[đĐ]/g, "d")
    // .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/[^\w\-\s]+/g, "") // Remove all non-word characters except for -
    .replace(/\s+/g, space) // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/\-\-+/g, space) // Replace multiple - with single -
}
