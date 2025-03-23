function crearLista(listProducts) {
  const section = document.querySelector(".listProducts");

  section.innerHTML = "";
  for (const item of productos) {
    const productContainer = document.createElement("article");

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    figure.appendChild(img);
    img.src = item.imagen;

    const h2 = document.createElement("h2");
    const h3_des = document.createElement("h3");
    const h3_price = document.createElement("h3");
    h2.textContent = item.nombre;
    h3_des.textContent = item.descripcion;
    h3_price.textContent = item.precio + "€";

    const cartButton = document.createElement("button");
    cartButton.textContent = "Add to Cart";
    cartButton.addEventListener("click", () => addCart(item));

    section.appendChild(productContainer);
    productContainer.append(figure, h2, h3_des, h3_price, cartButton);
  }
}

function addCart(item) {
  // Verificar si el producto ya existe en el carrito
  const verifyProduct = cart.find((product) => product.id === item.id);

  if (verifyProduct) {
    // Si ya existe, incrementa su cantidad
    verifyProduct.quantity += 1;
  } else {
    // Si no existe, agrega un item con una cantidad inicial de 1
    //crea propiedad quantity en item e inicializa con valor 1
    const itemTemp = { ...item, quantity: 1 };
    cart.push(itemTemp);
  }
  renderCart(); // Añadir ítem a la lista
}
console.log(addCart);

function renderCart() {
  const cartSection = document.querySelector(".cart");
  cartSection.innerHTML = ""; // Limpiar carrito.

  const cartList = document.createElement("ul");

  cart.forEach((item, id) => {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${item.nombre} - ${item.precio}€ x ${item.quantity}`;

    // Botón para incrementar la cantidad
    const buttonPlus = document.createElement("button");
    buttonPlus.textContent = "+";
    buttonPlus.addEventListener("click", () => {
      item.quantity++;
      renderCart();
    });
    // Botón para reducir la cantidad
    const buttonMinus = document.createElement("button");
    /* TODO: revisar css, sino eliminar condicional */
    //Verifica si queda mas de 1 elemento en el carrito. Si es mayor que 1, crea boton.
    if (item.quantity > 1) {
      buttonMinus.textContent = "-";
      buttonMinus.addEventListener("click", () => {
        item.quantity--;
        renderCart();
      });
    }

    // Botón para eliminar del carrito
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      cart.splice(id, 1); // Eliminar del carrito
      renderCart();
    });

    cartItem.append(buttonPlus, buttonMinus, removeButton); // Añadir botones+,-,remove
    cartList.appendChild(cartItem);
  });

  cartSection.appendChild(cartList);

  // Calcular el total considerando la cantidad
  const total = cart.reduce(
    (sum, item) => sum + item.precio * (item.quantity || 1),
    0
  );

  const totalDisplay = document.createElement("h3");
  totalDisplay.textContent = `Total: ${total}€`;
  cartSection.appendChild(totalDisplay);
}

const emptyCart = (cart) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("¡Eliminado!", "El registro ha sido eliminado.", "success");
      voidCart(cart);
    }
  });
};

const voidCart = (cart) => {
  const cartItems = document.querySelector(".cart");
  cartItems.innerHTML = "";
  //vaciar el array del carrito
  cart.splice(0, cart.length);
};

const buyCart = (cart) => {};
