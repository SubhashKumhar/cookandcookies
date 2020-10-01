// import Config from '../config';
let API_BASE_URL = window.location.host.includes('localhost') ? 'http://localhost:5001' : ''
export const config = {
  productList:`${API_BASE_URL}/product-list`,
  productAdd:`${API_BASE_URL}/product-add`,
  productDelete:`${API_BASE_URL}/product-delete`,
  productUpdate:`${API_BASE_URL}/product-update`,
  productDetail:`${API_BASE_URL}/product-detail`,

  bannerList:`${API_BASE_URL}/banner-list`,
  bannerAdd:`${API_BASE_URL}/banner-add`,
  bannerDelete:`${API_BASE_URL}/banner-delete`,
  bannerUpdate:`${API_BASE_URL}/banner-update`,

  categoryList:`${API_BASE_URL}/category-list`,
  categoryAdd:`${API_BASE_URL}/category-add`,
  categoryDelete:`${API_BASE_URL}/category-delete`,
  categoryUpdate:`${API_BASE_URL}/category-update`,

  orderPost:`${API_BASE_URL}/create-order`,
  orderList:`${API_BASE_URL}/order-list`,
}