//invoca a una API y devuelve una lista de productos, funcion async que devuelve una promesa con una lista de productos
async function fetchProducts() {
  //comunicacion con la API
  try {
    //invocacion al url del API
    const response = await fetch(
      "https://67d80b569d5e3a10152d2536.mockapi.io/api/posterProducts"
    );
    // verifica si la respuesta es un 200, OK
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const products = await response.json();
    //DEVUELVE LISTA DE OBJETOS(items)
    return products;
  } catch (error) {
    //si hay error en la comunicacion, pinta un error
    console.error("Error al obtener productos:", error);
    return [];
  }
}

async function crearLista(listProducts) {
  const section = document.querySelector(".listProducts");
  section.innerHTML = "";

  //*********llama a la funcion que invoca a la  API************
  const posterProducts = await fetchProducts();

  //recorre la lista de objetos(items)
  posterProducts.forEach((item) => {
    const productContainer = document.createElement("article");

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    figure.appendChild(img);
    img.src = item.image;

    const h2 = document.createElement("h2");
    const h3_des = document.createElement("h3");
    const h3_price = document.createElement("h3");
    h3_price.classList.add("price");
    h2.textContent = item.name;
    h3_des.textContent = item.description;
    h3_price.textContent = item.price + "€";

    const cartButton = document.createElement("button");
    cartButton.textContent = "Add to Cart";
    cartButton.addEventListener("click", () => addCart(item));

    section.appendChild(productContainer);
    productContainer.append(figure, h2, h3_des, h3_price, cartButton);
  });
}

//mostrar cart si está oculto, al añadir un elemento
function seeCart() {
  document
    .getElementsByClassName("shoppingCart")[0]
    .classList.remove("iconCart");
  document.getElementById("img_active").style.display = "none";
}

function addCart(item) {
  // Verificar si el producto ya existe en el carrito
  const verifyProduct = cart.find((product) => product.id === item.id);

  if (verifyProduct) {
    // Si ya existe, incrementa su cantidad
    verifyProduct.quantity += 1;
    seeCart();
  } else {
    // Si no existe, agrega un item con una cantidad inicial de 1
    //crea propiedad quantity en item e inicializa con valor 1
    const itemTemp = { ...item, quantity: 1 };
    cart.push(itemTemp);
    seeCart();
  }

  renderCart(); // Añadir ítem a la lista
}

function renderCart() {
  const cartSection = document.querySelector(".cart");
  cartSection.innerHTML = ""; // Limpiar carrito.

  const cartList = document.createElement("ul");

  cart.forEach((item, id) => {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${item.name} - ${item.price}€ x ${item.quantity}`;

    // Botón para incrementar la cantidad
    const buttonPlus = document.createElement("button");
    buttonPlus.textContent = " + ";
    buttonPlus.addEventListener("click", () => {
      item.quantity++;
      renderCart();
    });
    // Botón para reducir la cantidad
    const buttonMinus = document.createElement("button");
    /* TODO: revisar css, sino eliminar condicional */
    //Verifica si queda mas de 1 elemento en el carrito. Si es mayor que 1, crea boton.
    if (item.quantity > 1) {
      buttonMinus.textContent = " - ";
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
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalDisplay = document.createElement("h3");
  totalDisplay.textContent = `Total: ${total} €`;
  cartSection.appendChild(totalDisplay);
}

const emptyCart = (cart) => {
  Swal.fire({
    title: "Empty your shopping cart?",
    text: "All items will be removed.",
    /* icon: "warning" */
    imageUrl: "./assets/icons/cancel-icon.png",
    imageWidth: 300,
    imageHeight: 350,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Cart is empty",
        text: "All items have been removed",
        imageUrl: "./assets/icons/cancel-confirm-icon.png",
        imageWidth: 100,
        imageHeight: 150,
      });
      voidCart(cart);
    }
  });
};

//vaciar el carrito de la compra
const voidCart = (cart) => {
  const cartItems = document.querySelector(".cart");
  cartItems.innerHTML = "";
  //vaciar el array del carrito
  cart.splice(0, cart.length);
  document.getElementById("img_active").style.display = "";
};

const buyCart = (cart) => {
  if (cart.length == 0) {
    Swal.fire({
      title: "Cart is empty!!",
      text: "Please, add your product to continue shopping",
      imageUrl: "./assets/icons/ghibli.png",
      imageWidth: 150,
      imageHeight: 150,
      /* icon: "error", */
      confirmButtonColor: "#ff6f61",
    });
  } else {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    Swal.fire({
      /* icon: "success", */
      imageUrl: "./assets/icons/icon-cart.png",
      imageWidth: 350,
      imageHeight: 350,
      text: "Thanks for shopping!!!",
      title: `Total amount: ${total}€`,
      confirmButtonColor: "#ff6f61",
    });
    voidCart(cart);
  }
};

const toggleCart = () => {
  const cartButton = document.querySelector(".shoppingCart");
  cartButton.classList.toggle("iconCart");
};
