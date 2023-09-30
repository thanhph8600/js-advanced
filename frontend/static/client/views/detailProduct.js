import AbstractView from "./AbstractView.js";
import { router } from "../index.js";
import { getProduct, getProductByID,getProductByIDCategory } from "../../admin/data/product.js";
import { rederRowProduct } from "./home.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Viewing detail Product");
  }

  async getHtml() {
    var product = await getProductByID(this.postId)
    var similar = await rederSimilar(product.cate_id)
    return `
    <!-- component -->
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-5 mx-auto lg:w-4/5">
        <h2 class="pb-10">Trang chủ > Chi tiết sản phẩm ${product.name}</h2>
        <div class=" mx-auto flex flex-wrap">
            <div class="w-1/2 m-auto">
            <img alt="ecommerce" class="lg:w-4/5 m-auto w-full object-cover object-center rounded border border-gray-200" src="/static/upload/${product.thumb}">
            </div>
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">${product.name}</h1>
            <div class="flex mb-4">
              <span class="flex items-center">
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span class="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a class="text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a class="ml-2 text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a class="ml-2 text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <div class="flex flex-col gap-3">
              <p class="title-font font-medium text-2xl text-red-600">$58.00</p>
              <button data="${product.id}" class="addCart text-white bg-[--rose-2] border-0 py-2 px-6 text-center focus:outline-none hover:bg-[--rose-1] rounded">Thêm vào giỏ hàng</button>
              <button class="addCart text-white bg-[--rose-2] border-0 py-2 px-10 focus:outline-none hover:bg-[--rose-1] rounded">Mua ngay</button>
            </div>

            <div class="flex gap-3 py-4">
                <div class=" flex flex-col gap-3">
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> 100% bông trắng tinh khiết</p>
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> Bảo hành đường chỉ trọn đời</p>
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> Miễn phí Gói quà</p>
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> Miễn phí Nén chân không gấu</p>
                </div>
                <div class=" flex flex-col gap-3">
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> 100% ảnh chụp tại shop</p>
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> Bảo hành Bông gấu 6 tháng</p>
                    <p><i class="fa fa-check pr-2" aria-hidden="true"></i> Miễn phí Tặng thiệp</p>
                </div>
            </div>
          </div>
        </div>
        <div class=" py-5">
            <h2 class=" pb-2 uppercase text-xl border-b border-b-[--blue]">Thông tin sản phẩm</h2>
            <p >${product.detail}</p>
        </div>
      </div>
    </section>
    <div class="container w-4/5 m-auto">
    ${similar}
    </div>
        `;
  }
}

async function rederSimilar(id){
    var products = await getProductByIDCategory(id)
    var html = await rederRowProduct(products)
    return html
}
