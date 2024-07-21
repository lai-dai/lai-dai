export function slugify(str?: string, defaultValue = '') {
  if (!str) return defaultValue
  // Chuyển hết sang chữ thường
  let value = str.toLowerCase()
  // xóa dấu
  value = value
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu sau khi tách tổ hợp
  // Thay ký tự đĐ
  value = value.replace(/[đĐ]/g, 'd')
  // Xóa ký tự đặc biệt
  value = value.replace(/([^0-9a-z-\s])/g, '')
  // Xóa khoảng trắng thay bằng ký tự -
  value = value.replace(/(\s+)/g, '-')
  // Xóa ký tự - liên tiếp
  value = value.replace(/-+/g, '-')
  // xóa phần dư - ở đầu & cuối
  value = value.replace(/^-+|-+$/g, '')
  // return
  return value || defaultValue
}
