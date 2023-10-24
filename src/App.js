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
  function searchFilter(filterKey) {
    var boxes = document.getElementsByClassName('filter-card');
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      if ((box.id).includes(filterKey)) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    }
  }
  return (
    <div className="App bg-success text-center">
      <header className='heading text-light d-flex justify-content-around mb-3'>
        <h1 className='text-start'>TRENDS.SHOP</h1>

        <h4 className=' d-flex align-items-center text-dark mt-1'>Cart : {count}</h4>
      </header>
      <input className='form-control w-50 mb-5' type='text' onChange={(e) => searchFilter((e.target.value).toLowerCase())} placeholder='Search...' />
      {/* <div className='container'> */}
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
    <div className="col-md-3 m-2 mb-3 p-2  bg-dark text-center filter-card" key={props.key} id={ele.title.toLowerCase()}>
      <div className='overflow-hidden'>
        <LazyLoadImage effect="blur" class="card-img-top" src={ele.image} alt="Card image cap" />
      </div>
      <div class="card-body">
        <h5 class="card-title mb-3 text-light "> {ele.title}</h5>
        <p class="card-text text-light">Price: Rs. {Math.floor(ele.price * 80)}</p>
        <p class="card-text text-light">Rating: {ele.rating.rate}</p>
        <p class="card-text text-light">Count: {ele.rating.count}</p>
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




