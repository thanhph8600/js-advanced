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
      result = `<span class="btn text-white bg-warning">Đang được vận chuyển</span>`;
      break;
    case 3:
      result = `<span class="btn text-white btn-danger">Đã nhận hàng</span>`;
      break;
    case 0:
      result = `
        <span  class="btn text-white  btn-dark">Đơn hàng đã bị hủy</span>`;
      break;
    default:
      break;
  }
  return result;
}
