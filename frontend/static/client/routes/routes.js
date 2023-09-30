import home from "../views/home.js";
import detailProduct from "../views/detailProduct.js";
import listProducts from "../views/listProducts.js";
import cart from "../views/cart.js";
const routes = [
    { path: "/", view: home },
    { path: "/detail-product/:id", view: detailProduct },
    { path: "/list-products", view: listProducts },
    { path: "/list-products/idCategory=:idCategory", view: listProducts },
    { path: "/list-products/search=:search", view: listProducts },
    { path: "/cart", view: cart },


];

export default routes