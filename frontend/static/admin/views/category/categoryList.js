import AbstractView from "../AbstractView.js";
import {getCategory, deleteCategory} from "../../data/category.js";
import $ from "jquery";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("category");
    }

    async getHtml() {
        var htmlListCategory = await rederCategory();
        return `
        <table class="table">
            <thead>
                <tr class="align-center">
                    <th class="align-middle " scope="col">name</th>
                    <th class="align-middle text-center" scope="col"></th>
                    <th class="align-middle text-center" scope="col"><a type="button" data-link href="/createCategory" class="btn btn-success ">Thêm</a></th>
                </tr>
            </thead>
            <tbody id="listCategory">
                ${htmlListCategory}
            </tbody>
        </table>

        `;
    }
}

async function rederCategory(){
  $('.loadAdmin').css('display','block')
    let categorys = await getCategory()
    var html = listCategory(categorys)
  $('.loadAdmin').css('display','none')
    return html
}

function listCategory(item){
    var element = item.map(item=>{
        return itemCategory(item)
    })
    return element.join('')
}

function itemCategory(item){
    var {id,name} = item
    return `<tr class="idCategory${id} align-center">

                <td class="align-middle">${name}</td>
                <td class="align-middle text-center"><a href="category/${id}" data-link type="button" class="edit btn btn-warning">Edit</a></td>
                <td class="align-middle text-center"><button type="button" idCategory="${id}" class="delete btn btn-danger">Delete</button></td>
            </tr>`
}

$(document).on('click','.delete', function(){
    let id = $(this).attr('idCategory')
    $(`.idCategory${id}`).remove()
    deleteCategory(id)
})