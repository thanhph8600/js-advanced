import { getProductByID } from "../../admin/data/product";

export async function setLocalstorage(idProduct) {
  var product = await getProductByID(idProduct);
  product = {
    quantity: 1,
    ...product,
  };
  if (!localStorage.getItem("product")) {
    var arr = [];
    arr.push(product);
    var value = JSON.stringify(arr);
    localStorage.setItem("product", value);
  } else {
    var jsonLocal = localStorage.getItem("product");
    var valueLocal = JSON.parse(jsonLocal);

    let itemExists = false;

    for (let item of valueLocal) {
      if (item.id === product.id) {
        item.quantity += product.quantity;
        itemExists = true;
        break;
      }
    }

    if (!itemExists) {
      valueLocal.push(product);
    }
    var value = JSON.stringify(valueLocal);
  }
  localStorage.setItem("product", value);
}

export async function updateLocal(idProduct,quantity) {
    var product = await getProductByID(idProduct);
    product = {
      quantity: quantity,
      ...product,
    };
    if (!localStorage.getItem("product")) {
      var arr = [];
      arr.push(product);
      var value = JSON.stringify(arr);
      localStorage.setItem("product", value);
    } else {
      var jsonLocal = localStorage.getItem("product");
      var valueLocal = JSON.parse(jsonLocal);
  
      let itemExists = false;
  
      for (let item of valueLocal) {
        if (item.id === product.id) {
          item.quantity = product.quantity;
          itemExists = true;
          break;
        }
      }
  
      if (!itemExists) {
        valueLocal.push(product);
      }
      var value = JSON.stringify(valueLocal);
    }
    localStorage.setItem("product", value);
  }

export function getLocal(){
    var jsonLocal = localStorage.getItem("product");
    var valueLocal = JSON.parse(jsonLocal);
    return valueLocal
}

export function getItemLocal(id){
    var jsonLocal = localStorage.getItem("product");
    var valueLocal = JSON.parse(jsonLocal);
    valueLocal = valueLocal.find(item=>{
        return item.id == id
    })
    return valueLocal
}