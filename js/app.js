const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h4 class="h3 text-success">Rating: ${product.rating.rate}<sub class="h6">/5</sub></h4>
      <p>Total: ${product.rating.count} ratings</p>
      <h2>Price: $ ${product.price}</h2>

      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>

      <button onclick="singleProduct(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
  
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
};
// single product details
const singleProduct =(id)=>{
  const productid = id;
  fetch(`https://fakestoreapi.com/products/${productid}`)
  .then(res=>res.json())
  .then(json=>moreDetails(json))
}

const modalBackground = document.getElementById('modalBackground');
const bt = document.getElementById('close');
const detailsContainer =  document.getElementById('detailsContainer');

const moreDetails = (data) =>{
  // modal
  modalBackground.style.display = 'block';
  modalBackground.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('detailsContainer');
  div.innerHTML = `
    <div class="bg-primary details"">
      <h2 id="productDetails">${data.title}</h2>
      <h4 id="productDetails">$ ${data.price}</h4>
      <p id="productDetails">${data.description}</p>
      <button onclick="closeFunc()" class="btn btn-danger" id="close">Close</button>
      <p></p>
    </div>
  `;
  modalBackground.appendChild(div);
}
function closeFunc(){
  modalBackground.style.display = 'none'
}

