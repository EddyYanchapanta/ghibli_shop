function crearLista(listProducts) {
  const section = document.querySelector(".listProducts");
  section.innerHTML = "";
  for (const item of productos) {
    const productContainer = document.createElement("div");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const h3_des = document.createElement("h3");
    const h3_price = document.createElement("h3");
    const cartButton = document.createElement("button");

    figure.appendChild(img);
    img.src = item.imagen;

    h2.textContent = item.nombre;
    h3_des.textContent = item.descripcion;
    h3_price.textContent = item.precio;

    section.appendChild(productContainer);
    productContainer.append(figure, h2, h3_des, h3_price, cartButton);
  }
  console.log(section);
}
crearLista();

//reduce TOTAL a pagar

//boton mostrar carrito. class cart, toggle. display none tambien
