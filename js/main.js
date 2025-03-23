const cart = [];

crearLista();

const emptyButton = document.querySelector(".emptyButton");
emptyButton.addEventListener("click", () => emptyCart(cart));

const buytButton = document.querySelector(".buyButton");
buytButton.addEventListener("click", () => buyCart(cart));

//reduce TOTAL a pagar

//boton mostrar carrito. class cart, toggle. display none tambien
