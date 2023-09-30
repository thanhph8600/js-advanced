import Dashboard from "../views/Dashboard.js";

import userList from "../views/userList.js";
import userView from "../views/userUpdate.js";
import createUser from "../views/userAdd.js";

import categoryList from "../views/category/categoryList.js";
import categoryAdd from "../views/category/categoryAdd.js";
import categoryUpdate from "../views/category/categoryUpdate.js";

import productsList from "../views/productsList.js";
import productAdd from "../views/productAdd.js";
import productUpdate from "../views/productUpdate.js";

import orderList from "../views/orderList.js";
import orderDetail from "../views/orderDetail.js";
const routes = [
    { path: "/", view: Dashboard },
    { path: "/user", view: userList },
    { path: "/user/:id", view: userView },
    { path: "/createUser", view: createUser },
    { path: "/category", view: categoryList },
    { path: "/createCategory", view: categoryAdd },
    { path: "/category/:id", view: categoryUpdate },
    { path: "/product", view: productsList },
    { path: "/createProduct", view: productAdd },
    { path: "/product/:id", view: productUpdate },
    { path: "/order", view: orderList },
    { path: "/order/:id", view: orderDetail },


];

export default routes