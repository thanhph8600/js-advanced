import AbstractView from "./AbstractView.js";
import { router } from "../index.js";
import { getProduct, getProductByID,getProductByIDCategory } from "../../admin/data/product.js";
import { getCategory, getCategoryByID } from "../../admin/data/category.js";
import { rederItemProduct } from "./home.js";
import { removeVietnameseTones } from "../../admin/data/connectData.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.params = params;
    this.setTitle("Viewing detail Product");
  }

  async getHtml() {
    var htmlProducts = '', parma = 'Tất cả sản phẩm'
    if(this.params.idCategory){
      htmlProducts = await rederProduct({id:this.params.idCategory})
      var category = await getCategoryByID(this.params.idCategory)
      parma = category.name
    }else if(this.params.search){
      console.log(this.params);
      htmlProducts = await rederProduct({search:String(this.params.search)})
      parma = this.params.search
    }else{
      htmlProducts = await rederProduct()
    }
    var htmlCategory = await rederCategory()
    return `
    <!-- component -->
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 pt-5 pb-10 mx-auto lg:w-4/5">
        <h2 class="pb-10 uppercase text-sm">Trang chủ  >  ${parma}</h2>
        <div class="flex gap-3">
          <div class="w-3/12 border-r border-r-[--rose-1]">
            <div class="flex flex-col gap-4">
              <h2 class="pb-2 text-2xl font-bold text-[--rose-2]">DANH MỤC SẢN PHẨM</h2>
              ${htmlCategory}
            </div>
          </div>
          <div class="w-9/12">
            <div class="grid grid-cols-4 gap-5">
              ${htmlProducts}
            </div>
          </div>
        </div>

      </div>
    </section>

        `;
  }
}

async function rederCategory(){
  var products = await getProduct()
  var categorys =await getCategory()
  var list = categorys.filter(itemCate=>{
    var item = products.find(itemPro=>{
      return itemCate.id == itemPro.cate_id
    })
    return item
  })
  var html = list.map(item=>{
    return `<a href="/list-products/idCategory=${item.id}" class=" hover:text-[--rose-1]" data-link>${item.name} <i class="fa fa-chevron-right pl-2" aria-hidden="true"></i></a>`
  })
  return html.join('')
}

async function rederProduct(value = 0){
  var products = []
  if(value == 0){
    products = await getProduct()
  }else if(value.id){
    products = await getProductByIDCategory(value.id)
  } else if(value.search){
    products = await getProduct()
    products = products.filter(item=>{
      return removeVietnameseTones(item.name).includes(value.search)
    })
  }
  
  var html = products.map(item=>{
    return rederItemProduct(item)
  })
  return html.join('')
}