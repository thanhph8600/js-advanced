import AbstractView from "../AbstractView.js";
import { getCategoryByID ,updateCategory} from "../../data/category.js";
import { router } from "../../index.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Viewing Category");
  }

  async getHtml() {
    let category = await getCategoryByID(this.postId);
    let { id, name } = category;
    return `
            <div class="d-flex gap-4 form-row">
                <div class="form-group col-md-8">
                    <label for="inputPassword4"> name category</label>
                    <input type="text" name="name" class="name form-control"  placeholder="name category" value="${name}">
                </div>
            </div>
            <div class="pt-4">
                <span  class="updateCategory btn btn-primary">Update Category</span>
            </div>
            <input type="hidden" name="idCategory" value="${id}">
        `;
  }
}

$(document).on("click", ".updateCategory", async function (e) {
  e.preventDefault();
  let name = $(".name").val();
  let idCategory = $('input[name="idCategory"]').val();
  let formData = {
    name: name,
  };
  await updateCategory(idCategory, formData);
  history.pushState(null, null, "/category");
  router();
});


