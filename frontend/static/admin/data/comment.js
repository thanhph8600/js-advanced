import {
    getData,
    createData,
    deleteData,
    getDataByID,
    updateData,
    uploadFile
  } from "./connectData.js";
  
  const table = "comments";
  export async function getComments() {
    let result = await getData(table);
    return result;
  }
  
  export async function getCommentByID(id) {
    let result = await getDataByID(table, id);
    return result;
  }
  
  export async function createComment(data) {
    let result = await createData(table, data);
    return result;
  }
  
  export async function updateComment(id, data) {
    let result = await updateData(table + "/" + id, data);
    return result;
  }
  
  export async function deleteComment(data) {
    let result = await deleteData(table, data);
    return result;
  }
  
  
  