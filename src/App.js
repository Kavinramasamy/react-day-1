import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function App() {
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0);


  const getData = async () => {
    const data =
      await fetch('https://fakestoreapi.com/products?sort=desc')
        .then(res => res.json())
    setProducts(data);
    console.log(data)
  }

  useEffect(() => { getData() }, [])
  function filterBy(filterKey) {
    var boxes = document.getElementsByClassName("box");
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      if (box.id.includes(filterKey)) {
        box.style.display = "block";
      }
      else {
        box.style.display = "none";
      }
    }
  }
  return (
    <div className="App bg-success text-center">
      <nav className="navbar navbar-expand-lg navbar-light bg-success fixed-top">
        <div className="container px-4 px-lg-5 ">
          <a className="navbar-brand text-light" href="#!"><h1 className='text-dark text-start'>TRENDS SH0P</h1></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item"><a className="nav-link  text-light" aria-current="page" href="#!"><h5>Home</h5></a></li>
              <li className="nav-item"><a className="nav-link text-light" href="#!"><h5>About</h5></a></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                  <li><button className="dropdown-item" href='#!' onClick={() => filterBy("products")} > Products</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={() => filterBy("women's clothing")} >Women's clothing</button></li>
                  <li><button className="dropdown-item" onClick={() => filterBy("men's clothing")} >Men's clothing</button></li>
                  <li><button className="dropdown-item" onClick={() => filterBy("electronics")} >Electronics</button></li>
                  <li><button className="dropdown-item" onClick={() => filterBy("jewelery")} >Jewelery</button></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex shadow-lg">
              <button className="btn btn-dark" type="submit">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-success text-white ms-1">{count}</span>
              </button>
            </form>
          </div>
        </div>
      </nav>
      <header className='heading text-light d-flex justify-content-around mb-3'>
        <h1 className='text-start'>TRENDS.SHOP</h1>

        <h4 className=' d-flex align-items-center text-dark mt-1'>Cart : {count}</h4>
      </header>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Trend never had end...🛒</h1>
            <p className="lead fw-normal text-light-50 mb-0">Happiness is not in money,but in shopping.</p>
          </div>
        </div>
      </header>
      <div className="row d-flex justify-content-evenly">
        {products.length <= 0 ?
          <h1>Loading...</h1> :


          products.map((ele, idx) => (

            <ProductList
              ele={ele}
              key={idx}
              count={count}
              setCount={setCount}
            />
          ))
        }
      </div>
      <footer className='p-5'><h5 className='text-light'> TRENDS.SHOP Copyrights@2023</h5></footer>
    </div>
    // </div>
  );
}

export default App;

export const ProductList = (props) => {
  const ele = props.ele;
  const [show, setShow] = useState(true)
  function add() {
    props.setCount(props.count + 1)
  }
  function sub() {
    props.setCount(props.count - 1)
  }

  return (
    <div className="box col-md-3 m-2 mb-3 p-2  bg-dark text-center filter-card" key={props.key} id={ele.title.toLowerCase() + ele.category.toLowerCase()}>
      <div className='overflow-hidden'>
        <LazyLoadImage effect="blur" class="card-img-top" src={ele.image} alt="Card image cap" />
      </div>
      <div class="card-body">
        <h5 class="card-title mb-3 text-light "> {ele.title}</h5>
        <p class="card-text text-light">Price: Rs. {Math.floor(ele.price * 80)}</p>
        <p class="card-text text-light">Rating: {ele.rating.rate}</p>
        <p class="card-text text-light">Count: {ele.rating.count}</p>
        <p class="card-text text-light">Category: {ele.category}</p>
        {show ?
          <Button className='mb-3' variant="success"
            onClick={() => {
              setShow(!show);
              add();
            }}
          >Add to cart</Button>
          :
          <Button className='mb-3' variant="danger"
            onClick={() => {
              setShow(!show);
              sub();
            }}
          >Remove Cart</Button>}
      </div>
    </div>
  )

}




