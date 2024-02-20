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

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

// 부모 클래스
class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}
  // 빈 메스드 불필요하긴 하나 추가하는 이유는 constructor에 사용된 this.render()가 왜 호출되는 지 바로 알 수 있게 하기 위함이다.

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }

    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => {
      console.log("Order");
      console.log(this.items);
    };
    this.render();
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
      `;
    const orderButton = cartEl.querySelector("button");
    // orderButton.addEventListener("click", () => this.orderProducts());
    orderButton.addEventListener("click", this.orderProducts);

    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false); // false : shouldRender
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
          <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}" >
            <div class="product-item__content">
              <h2>${this.product.title}</h2>
              <h3>\$${this.product.price}</h3>
              <p>${this.product.description}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  // super가 실생되기 전에 어떤 = 어떤을 입력하면 안된다.
  poroducts = [];

  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.poroducts = [
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
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.poroducts) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    if (this.poroducts && this.poroducts.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop extends Component {
  constructor() {
    super(); // super를 호출해서 render가 트리거됐는 지 확인할 수 있다.
  }

  render() {
    // 태그 id : app
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

// 정적 메서드 & 프로퍼티
class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

/** 255
 * 오버 라이딩
 * 모든 하위 클래스에서 렌더링된 큭수 버전을 구현하기 때문, 그래서 하위 클래스에서 부모 클래스에 정의된 모든 메서드를 오버라이딩하면 완전히 교체하게 된다.
 *
 * 그 다음에 부모 클래스 ( Component )에서 this.render()를 호출하면 부모 클래스의 render()를 참조하지 않고 하위 클래스를 참조한다.
 *
 * 그리고 this는 늘 메서드를 참조. construct는 기본적으로 생성하는 객체를 참조
 *
 *  */
