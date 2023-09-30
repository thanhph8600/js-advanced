import AbstractView from "./AbstractView.js";
import { createProduct } from "../data/product.js";
import { uploadFile } from "../data/connectData.js";
import { getCategory } from "../data/category.js";
import { router } from "../index.js";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("create product");
  }

  async getHtml() {
    return `
            <div class="d-flex gap-4 form-row pb-3">
                <div class="form-group col-md-6">
                    <label for="inputPassword4">Name product</label>
                    <input type="text" name="name" class="name form-control"  placeholder="Name product">
                </div>

            </div>
            <div class="d-flex gap-4 form-group pb-3">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Category</label>
                    <select name="category" class="form-select" aria-label="Default select example">
                        ${category()}
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail4">price</label>
                    <input type="number" name="price" class="form-control" placeholder="99999">
                </div>
            </div>
            <div class="d-flex gap-4 form-group pb-3">
                <div class="form-group col-md-12">
                    <label for="inputEmail4">Detail</label>
                    <textarea name="detail" id="editor2"></textarea>
                </div>
            </div>
            <div class="mb-3 ">
                <input class="form-control" name="formFile" type="file" id="formFile">
            </div>
            <div  class="mb-3">
                <img id="previewImage" class="d-none" height="200" alt="Image preview...">
            </div>
            <span  class="createProduct btn btn-primary">Create product</span>
        `;
  }
}

async function category() {
  let category = await getCategory();
  let html = category.map((x) => {
    return `<option value="${x.id}">${x.name}</option>`;
  });
  $(".form-select").html(html.join(""));
}


$(document).ready(function () {
  $(document).on("change", "#formFile", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      var preview = document.getElementById("previewImage");
      preview.classList.remove("d-none");
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

$(document).on("click", ".createProduct", async function (e) {
  e.preventDefault();
  let name = $(".name").val();
  let category = document.querySelector('select[name="category"]').value;
  let price = document.querySelector('input[name="price"]').value;
  var detail = CKEDITOR.instances['editor2'].getData();

  var upload = new FormData();
  var fileInput = document.querySelector("#formFile");

  upload.append("formFile", fileInput.files[0]);
  uploadFile(upload).then(async (res) => {
    let formData = {
      name: name,
      cate_id:category,
      price: Number(price),
      detail: detail,
      thumb: res,
    };
    await createProduct(formData);
    history.pushState(null, null, "/product");
    router();
  });
});


window.addEventListener("load", function() {
  var editor2 = document.querySelector('#editor1');
  if (editor2) {
    CKEDITOR.replace('editor1');
  }
});