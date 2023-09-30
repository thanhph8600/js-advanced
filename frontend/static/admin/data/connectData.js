import axios from 'axios';

//GET JSON Sever
// var url = "http://localhost:3000/";
// export async function getData(table) {
//   onLoad()
//   let response = await axios.get(url + table);
//   offLoad()
//   return response.data;
// }

// export async function getDataByID(table, id) {
//   onLoad()
//   let response = await axios.get(url + table + "/" + id);
//   offLoad()
//   return response.data;
// }

// export async function createData(table, data) {
//   onLoad()
//   let response = await axios.post(url + table, data);
//   offLoad()
//   return response.data;
// }

// export async function updateData(table, data) {
//   onLoad()
//   let response = await axios.put(url + table, data);
//   offLoad()
//   return response.data;
// }

// export async function deleteData(table, data) {
//   onLoad()
//   let response = await axios.delete(url + table + "/" + data);
//   offLoad()
//   return response.data;
// }


//---------------------------------------------------//
//GET FIREBASE
var url = "https://popo-api-5-default-rtdb.firebaseio.com/";
export async function getData(table) {
  onLoad()
  let response = await axios.get(url + table + '.json');
  response = response.data
  
  response =  Object.entries(response).map(([key,value]) =>{
    return {
      id:key,
      ...value
    }
  })
  offLoad()

  return response;
}

export async function getDataByID(table, id) {
  onLoad()
  let response = await axios.get(url + table + "/" + id + '.json');
  response = response.data
  response = {
    id: id,
    ...response
  }
  offLoad()
  return response;
}

export async function createData(table, data) {
  onLoad()
  let response = await axios.post(url + table, data + '.json');
  offLoad()
  return response.data;
}

export async function updateData(table, data) {
  onLoad()
  let response = await axios.put(url + table, data + '.json');
  offLoad()
  return response.data;
}

export async function deleteData(table, data) {
  onLoad()
  let response = await axios.delete(url + table + "/" + data + '.json');
  offLoad()
  return response.data;
}


//-------------------------------------------------//
export async function uploadFile(upload) {
  return new Promise((resolve, reject) => {
  onLoad()
    $.ajax({
      url: "/upload",
      type: "POST",
      data: upload,
      enctype: "multipart/form-data",
      contentType: false,
      processData: false,
      cache: false,
      success: function (data) {
        offLoad()
        resolve(data.nameFile);
      },
      error: function (error) {
        offLoad()
        reject(error);
      },
    });
  });
}


export function convertToVND(amount) {
  return amount
  // return amount.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

function onLoad(){
  $(document).ready(function(){
    $('.load').css('display','block')
  })
}
function offLoad(){
  $(document).ready(function(){
    $('.load').css('display','none')
  })
}


export function removeVietnameseTones(str) {
  str = str.toLowerCase();
  str = str.trim();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\s+/g, '-');
  return str;
}

