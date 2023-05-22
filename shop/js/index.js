const products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

const orders = localStorage.getItem("orders")
  ? JSON.parse(localStorage.getItem("orders"))
  : [];

const container = document.getElementById("container");

for (let i = 0; i < products.length; i++) {
  const product = products[i];

  const div1 = document.createElement("div");
  div1.classList = "col mb-5";
  container.appendChild(div1);

  const div2 = document.createElement("div");
  div2.classList = "card h-100";
  div1.appendChild(div2);

  if (product.sale) {
    const div3 = document.createElement("div");
    div3.classList = "badge bg-dark text-white position-absolute";
    div3.setAttribute("style", "top: 0.5rem; right: 0.5rem");
    div3.textContent = "Sale";
    div2.appendChild(div3);
  }

  const img = document.createElement("img");
  img.classList = "card-img-top";
  img.src = product.src;
  div2.appendChild(img);

  const div4 = document.createElement("div");
  div4.classList = "card-body p-4";
  div2.appendChild(div4);

  const div5 = document.createElement("div");
  div5.classList = "text-center";
  div4.appendChild(div5);

  const h5 = document.createElement("h5");
  h5.classList = "fw-bolder";
  h5.textContent = product.name;
  div5.appendChild(h5);

  const div6 = document.createElement("div");
  div6.classList = "d-flex justify-content-center small text-warning mb-2";
  div5.appendChild(div6);

  for (let j = 0; j < product.star; j++) {
    const div7 = document.createElement("div");
    div7.classList = "bi-star-fill";
    div6.appendChild(div7);
  }

  if (product.priceOld != "") {
    const span = document.createElement("span");
    span.classList = "text-muted text-decoration-line-through";
    convert(product.priceOld, span);
    div5.appendChild(span);
  }

  const span2 = document.createElement("div");
  span2.classList = "text-center";
  function convert(p, s) {
    if (p >= 1000000) {
      s.textContent = `${String(p).slice(-9, -6)},${String(p).slice(
        -6,
        -3
      )},000 VND`;
    } else {
      s.textContent = `${p / 1000},000 VND`;
    }
  }
  convert(product.price, span2);
  div5.appendChild(span2);

  const div8 = document.createElement("div");
  div8.classList = "card-footer p-4 pt-0 border-top-0 bg-transparent";
  div2.appendChild(div8);

  const div9 = document.createElement("div");
  div9.classList = "text-center";
  div8.appendChild(div9);

  const a = document.createElement("a");
  a.classList = "btn btn-outline-dark mt-auto";
  a.textContent = "Thêm vào giỏ";
  div9.appendChild(a);
  const cartNumber = document.getElementById("cartNumber");
  let x = 0;
  if (orders.length > 0) {
    if (!orders[0].quantity) {
      cartNumber.textContent = orders.length;
    } else {
      for (let i = 0; i < orders.length; i++) {
        x += orders[i].quantity;
      }
      cartNumber.textContent = x;
    }
  } else {
    cartNumber.textContent = 0;
  }

  a.onclick = function () {
    orders.push(product);
    cartNumber.textContent = parseInt(cartNumber.textContent) + 1;
    localStorage.setItem("orders", JSON.stringify(orders));
  };
}
