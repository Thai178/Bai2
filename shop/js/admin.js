const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

//check user đang là admin ko
if (!user || user.isAdmin !== "true") {
  window.location.href = "login.html";
}
//xóa user ở local khi đăng xuất
const logOut = document.getElementById("logOut");
logOut.onclick = function () {
  localStorage.removeItem("user");
};

const nameInput = document.getElementById("name");
const priceOldInput = document.getElementById("priceOld");
const priceInput = document.getElementById("price");
const srcInput = document.getElementById("src");
const saleCheckbox = document.getElementById("sale");
const starInput = document.getElementById("star");
const btnSave = document.getElementById("btnSave");

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function getProductsInLocal() {
  const productsInLocal = localStorage.getItem("products");
  let products = [];
  if (productsInLocal) {
    products = JSON.parse(productsInLocal);
  }
  return products;
}

function setProductsToLocal(productsList) {
  localStorage.setItem("products", JSON.stringify(productsList));
}

function deleteItem(id) {
  const products = getProductsInLocal();
  const newListProducts = products.filter((item) => item.id !== id);
  setProductsToLocal(newListProducts);
  render();
}

function editItem(id) {
  const products = getProductsInLocal();
  let indexUpdate;
  const product = products.find(function (item, index) {
    if (item.id === id) {
      indexUpdate = index;
    }
    return item.id === id;
  });
  nameInput.value = product.name;
  priceOldInput.value = product.priceOld;
  priceInput.value = product.price;
  srcInput.value = product.src;
  saleCheckbox.checked = product.sale;
  starInput.value = product.star;

  btnSave.textContent = "Sửa";
  localStorage.setItem("idUpdate", JSON.stringify(id));
  localStorage.setItem("indexUpdate", JSON.stringify(indexUpdate));
  window.scrollTo(0,0);// lăn lên trên cùng
}

function render() {
  const products = getProductsInLocal(); //lấy products

  //xóa tbody cũ, thay tbody mới
  const tbodyOld = document.getElementById("tbody");
  tbodyOld.remove();

  const table = document.getElementById("table");
  const tbodyNew = document.createElement("tbody");
  tbodyNew.id = "tbody";
  table.appendChild(tbodyNew);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    //thêm dòng, ô và gán dữ liệu
    const row = tbodyNew.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    const cell8 = row.insertCell(7);
    const cell9 = row.insertCell(8);

    const img = document.createElement("img");
    img.src = product.src;
    img.width = "150";
    cell4.appendChild(img);

    cell1.textContent = product.id;
    cell3.textContent = product.name;
    cell7.textContent = product.src;
    cell8.textContent = product.sale;
    cell9.textContent = product.star;
    convert(product.priceOld, cell5);
    convert(product.price, cell6);

    function convert(p, s) {
      if (p == 0 || p == null) {
        s.textContent = null;
      } else if (p >= 1000000) {
        s.textContent = `${String(p).slice(-9, -6)},${String(p).slice(
          -6,
          -3
        )},000 VND`;
      } else {
        s.textContent = `${p / 1000},000 VND`;
      }
    }

    const edit = document.createElement("button");
    edit.textContent = "Sửa";
    // edit.onclick = editItem(product.id);
    edit.addEventListener("click", () => editItem(product.id));
    edit.classList = "btn btn-outline-dark mt-auto";
    cell2.appendChild(edit);

    const del = document.createElement("button");
    del.textContent = "Xóa";
    // del.onclick = deleteItem(product.id);
    del.addEventListener("click", () => deleteItem(product.id));
    del.classList = "btn btn-outline-dark mt-auto";
    cell2.appendChild(del);
  }
}

render();

btnSave.onclick = function (event) {
  const idUpdate = localStorage.getItem("idUpdate");
  const indexUpdate = localStorage.getItem("indexUpdate");
  const products = getProductsInLocal();

  if (idUpdate) {
    console.log("aaa");
    const idEdit = JSON.parse(idUpdate);
    const indexEdit = JSON.parse(indexUpdate);
    const product = products.find((item) => item.id === idEdit);
    product.name = nameInput.value;
    product.priceOld = priceOldInput.value;
    product.price = priceInput.value;
    product.src = srcInput.value;
    product.sale = saleCheckbox.checked;
    product.star = starInput.value;
    products.splice(indexEdit, 1, product);
    btnSave.textContent = "Thêm";
    localStorage.removeItem("idUpdate");
    localStorage.removeItem("indexUpdate");
  } else {
    console.log("bb");
    const product = {
      id: makeid(10),
      name: nameInput.value,
      priceOld: priceOldInput.value,
      price: priceInput.value,
      src: srcInput.value,
      sale: saleCheckbox.checked,
      star: starInput.value,
    };
    products.push(product);
  }
  setProductsToLocal(products);
  render();
};