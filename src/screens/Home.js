import { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const baseurl = "https://food-app-backend-2-887g.onrender.com";

function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {

    let res = await fetch(`${baseurl}/api/fooddata`, {
    // let res = await fetch(`http://localhost:3000/api/fooddata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    setFoodItem(res[0]);
    setFoodCat(res[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption " style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success text-white"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049__340.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/photos/veg-biryani-picture-id1363306527?b=1&k=20&m=1363306527&s=170667a&w=0&h=VCbro7CX8nq2kruynWOCO2GbMGCea2dDJy6O6ebCKD0="
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://cdn.pixabay.com/photo/2018/03/23/08/27/thai-fried-rice-3253027__340.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="3"
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3" key={data._id}>
                <div className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />

                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => {
                      let { options } = filterItems;
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card foodItem={filterItems} options={options[0]} />
                        </div>
                      );
                    })
                ) : (
                  <div>No such data found 1</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No such data found 2</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
