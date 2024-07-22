import { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const navigate = useNavigate();

  let finalPrice = qty * parseInt(options[size])
  useEffect(() => {
    setSize(priceRef.current.value)
  },[])
  

  const handleAddToCart = async () => {
    if(localStorage.getItem("authToken")) {

      let food = data.find(item => item.id === props.foodItem._id && item.size === size);
    
      if (food) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty, size: size });
      } else {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, img: props.foodItem.img, qty, size });
        console.log(data);
        console.log("Size different so simply ADD one more to the list");
      } 
    }
    else{
      navigate("/login");
    }
  }
  
  

  return (
    <div>
      <div className="card mt-3" style={{"width": "auto", "maxHeight": "600px"}}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}
          </p>
          <div className="container w-100 d-flex align-items-center">
            <select className="selectBtn m-2 h-100   rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e,i) => {
                return(
                  <option key={i+1} value={i+1} >
                    {i+1}
                  </option>
                )
              })}
            </select>
            <select className="selectBtn m-2 h-100  rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {
                priceOptions.map((data) => {
                  return <option key={data} value={data} >{data}</option>
                })
              }
            </select>
            <div className="d-inline h-100 fs-4">
              ${finalPrice}/-
            </div>
          </div>
          <hr />
          <button className="addBtn" onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Card
