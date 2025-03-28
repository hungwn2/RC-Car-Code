import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Cart from './components/Cart';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';
import data from './stock';

const App = function (){
  const [cart, setCart]=useState(0);
  const [itemsCount, setItemsCount]=useState(0);
  const [totalPrice, setTotalPrice]= useState(0);
  const addcart=(sku, quantity)=>{
    const skus=data;
    const item=skus.find((record)=>record.sku===sku);
    const isNew=cart.every((item)=>{
      return item.sku!==sku;
    });
    if (isNew){
      const order={...item, quantity:quantity};
      setCart((prevCart)=>prevCart.concat(order));
    }
    else{
      const index=cart.findIndex((item)=>{
        return item.sku===sku;
      });
      const revisedQuantity=cart[index].quanity+quantity;
      const cartCopy=[...cart];
      cartCopy[index].quantity=revisedQuantity;
      setCart(cartCopy);
    }
  };

  const removCart=(sku)=>{
    const cartCopy=[...cart];
    const index=cartCopy.findIndex((record)=>{
      return recprd.sku===sku;
    });
    cartCopy.splice(index,1);
    setCart(cartCopy);
  };
  useEffect(()=>{
    const count=cart.reduce((prev, current)=> prev+current.quantity, 0);
    setItemsCount(count);
    const price=cart.reduce(
      (prev, current)=> prev+current.price*current.quantity, 0
    );
    setTotalPrice(price);
  }, [cart]);
  useEffect(()=>{
    console.log(cart);
  }, [cart]);

  return (
    <div className="wrapper">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="shop" element={<Shop add={addCart} totalPrice={totalPrice} items={itemsCount}/>}></Route>
        <Route path="/shop/cart" element={
          <Cart
          cart={cart}
          remove={removeCart}
          totalPrice={totalPrice}
          itemsCount={itemsCount}
          />
        }
        ></Route>
      <Route path="about" element={<About/>}></Route>
      <Route path="contact" element={<Contact/>}></Route>
      </Routes>
    </div>
  );
}
export default App;