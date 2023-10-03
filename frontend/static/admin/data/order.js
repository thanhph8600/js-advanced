import {
  getData,
  createData,
  deleteData,
  getDataByID,
  updateData,
  uploadFile,
} from "./connectData.js";

const table = "orders";
export async function getOrder() {
  let result = await getData(table);
  return result;
}

export async function getOrderByID(id) {
  let result = await getDataByID(table, id);
  return result;
}

export async function createOrder(data) {
  let result = await createData(table, data);
  return result;
}




export async function updateOrder(id, data) {
  let result = await updateData(table + "/" + id, data);
  return result;
}

export function checkStatus(data) {
  var result;
  switch (data) {
    case 1:
      result = `<span class="btn text-white bg-primary">Đang chờ xác nhận </span>`;
      break;
    case 2:
      result = `<span class="btn text-white bg-warning">Đơn hàng đã được xác nhận</span>`;
      break;
    case 3:
      result = `<span class="btn text-white btn-danger">Đang gửi đến khách hàng</span>`;
      break;
    case 4:
      result = `<span class="btn text-white btn-success">Đã nhận được hàng</span>`;
      break;
    case 0:
      result = `
        <span  class="btn text-white  btn-dark">Đơn hàng đã bị hủy</span>`;
      break;
    default:
      result = `<span class="btn text-white btn-danger">Đã nhận hàng</span>`;
      break;
  }
  return result;
}
