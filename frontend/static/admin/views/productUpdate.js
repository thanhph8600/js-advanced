import AbstractView from "./AbstractView.js";
import { getProductByID, updateProduct } from "../data/product.js";
import { getCategory } from "../data/category.js";
import { uploadFile } from "../data/connectData.js";
import { router } from "../index.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Viewing Product");
  }

  async getHtml() {
    let product = await getProductByID(this.postId);
    let { id, name, cate_id, price, thumb, detail } = product;
    category(cate_id);
    return `
            <div class="d-flex gap-4 form-row pb-3">
            <div class="form-group col-md-6">
                <label for="inputPassword4">Name product</label>
                <input type="text" name="name" class="name form-control"  placeholder="Name product" value="${name}">
            </div>

        </div>
        <div class="d-flex gap-4 form-group pb-3">
            <div class="form-group col-md-6">
                <label for="inputEmail4">Category</label>
                <select name="category" class="form-select" aria-label="Default select example">
                    
                </select>
            </div>
            <div class="form-group col-md-6">
                <label for="inputEmail4">price</label>
                <input type="number" name="price"  class="form-control" placeholder="99999" value="${price}">
            </div>
        </div>
        <div class="d-flex gap-4 form-group pb-3">
            <div class="form-group col-md-12">
                <label for="inputEmail4">Detail</label>
                <textarea name="editor1" id="editor1">${detail}</textarea>
            </div>
        </div>
            <div class="mb-3 ">
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" name="formFile" type="file" id="formFile">
            </div>
            <div  class="mb-3">
                <img  id="previewImage"  style="width:300px" class=" rounded-5" src="/static/upload/${thumb}" alt="">
            </div>
            <span  class="updateProduct btn btn-primary">Update Product</span>
            <input type="hidden" name="idProduct" value="${id}">
            <input type="hidden" name="thumbOld" value="${thumb}">
        `;
  }
}


async function category(id) {
  let category = await getCategory();
  let html = category.map((x) => {
    if(x.id == id){
        return `<option value="${x.id}" selected>${x.name}</option>`;
    }else{
        return `<option value="${x.id}">${x.name}</option>`;
    }
  });
  $(".form-select").html(html.join(""));
}

$(document).ready(function () {
  $(document).on("change", "#formFile", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      var preview = document.getElementById("previewImage");
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

$(document).on("click", ".updateProduct", async function (e) {
  e.preventDefault();
  let name = $(".name").val();
  let category = document.querySelector('select[name="category"]').value;
  let price = document.querySelector('input[name="price"]').value;
  var detail = CKEDITOR.instances['editor1'].getData();
  let idProduct = $('input[name="idProduct"]').val();
  var thumb = $('input[name="thumbOld"]').val();
  var fileInput = document.querySelector("#formFile");
  if (fileInput.files[0]) {
    var upload = new FormData();
    upload.append("formFile", fileInput.files[0]);
    uploadFile(upload).then(async (res) => {
      update(idProduct, name, category, price, detail, res);
    });
  } else {
    update(idProduct, name, category, price, detail, thumb);
  }
});

async function update(idProduct, name, category, price, detail, thumb) {
  let formData = {
    name: name,
    cate_id: category,
    price: Number(price),
    detail: detail,
    thumb: thumb,
  };
  await updateProduct(idProduct, formData);
  history.pushState(null, null, "/product");
  router();
}


window.addEventListener("load", function() {
  var editor2 = document.querySelector('#editor1');
  if (editor2) {
    CKEDITOR.replace('editor1');
  }
  
});