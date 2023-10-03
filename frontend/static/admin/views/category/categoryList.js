import AbstractView from "../AbstractView.js";
import {getCategory, deleteCategory} from "../../data/category.js";
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
                    <th class="align-middle text-center" scope="col">name</th>
                    <th class="align-middle text-center" scope="col"></th>
                    <th class="align-middle text-center" scope="col"><a type="button" data-link href="/createCategory" class="btn btn-secondary">Thêm</a></th>
                </tr>
            </thead>
            <tbody id="listCategory">
                ${htmlListCategory}
                <tr>
                    <th colspan="6" class="py-5 d-flex justify-content-between"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></th>
                </tr>
            </tbody>
        </table>

        `;
    }
}

async function rederCategory(){
    let categorys = await getCategory()
    var html = listCategory(categorys)
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

                <td class="align-middle text-center">${name}</td>
                <td class="align-middle text-center"><a href="category/${id}" data-link type="button" class="edit btn btn-success">Edit</a></td>
                <td class="align-middle text-center"><button type="button" idCategory="${id}" class="delete btn btn-danger">Delete</button></td>
            </tr>`
}

$(document).on('click','.delete', function(){
    let id = $(this).attr('idCategory')
    $(`.idCategory${id}`).remove()
    deleteCategory(id)
})