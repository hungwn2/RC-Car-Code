import { ReactComponent as MySVG } from '../imgs/record.svg';
import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home(){
    return (
        <div className="home-main">
            <div className="home-center-left">
                <h1>Food</h1>
                <link className="link-btn" to="shop">
                <button> Buy now</button>
                </link>
            </div>
            <MySVG className="record"/>
        </div>
    )
}