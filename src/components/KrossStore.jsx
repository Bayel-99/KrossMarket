import { FaSearch } from "react-icons/fa";
import { Group, heart, kross, person } from "../assets/index";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

function KrossStore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://23a229c37544e995.mokky.dev/item");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки: {error}</div>;
  }

  const deleteProduct = async (id) => {
    try {
      const deleteProductRequest = await fetch(
        `https://23a229c37544e995.mokky.dev/item/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteProductRequest.ok) {
        throw new Error(`HTTP error! status: ${deleteProductRequest.status}`);
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch("https://23a229c37544e995.mokky.dev/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);

      setNewProduct({
        name: "",
        price: "",
        image: "",
      });

      alert("Продукт добавлен успешно!");
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.description?.toLowerCase().includes(value.toLowerCase())
  );

  const handleAddToCart = (product) => {
    const productInCart = cart.some((item) => item.id === product.id);

    if (productInCart) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart([...cart, { ...product }]);
    }
  };

  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleClickDelete = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("₽", "").trim());
      return sum + price;
    }, 0);

    return total;
  };

  const calculateTax = (total) => total * 0.05;

  const calculateFinalTotal = (total, tax) => total + tax;

  const total = calculateTotal();
  const tax = calculateTax(total);
  const finalTotal = calculateFinalTotal(total, tax);

  return (
    <>
      <div
        style={{ padding: "50px", borderRadius: "20px", background: "#f4f4f4" }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img src={kross} alt="kross logo" style={{ width: "50px" }} />
            <h3 style={{ margin: 0 }}>KROSS STORE</h3>
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginLeft: "auto",
                alignItems: "center",
              }}
            >
              <div
                onClick={toggleCartModal}
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <FaShoppingCart style={{ fontSize: "24px" }} />
                <p>{cart.length} товаров</p>
              </div>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <img src={heart} alt="heart logo" />
                <p>Закладки</p>
              </div>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <img src={person} alt="person logo" />
                <p>Профиль</p>
              </div>
            </div>
          </div>
          <div>
            <p
              style={{
                position: "relative",
                bottom: "30px",
                left: "70px",
                color: "grey",
              }}
            >
              Магазин лучших кроссовок
            </p>
          </div>
        </div>
        <hr />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>Все кроссовки</h1>

          <div className="search" style={{ position: "relative", top: "20px" }}>
            <input
              onChange={(event) => setValue(event.target.value)}
              type="search"
              placeholder="Поиск..."
              value={value}
              style={{
                height: "45px",
                width: "250px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                paddingLeft: "30px",
                fontSize: "20px",
              }}
              className="search-input"
            />
            <FaSearch
              style={{
                position: "relative",
                top: "14%",
                right: "240px",
                transform: "translateY(-56%)",
                color: "#ccc",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  width: "250px",
                  height: "334px",
                  padding: "15px",
                  borderRadius: "50px",
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  background: "#fff",
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  marginBottom: "40px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "90%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <p
                  style={{
                    fontSize: "16px",
                    margin: "10px 0",
                    textAlign: "left",
                    padding: "0 20px",
                  }}
                >
                  {product.name}
                </p>
                <p
                  style={{
                    position: "relative",
                    right: "80px",
                    color: "grey",
                  }}
                >
                  ЦЕНА:
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "-28px -21px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      color: "grey",
                      textDecoration: "line-through",
                    }}
                  ></p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      position: "relative",
                      right: "27px",
                      bottom: "33px",
                    }}
                  >
                    {product.price} ₽
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      backgroundColor: "#00bfff",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {cart.some((item) => item.id === product.id)
                      ? "Удалить из корзины"
                      : "Добавить в корзину"}
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={{
                      backgroundColor: "#ff3333",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Удалить товар
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>Продукты не найдены</div>
          )}
        </div>

        <div>
          <h2>Добавить товар</h2>
          <input
            type="text"
            placeholder="Название товара"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
          />
          <input
            type="number"
            placeholder="Цена товара"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
          />
          <input
            type="text"
            placeholder="Ссылка на изображение"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
          />
          <button
            onClick={handleAddProduct}
            style={{
              padding: "10px",
              backgroundColor: "#00bfff",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Добавить товар
          </button>
        </div>

        {isCartOpen && (
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              background: "#fff",
              width: "400px",
              height: "100%",
              padding: "20px",
              boxShadow: "-4px 0 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3>Корзина</h3>
            <div>
              {cart.length === 0 ? (
                <p>Корзина пуста</p>
              ) : (
                cart.map((product) => (
                  <div key={product.id} style={{ marginBottom: "20px" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "50px", height: "auto" }}
                    />
                    <p>{product.name}</p>
                    <p>{product.price} ₽</p>
                    <button
                      onClick={() => handleClickDelete(product.id)}
                      style={{
                        backgroundColor: "#ff3333",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                ))
              )}
            </div>
            <div>
              <p>Итого: {total} ₽</p>
              <p>Налог (5%): {tax} ₽</p>
              <p>Итог: {finalTotal} ₽</p>
              <button
                style={{
                  backgroundColor: "#00bfff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                onClick={() => setIsCartOpen(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default KrossStore;
