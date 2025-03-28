import '../styles/shop.css';
import { Link } from 'react-router-dom';
import Item from './Item';
import data from '../stock';

export default function Shop(props){
    const totalVal=Math.rund((props.totalPrice+Number.EPSILON)*100)/100;
    const catalogue=data;

    return (
        <div>
            <div>
                {props.totalPrice>0 ?(
                    <div className="summary">
                        <div data-testid="totalItems">{props.items} items in cart </div>
                        <div data-testid="totalValue">${totalVal} total</div> 
                        <Link to="cart">
                            <button>View cart</button>
                        </Link>
                    </div>
                ):(
                    <div className="summary-empty">
                        <Link to="cart">
                        <button>View Cart</button>
                        </Link>
                    </div>
                )}
            </div>
            <div className="cards">
                {catalogue.map((Item)=>{
                    return(
                        <Item
                        key={Item.sku}
                        artwork={item.image}
                        purpose={Item.purpose}
                        creator={Item.creator}
                        price={Item.price}
                        add={Item.add}
                        id={Item.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}