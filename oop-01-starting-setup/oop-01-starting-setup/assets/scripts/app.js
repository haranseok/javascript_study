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

// 모든 논리가 productList 객체로 담김
// 객체 리터널 표기법은 객체를 바로 만들거나 데이터를 그룹으로 묶을 때에는 유용하다. 하지만 객체 리터널 표기법을 사용하면 재사용 가능한 객체 코드를 쓰기 어렵다.

// class 명의 첫 글자는 대문자로 시작하고, 모든 하위 단어의 시작을 대문자로 작성한다.

class Product {
  // title = "DEFAULT"; // 기본 값을 설정, class 정의 안에는 값을 등호로 작성한다.
  // imageUrl; // 빈 값을 두거나 아무런 값도 작성하지 않아도 된다.
  // description;
  // price;

  constructor(title, imageUrl, desc, price) {
    this.title = title; // 클래스 인용하는 this
    this.imageUrl = imageUrl;
    this.description = desc;
    this.price = price;
  } // 예약어
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log('Adding product to cart...');
    console.log(this.product); // undefined - this 동작 때문이다. 이벤트 소스에 바인딩되어 버튼에 바인딩되기 때문에 그렇다.
  }

  // 메서드 명은 꼭 render가 아니라 원하는 것으로 지을 수 있다.
  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content">
        <h2>${this.product.title}</h2>
        <h3>\$${this.product.price}</h3>
        <p>${this.product.description}</p>
        <button>Add to Cart</button>
        </div>
      </div>
      `;
    // add 버튼이 동작하도록 구현
    // 단일 상품을 만드는 단일 클래스이기 때문에 여러 개의 버튼이 생성되어도 문제가 되지 않는다.

    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this)); // bind(this)를 하지않는 경우 이벤트 소스에 this가 바인딩되어 undefined가 나오게 된다.
    return prodEl;
  }
}

class ProductList {
  poroducts = [
    new Product(
      'A Pillow',
      'https://fastly.picsum.photos/id/240/200/300.jpg?blur=5&hmac=UDFJH4m-QKTtSXWzQ0e4-5wAlhTut6kOBmgTqRMFgt8',
      'A soft pillow!',
      19.99
    ),
    new Product(
      'A Carpet',
      'https://fastly.picsum.photos/id/240/200/300.jpg?blur=5&hmac=UDFJH4m-QKTtSXWzQ0e4-5wAlhTut6kOBmgTqRMFgt8',
      'A carpet which you migth like - or not.',
      89.99
    ),
  ];

  constructor() {}

  render() {
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    // 논리 추가
    for (const prod of this.poroducts) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const productList = new ProductList();
productList.render();
