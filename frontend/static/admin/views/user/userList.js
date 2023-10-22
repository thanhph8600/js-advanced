import AbstractView from "../AbstractView.js";
import { getUser,updateUser} from "../../data/user.js";
import $ from "jquery";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("User");
    }

    async getHtml() {
        var htmlListUser = await rederUser()
        return `
        <table class="table">
            <thead>
                <tr  class=" align-center">
                    <th class="align-middle text-center" scope="col">ảnh</th>
                    <th class="align-middle text-center" scope="col">name</th>
                    <th class="align-middle text-center" scope="col">email</th>
                    <th class="align-middle text-center" scope="col">phone</th>
                    <th class="align-middle text-center" scope="col"></th>
                    <th class="align-middle text-center" scope="col"><a type="button" data-link href="/createUser" class="btn btn-secondary">Thêm</a></th>
                </tr>
            </thead>
            <tbody id="listUser">
                ${htmlListUser}
            </tbody>
        </table>

        `;
    }
}

async function rederUser(){
    let users = await getUser();
    var html = listUser(users)
    return html.join('')
}

function listUser(users){
    var element = users.map(item=>{
        return itemUser(item)
    })

    return element
}

function itemUser(item){
    var {id,name,email,phone,thumb} = item
    var ban = ``
    var btn_ban = `
            <button type="button" idUser="${id}" class="banUser btn btn-danger">
                <i class="fa fa-ban" aria-hidden="true"></i> Ban 
            </button>`
    if(item.ban){
        ban="cursor: no-drop; background:#F0F0F4;border:red 1px solid"
        btn_ban = `
            <button type="button" idUser="${id}" class="unBanUser btn btn-warning">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i> Un ban
            </button>`
    }
    return `<tr class="idUser${id} align-center" style="${ban}">
                <td class="align-middle text-center" style="width:120px;max-height:120px; overflow: hidden;" scope="row">
                    <img  class=" rounded-5" style="width:100%;max-height:120px"  src="/static/upload/${thumb}" alt="">
                </td>
                <td class="align-middle text-center">${name}</td>
                <td class="align-middle text-center">${email}</td>
                <td class="align-middle text-center">${phone}</td>
                <td class="align-middle text-center"><a href="user/${id}" data-link type="button" class="edit btn btn-success"><i class="fa fa-wrench" aria-hidden="true"></i> Edit</a></td>
                <td class="align-middle text-center">
                    ${btn_ban}
                </td>
            </tr>`
}

$(document).on('click','.banUser',async function(){
    let id = $(this).attr('idUser')
    $(`.idUser${id}`).attr('style','cursor: no-drop; background:#F0F0F4;border:red 1px solid')
    $(this).removeClass('banUser btn btn-danger').addClass('unBanUser btn btn-warning')
    $(this).html('<i class="fa fa-unlock-alt" aria-hidden="true"></i> Un ban')
    await updateUser(id,{ban:'bi ban'})
})

$(document).on('click','.unBanUser',async function(){
    let id = $(this).attr('idUser')
    $(this).removeClass('unBanUser btn btn-warning').addClass('banUser btn btn-danger')
    $(`.idUser${id}`).attr('style','')
    $(this).html('<i class="fa fa-ban" aria-hidden="true"></i> Ban ')
    await updateUser(id,{ban:''})
})
