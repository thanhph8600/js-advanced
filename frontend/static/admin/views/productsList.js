import AbstractView from "./AbstractView.js";
import { getProduct, deleteProduct } from "../data/product.js";
import { convertToVND } from "../data/connectData.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Product");
    }

    async getHtml() {
        return `
        <table class="table">
            <thead>
                <tr class=" align-center">
                    <th class="align-middle text-center" scope="col">ảnh</th>
                    <th class="align-middle text-center" scope="col">name</th>
                    <th class="align-middle text-center" scope="col">Giá</th>
                    <th class="align-middle text-center" scope="col"></th>
                    <th class="align-middle text-centerscope="col"><a type="button" href="/createProduct" class="btn btn-secondary">Thêm</a></th>
                </tr>
            </thead>
            <tbody id="listProduct">
                ${rederProduct()}
                <tr>
                    <th colspan="6" class="py-5 d-flex justify-content-between"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></th>
                </tr>
            </tbody>
        </table>

        `;
    }
}

async function rederProduct(){
    let products = await getProduct();
    listProduct(products)
}

function listProduct(products){
    var element = products.map(item=>{
        return itemProduct(item)
    })

    $(document).ready(function() {
        document.getElementById('listProduct').innerHTML = element.join('')
    })

}

function itemProduct(item){
    var {id,name,price,thumb} = item
    return `<tr class="idProduct${id} align-center">
                <td class="align-middle text-center" style="width:120px;height:120px" scope="row">
                    <img  class="img-fluid rounded-5" src="/static/upload/${thumb}" alt="">
                </td>
                <td class="align-middle text-center">${name}</td>
                <td class="align-middle text-center">${convertToVND(price)}</td>
                <td class="align-middle text-center"><a href="product/${id}"  type="button" class="edit btn btn-success">Edit</a></td>
                <td class="align-middle text-center"><button type="button" idProduct="${id}" class="delete btn btn-danger">Delete</button></td>
            </tr>`
}

$(document).on('click','.delete', function(){
    let id = $(this).attr('idProduct')
    $(`.idProduct${id}`).remove()
    deleteProduct(id)
})
