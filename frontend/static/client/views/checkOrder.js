import AbstractView from "./AbstractView.js";
import { getOrder } from "../../admin/data/order.js";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("viewing check order");
  }

  async getHtml() {
    return `
    <div class="container px-5 pt-5 pb-10 mx-auto lg:w-4/5">
    <h2 class="pb-5 uppercase text-sm">Trang chủ  > Tra cứu đơn hàng</h2>
        <div class="bg-repeat-x bg-contain bg-bottom text-center p-10 rounded shadow-lg bg-[url('https://thuthuatnhanh.com/wp-content/uploads/2022/02/Anh-nen-We-Bare-Bear-xanh-ombre.jpg')]">
            <h1 class="mb-6 text-3xl font-bold text-gray-700">Tra cứu đơn hàng</h1>
            <input type="text" name="email" placeholder="Nhập email của bạn..." class="mb-4 w-full px-3 py-2 border border-gray-300 rounded">
            <input type="text" name="phone" placeholder="Nhập số điện thoại của bạn..." class="mb-4 w-full px-3 py-2 border border-gray-300 rounded">
            <button class="getOrderByEmail w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Tra cứu</button>
            <div class="mt-6 p-20 border border-gray-300 rounded list-order">
                <div class=" flex flex-col gap-3">
                    <a data-link href="/order/id">
                        <div>
                            
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
        `;
  }
}

$(document).on('click','.getOrderByEmail',async function(){
    var orders =await getOrder()
    var email = $('input[name="email"]').val();
    var phone = $('input[name="phone"]').val();
    var listOrders = orders.filter(item=>{
        return (item.customer_email.trim() == email && item.customer_phone.trim() == phone )
    })
    if(listOrders.length == 0){
        $('.list-order').addClass('bg-white  bg-opacity-40')
        $('.list-order').html('<h2 class="mb-4 text-2xl font-bold text-black">Không tìm thấy đơn hàng nào</h2>')
    }else{
        $('.list-order').addClass('bg-white  bg-opacity-90')
        $('.list-order').html('ok')
    }
    
})

