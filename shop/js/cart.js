const orders = getOrdersInLocal();
// lọc orders ko trùng sp, thêm số lượng từng sp, set lại lên local
for (let i = 0; i < orders.length; i++) {
  if (!orders[i].quantity) {
    orders[i].quantity = 1;
  }
  for (let j = i + 1; j < orders.length; j++) {
    if (orders[j].id === orders[i].id) {
      orders[i].quantity++;
      orders.splice(j, 1);
      j--; // sau khi splice 1 ptử, ptử j thành ptử j-1 nên giảm j 1 để ko bở lỡ ptử nào
    }
  }
}
setOrdersToLocal(orders);

//thêm số lượng sp trên icon giỏ hàng
const cartNumber = document.getElementById("cartNumber");
let x = 0;
for (let i = 0; i < orders.length; i++) {
  x += orders[i].quantity;
}
cartNumber.textContent = x;

function getOrdersInLocal() {
  const ordersInLocal = localStorage.getItem("orders");
  let orders = [];
  if (ordersInLocal) {
    orders = JSON.parse(ordersInLocal);
  }
  return orders;
}

function setOrdersToLocal(list) {
  localStorage.setItem("orders", JSON.stringify(list));
}

function render() {
  const orders = getOrdersInLocal(); //lấy orders

  //xóa tbody cũ, thay tbody mới
  const tbodyOld = document.getElementById("tbody");
  tbodyOld.remove();

  const table = document.getElementById("table");
  const tbodyNew = document.createElement("tbody");
  tbodyNew.id = "tbody";
  table.appendChild(tbodyNew);

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
  let tong = 0;
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    //thêm dòng, ô và gán dữ liệu
    const row = tbodyNew.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    const span = document.createElement("span");

    const img = document.createElement("img");
    img.src = order.src;
    img.width = "150";
    cell2.appendChild(img);

    cell1.textContent = order.name;
    span.textContent = order.quantity;
    cell5.appendChild(span);
    convert(order.price, cell3);

    // thêm nút + -
    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.addEventListener("click", function () {
      order.quantity++;
      cartNumber.textContent++;
      setOrdersToLocal(orders);
      render();
    });
    plus.classList = "btn btn-outline-dark mt-auto";
    cell6.appendChild(plus);

    const minus = document.createElement("button");
    minus.textContent = "-";
    minus.addEventListener("click", function () {
      if (order.quantity > 1) {
        ///khi sp có 2 cái trở lên
        order.quantity--;
        cartNumber.textContent--;
        setOrdersToLocal(orders);
        render();
      } else {
        ///khi sp có 1 cái
        cartNumber.textContent--;
        orders.splice(i, 1);
        setOrdersToLocal(orders);
        render();
      }
    });
    minus.classList = "btn btn-outline-dark mt-auto";
    cell4.appendChild(minus);

    const del = document.createElement("button");
    del.textContent = "Xóa";
    del.addEventListener("click", function () {
      cartNumber.textContent -= order.quantity;
      orders.splice(i, 1);
      setOrdersToLocal(orders);
      render();
    });
    del.classList = "btn btn-outline-dark mt-auto";
    cell7.appendChild(del);

    tong += Number(order.price) * order.quantity;
  }
  const row = tbodyNew.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  const cell6 = row.insertCell(5);
  const cell7 = row.insertCell(6);
  const h4 = document.createElement("h4");
  h4.textContent = "Tổng tiền đơn hàng:";
  cell5.textContent = cartNumber.textContent;
  cell1.appendChild(h4);
  convert(tong, cell2);
}
render();
