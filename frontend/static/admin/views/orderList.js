import AbstractView from "./AbstractView.js";
import { getOrder, checkStatus } from "../data/order.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Order");
  }

  async getHtml() {
    return `
        <table class="table">
            <thead  class=" align-center">
                <tr>
                    <th class="align-middle text-center" scope="col">Name</th>
                    <th class="align-middle text-center" scope="col">Email</th>
                    <th class="align-middle text-center" scope="col">Phone</th>
                    <th class="align-middle text-center" scope="col">Status</th>
                    <th class="align-middle text-center" scope="col"></th>
                </tr>
            </thead>
            <tbody id="listOrder">
                ${rederOrder()}
                <tr>
                    <th colspan="6" class="py-5 d-flex justify-content-between"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></th>
                </tr>
            </tbody>
        </table>

        `;
  }
}

async function rederOrder() {
  let orders = await getOrder();
  listOrder(orders);
}

function listOrder(orders) {
  var element = orders.map((item) => {
    return itemOrder(item);
  });

  $(document).ready(function () {
    document.getElementById("listOrder").innerHTML = element.join("");
  });
}

function itemOrder(item) {
  var { id, customer_name, customer_address, customer_phone, status } = item;
  return `<tr class="idOrder${id} align-center">

                <td class="align-middle text-center">${customer_name}</td>
                <td class="align-middle text-center">${customer_address}</td>
                <td class="align-middle text-center">${customer_phone}</td>
                <td class="align-middle text-center">${checkStatus(status)}</td>
                <td class="align-middle text-center">
                    <a href="order/${id}" data-link type="button" class=" btn btn-success">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                        Detail
                    </a>
                </td>
                
            </tr>`;
}

