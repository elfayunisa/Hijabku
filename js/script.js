// Toggle Class Active untuk Hamburger Menu (Mobile)
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#hamburger-menu").onclick = (e) => {
  e.preventDefault();
  navbarNav.classList.toggle("active");
};

// Toggle Class Active untuk Search Form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
document.querySelector("#search-button").onclick = (e) => {
  e.preventDefault();
  searchForm.classList.toggle("active");
  searchBox.focus();
};

// Toggle Class Active untuk Shopping Cart Sidebar
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  e.preventDefault();
  shoppingCart.classList.toggle("active");
};

// Klik di luar elemen untuk menutup menu / search / cart
document.addEventListener("click", function (e) {
  if (
    !document.querySelector("#hamburger-menu").contains(e.target) &&
    !navbarNav.contains(e.target)
  ) {
    navbarNav.classList.remove("active");
  }
  if (
    !document.querySelector("#search-button").contains(e.target) &&
    !searchForm.contains(e.target)
  ) {
    searchForm.classList.remove("active");
  }
  if (
    !document.querySelector("#shopping-cart-button").contains(e.target) &&
    !shoppingCart.contains(e.target)
  ) {
    shoppingCart.classList.remove("active");
  }
});

// =========================================================
// SISTEM KERANJANG BELANJA & CHECKOUT WHATSAPP DINAMIS
// =========================================================
let cart = [];

function updateCartUI() {
  const container = document.querySelector("#cart-items-container");
  const totalPriceEl = document.querySelector("#cart-total-price");
  const badgeEl = document.querySelector(".cart-badge");
  const waBtn = document.querySelector("#checkout-wa-btn");

  container.innerHTML = "";
  let total = 0;
  let totalItems = 0;
  let waMessage = "Halo Hijabku, saya ingin memesan:\n";

  if (cart.length === 0) {
    container.innerHTML =
      '<p style="text-align:center; color:#94a3b8; padding:2rem 0; font-size:0.9rem;">Keranjang kamu masih kosong.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      totalItems += item.quantity;
      waMessage += `- ${item.name} (${item.quantity}x) : Rp ${(item.price * item.quantity).toLocaleString("id-ID")}\n`;

      const itemEl = document.createElement("div");
      itemEl.classList.add("cart-item");
      itemEl.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <div class="cart-item-detail">
          <h3>${item.name}</h3>
          <div class="item-price">Rp ${item.price.toLocaleString("id-ID")} (${item.quantity}x)</div>
        </div>
        <i data-feather="trash-2" class="remove-item" onclick="removeFromCart(${index})"></i>
      `;
      container.appendChild(itemEl);
    });
  }

  totalPriceEl.innerText = `Rp ${total.toLocaleString("id-ID")}`;
  badgeEl.innerText = totalItems;

  waMessage += `\n*Total Keseluruhan: Rp ${total.toLocaleString("id-ID")}*`;
  waBtn.href = `https://wa.me/6283142320965?text=${encodeURIComponent(waMessage)}`;

  // Refresh ikon Feather di dalam keranjang
  if (typeof feather !== "undefined") {
    feather.replace();
  }
}

function addToCart(name, price, img) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price: parseInt(price), img, quantity: 1 });
  }
  updateCartUI();
  shoppingCart.classList.add("active"); // Otomatis buka sidebar keranjang saat barang ditambah
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Event listener untuk tombol tambah ke keranjang
document.addEventListener("click", function (e) {
  const btn =
    e.target.closest(".add-to-cart-btn") ||
    e.target.closest(".add-to-cart-action");
  if (btn) {
    e.preventDefault();
    const name = btn.getAttribute("data-name");
    const price = btn.getAttribute("data-price");
    const img = btn.getAttribute("data-img");
    addToCart(name, price, img);
  }
});

// Panggil inisialisasi awal
updateCartUI();

// =========================================================
// FORMULIR KONTAK KE WHATSAPP
// =========================================================
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#contact-name").value;
    const email = document.querySelector("#contact-email").value;
    const phone = document.querySelector("#contact-phone").value;
    const message = document.querySelector("#contact-message").value;

    let waText = `Halo Admin Hijabku, saya ingin mengirim pesan/pertanyaan:\n\n`;
    waText += `*Nama:* ${name}\n`;
    waText += `*Email:* ${email}\n`;
    waText += `*No. HP/WA:* ${phone}\n`;
    waText += `*Pesan:* ${message}`;

    const phoneNumber = "6283142320965"; // Nomor WhatsApp tujuan
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waText)}`;
    window.open(whatsappURL, "_blank");
  });
}
