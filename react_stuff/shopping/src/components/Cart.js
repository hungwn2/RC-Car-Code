import '../styles/cartItem.css';
import CartItem from './CartItem';
export default function CartI(props) {
    const path=props.artwork;
    const totalPrice=
        Math.round((props.price*props.quantity+Number.EPSILON)*100)/100;