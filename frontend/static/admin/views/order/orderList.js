import AbstractView from "../AbstractView.js";
import { getOrder, checkStatus } from "../../data/order.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Order");
  }

  async getHtml() {
    var htmlListOrder = await rederOrder()
    return `
        <table class="table">
            <thead  class=" align-center">
                <tr>
                    <th class="align-middle text-center" scope="col">Name</th>
                    <th class="align-middle text-center" scope="col">Email</th>
                    <th class="align-middle text-center" scope="col">Created_date</th>
                    <th class="align-middle text-center" scope="col">Status</th>
                    <th class="align-middle text-center" scope="col"></th>
                </tr>
            </thead>
            <tbody id="listOrder">
                ${htmlListOrder}
            </tbody>
        </table>

        `;
  }
}

async function rederOrder() {
  let orders = await getOrder();
  var html =  listOrder(orders);
  return html
}

function listOrder(orders) {
  var element = orders.map((item) => {
    return itemOrder(item);
  });
  return element.join('')
}

function itemOrder(item) {
  var { id, customer_name, customer_email, created_date, status } = item;
  return `<tr class="idOrder${id} align-center">

                <td class="align-middle text-center">${customer_name}</td>
                <td class="align-middle text-center">${customer_email}</td>
                <td class="align-middle text-center">${created_date}</td>
                <td class="align-middle text-center">${checkStatus(status)}</td>
                <td class="align-middle text-center">
                    <a href="/order/${id}" data-link type="button" class=" btn btn-success">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                        Detail
                    </a>
                </td>
                
            </tr>`;
}

