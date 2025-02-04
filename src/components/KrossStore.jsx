import { FaSearch } from "react-icons/fa";
import {
  basket,
  Group,
  heart,
  kross,
  person,
} from "../assets/index";
import { useState, useEffect } from "react"; 

function KrossStore() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

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
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <img src={basket} alt="basket logo" />
                <p>1205 руб</p>
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
              type="search"
              placeholder="Поиск..."
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
          {products.map((product) => (
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
              </p>{" "}
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
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {product.price}
                </p>
                <img
                  style={{
                    width: "42px",
                    position: "relative",
                    bottom: "5px",
                    height: "42px",
                  }}
                  src={Group}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default KrossStore;
