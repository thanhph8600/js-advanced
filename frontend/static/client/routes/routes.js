import home from "../views/home.js";
import detailProduct from "../views/detailProduct.js";
import listProducts from "../views/listProducts.js";
import cart from "../views/cart.js";
import checkOut from "../views/checkOut.js";
import thanks from "../views/thanks.js";
import checkOrder from "../views/checkOrder.js";
const routes = [
    { path: "/", view: home },
    { path: "/detail-product/:id", view: detailProduct },
    { path: "/list-products", view: listProducts },
    { path: "/list-products/idCategory=:idCategory", view: listProducts },
    { path: "/list-products/search=:search", view: listProducts },
    { path: "/cart", view: cart },
    { path: "/check-out", view: checkOut },
    { path: "/thanks", view: thanks },
    { path: "/check-order", view: checkOrder },


];

export default routes