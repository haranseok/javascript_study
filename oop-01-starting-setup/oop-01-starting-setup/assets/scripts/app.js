// const poroducts = [
//   {
//     title: "A Pillow",
//     imageUrl:
//       "https://fastly.picsum.photos/id/240/200/300.jpg?blur=5&hmac=UDFJH4m-QKTtSXWzQ0e4-5wAlhTut6kOBmgTqRMFgt8",
//     price: 19.99,
//     description: "A soft pillow!",
//   },
//   {
//     title: "A Carpet",
//     imageUrl:
//       "https://fastly.picsum.photos/id/240/200/300.jpg?blur=5&hmac=UDFJH4m-QKTtSXWzQ0e4-5wAlhTut6kOBmgTqRMFgt8",
//     price: 89.99,
//     description: "A carpet which you migth like - or not.",
//   },
// ];

const productList = {
  poroducts: [
    {
      title: "A Pillow",
      imageUrl:
        "https://fastly.picsum.photos/id/240/200/300.jpg?blur=5&hmac=UDFJH4m-QKTtSXWzQ0e4-5wAlhTut6kOBmgTqRMFgt8",
      price: 19.99,
      description: "A soft pillow!",
    },
    {
      title: "A Carpet",
      imageUrl:
        "https://fastly.picsum.photos/id/240/200/300.jpg?blur=5&hmac=UDFJH4m-QKTtSXWzQ0e4-5wAlhTut6kOBmgTqRMFgt8",
      price: 89.99,
      description: "A carpet which you migth like - or not.",
    },
  ],
  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    // 논리 추가
    for (const prod of this.poroducts) {
      const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      prodEl.innerHTML = `
      <div>
        <img src="${prod.imageUrl}" alt="${prod.title}">
        <div class="product-item__content">
        <h2>${prod.title}</h2>
        <h3>\$${prod.price}</h3>
        <p>${prod.description}</p>
        <button>Add to Cart</button>
        </div>
      </div>
      `;
      prodList.append(prodEl);
    }
    renderHook.append();
  },
};
