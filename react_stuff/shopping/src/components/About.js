import collection from '../imgs/collections.jpeg'
import '../styles/about.css'

export default function ABout(){
    return(
        <div className="about-main">
            <div className="about-left">
                <h1>About us</h1>
                <div className="about-text">
                    <p>Bayview Cake And Pastry Shop Inc</p>
                        <ul>
                            <li>Pineapple BUn</li>
                            <li>Raisin Bun</li>
                            <li>Egg tart</li>
                            <li>Lemon tea</li>
                            <li>Milk tea</li>
                        </ul>
                </div>
            </div>
            <img src={collection} alt="collection"></img>
        </div>

    );
}