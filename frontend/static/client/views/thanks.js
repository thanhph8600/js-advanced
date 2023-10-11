import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Viewing Thank you");
  }

  async getHtml() {

    return `
    <div class=" relative">
        <p class=" absolute left-1/2 w-full text-center -translate-x-1/2 py-8 font-bold text-4xl text-white animate-charcter  ">Cảm ơn bạn đã mua sản phẩm của chúng tôi</p> 
        <img src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2019/02/bmd-4584.png">
    </div>
        `;
  }
}
