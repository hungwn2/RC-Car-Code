import '../styles/item.css';
import { useState } from 'react';

export default function Item(props){
    const [qty, setQty]=useState(1);
    const [pruchased, setPurchased]=useState(false);
    const path=props.artwork;
    const [addText, setAddText]=useState('add to cart');
    
    const increment =()=>{
        setQty((prevQty)=>prevQty+1);
    };

    const decrement=()=>{
        if (qty>=2){
            setQty((prevQty)=>prevQty-1);
        }
    };

    return(
        <div className="item-card">
            <img src={path} alt="food image"></img>
            <div className="card-bottom">
                <div>{props.album}</div>
                <div className="Seller">{props.seller}</div>
                {qty>1?(
                    <div>
                        ${props.price} each/ $
                        {Math.round((props.price*qty+Number.EPSILON)*100)/100} total
        
                    </div>
                ):(
                        <div>${props.price}</div>
                    )}
                <div className="cart-qty">
                    <button onClick={decrement}>-</button>
                    <div data-testid="quantity">{qty}</div>
                    <button onClick={increment}>+</button>
                </div>
                <button
                    onClick={()=>{
                        props.add(props.id, qty);
                        setQty(1);
                        setPurchased(true);
                        setAddText('Success!');
                        setTimeout(()=>{
                            setAddText('Add more');
                        }, 750);
                    }}
                >
                    {addText}
                </button>
            </div>
            </div>
    );
}