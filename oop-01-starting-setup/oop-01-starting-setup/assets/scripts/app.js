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

class ShoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutPut.innerHTML = `<h2>Total : \$${this.totlaAmount.toFixed(
      2
    )}</h2>`;
  }

  get totlaAmount() {
    const sum = this.items.reduce((prevValue, curItem) => {
      return prevValue + curItem.price;
    }, 0);
    return sum;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems; // setter를 트리거하고 cartItems의 value params로 전달하여 코드를 업데이트하게 된다.
  }

  render() {
    // 총 계, 주문 버튼 등 장바구니 내부 로직
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
    <h2>Total : \$${0}</h2>
    <button>Order Now!</button>
    `;
    cartEl.className = "cart";
    this.totalOutPut = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product); // ProductItem에 저장된 product를 의미
  }

  // 메서드 명은 꼭 render가 아니라 원하는 것으로 지을 수 있다.
  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
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

    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this)); // bind(this)를 하지않는 경우 이벤트 소스에 this가 바인딩되어 undefined가 나오게 된다.
    return prodEl;
  }
}

class ProductList {
  poroducts = [
    new Product(
      "A Pillow",
      "https://fastly.picsum.photos/id/240/200/300.jpg?blur=5&hmac=UDFJH4m-QKTtSXWzQ0e4-5wAlhTut6kOBmgTqRMFgt8",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://fastly.picsum.photos/id/240/200/300.jpg?blur=5&hmac=UDFJH4m-QKTtSXWzQ0e4-5wAlhTut6kOBmgTqRMFgt8",
      "A carpet which you migth like - or not.",
      89.99
    ),
  ];

  constructor() {}

  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    // 논리 추가
    for (const prod of this.poroducts) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");

    this.cart = new ShoppingCart();

    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart; // 정적 프로퍼티를 사용한다는 사실을 분명히할 수 있어, 가독성을 높일 수 있다. ( 필수는 아님 )

  static init() {
    // Shop으로 액세스할 수 있다.
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart; // Shop 클래스에 this.cart를 보유한 객체라서 접근 가능
  }

  static addProductToCart(product) {
    this.cart.addProduct(product); // 에러가 발생한다. addProduct를 cart에서 찾지 못 하기 때문.
  }
}

App.init();

// 위에 작성된 코드는 모두 독립적으로 작성된 class이다. 각 class에서 생성된 요소를 반환하고, 다른 클래스에서 사용했다.
// addToCart() 메서드가 실행될 때, cart class로 이어지도록 작업이 되어야함. - 다시 렌더링되는 cart 클래스를 다시 업데이트하도록 되어야한다.

/** 252 상속 소개
 * 위 클래스 중에서 중복적으로 사용되는 render() 메서드를 복제
 * ?? - 완전 동일한 구조로 되어있지 않은 데 어떻게 복제가 가능한가?
 */
