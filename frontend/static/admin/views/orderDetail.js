import AbstractView from "./AbstractView.js";
import { getOrderByID, updateOrder } from "../data/order.js";
import { getOrderDetail } from "../data/orderDetail.js";
import {getProductByID } from "../data/product.js";
import { convertToVND } from "../data/connectData.js";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Order detail");
  }

  async getHtml() {
    let id = this.postId
    let order = await getOrderByID(id)
    let {id:idOrder,customer_name,customer_address,customer_phone, customer_email, status} = order
    let order_detail = await getOrder(id)
    let html = await htmlProduct(order_detail)
    let sum = sumTotal(order_detail,id)
    return `
    <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="border p-3 mb-3">
          <h3>Thông tin người mua</h3>
          <p>Tên: ${customer_name}</p>
          <p>Địa chỉ: ${customer_address}</p>
          <p>Số điện thoại: ${customer_phone}</p>
          <p>Email: ${customer_email}</p>
        </div>
        <div class="border p-3">
          <h3>Chi tiết đơn hàng</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
              </tr>
            </thead>
            <tbody>
                ${html}
              <tr>
                <td colspan="3">Tổng cộng</td>
                <td class="fw-bold"><p class="fw-bold fs-4">${convertToVND(sum)}</p></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border p-3">
          <h3 class="pb-3">Tình trạng đơn hàng</h3>
            <div id="status">
                <div class="pb-3">
                    <p>1. Đơn hàng đang chờ được xác nhận</p>
                    <button data="1" class="btn btn${(status>=1) ? "": '-outline'}-primary mb-2">Đang chờ xác nhận</button>
                </div>
                <div class="pb-3">
                    <p>2. Đơn hàng đã được gửi đi</p>
                    <button name="status" data="2"class="btn btn${(status>=2) ? "": '-outline'}-warning mb-2">Đã gửi</button>
                </div>
                <div class="pb-3">
                    <p>3. Đơn hàng đã được gửi đến tay khách hàng</p>
                    <button name="status" data="3" class="btn btn${(status>=3) ? "": '-outline'}-success mb-2">Đã nhận</button>
                </div>
                <div class="pb-3">
                    <p>4. Đơn hàng đã bị hủy</p>
                    <button name="status" data="0" class="btn btn${(status == 0) ? "": '-outline'}-dark mb-2">Đã hủy</button>
                </div>
                <input type="hidden" name="status" value="${status}">

            </div>

        </div>
      </div>
      <input type="hidden" name="idOrder" value="${idOrder}">
      <input type="hidden" name="name" value="${customer_name}">
      <input type="hidden" name="address" value="${customer_address}">
      <input type="hidden" name="phone" value="${customer_phone}">
      <input type="hidden" name="email" value="${customer_email}">
    </div>
  </div>
        `;
  }
}

async function getOrder(id){
    var orders = await getOrderDetail()
    orders = orders.filter(item => item.order_id == id)
    return orders
}

async function htmlProduct(item){
    var html = await Promise.all(item.map(async x=>{
        var product = await getProductByID(x.product_id)
        return `<tr class=" align-center">
                    <td class="align-middle"><img src="/static/upload/${product.thumb}" alt="image" width="50"></td>
                    <td class="align-middle">${product.name}</td>
                    <td class="align-middle">${x.quantity}</td>
                    <td class="align-middle">${convertToVND(x.unit_price)}</td>
                </tr>`
    }))
    return html
}

function sumTotal(items,id){
    let total = items.reduce((sum, item) => {
        if (item.order_id == id) {
            return sum + item.quantity * item.unit_price;
        } else {
            return sum;
        }
    }, 0);
    return total
}

$(document).on('click','button[name="status"]',async function(){
    let id = $('input[name="idOrder"]').val();
    let status = $(this).attr('data');
    let formData = {
        customer_name : $('input[name="name"]').val(),
        customer_address : $('input[name="address"]').val(),
        customer_phone : $('input[name="phone"]').val(),
        customer_email : $('input[name="email"]').val(),
        status: Number(status)
    }
    if($('input[name="status"]').val() == 0){
        
    }else{
        if(status > $('input[name="status"]').val() || $('input[name="status"]').val() == 1){
            
            rederStatus(status)
            updateOrder(id,formData)
        }
    }
    
    
})

function rederStatus(status){
    var html =  `
    <div class="pb-3">
        <p>1. Đơn hàng đang chờ được xác nhận</p>
        <button data="1" class="btn btn${(status>=1) ? "": '-outline'}-primary mb-2">Đang chờ xác nhận</button>
    </div>
    <div class="pb-3">
        <p>2. Đơn hàng đã được gửi đi</p>
        <button name="status" data="2"class="btn btn${(status>=2) ? "": '-outline'}-warning mb-2">Đã gửi</button>
    </div>
    <div class="pb-3">
        <p>3. Đơn hàng đã được gửi đến tay khách hàng</p>
        <button name="status" data="3" class="btn btn${(status>=3) ? "": '-outline'}-success mb-2">Đã nhận</button>
    </div>
    <div class="pb-3">
        <p>4. Đơn hàng đã bị hủy</p>
        <button name="status" data="0" class="btn btn${(status == 0) ? "": '-outline'}-dark mb-2">Đã hủy</button>
    </div>
    <input type="hidden" name="status" value="${status}">
    `;
    document.getElementById('status').innerHTML = html
}