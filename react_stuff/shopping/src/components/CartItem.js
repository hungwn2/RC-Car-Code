import '../styles/cartItem.css';

export default function CartItem(props) {
    const path=props.artwork;
    const totalPrice=
    Math.round((props.price*props.quantity+Number.EPSILON)*100)/100;
    return(
        <div className="cart-item">
            <img src={path} alt="Thing image"></img>
            <div className="details">
                <div>{props.creator}</div>
                <div>{props.date}</div>
            </div>
            <div className="quantity">Quantity: {props.quantity}</div>
            <div>${props.price} each</div>
            <div className="total-price"> ${totalPrice} total</div>
        <button onclick={()=>{
            console.log(props.sku);
            props.remove(props.sku);
        }}
        >
            <i className="fa-solid fa-trash-can"></i>
        </button>
        </div>
    );
}