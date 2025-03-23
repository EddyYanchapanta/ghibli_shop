const cart = [];

crearLista();

const cartButton = document.querySelector(".cart-icon");
cartButton.addEventListener("click", () => toggleCart());

const emptyButton = document.querySelector(".emptyButton");
emptyButton.addEventListener("click", () => emptyCart(cart));

const buytButton = document.querySelector(".buyButton");
buytButton.addEventListener("click", () => buyCart(cart));

//boton mostrar carrito. class cart, toggle. display none tambien
