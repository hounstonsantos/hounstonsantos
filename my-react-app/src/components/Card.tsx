import './Card.css';
import cardBack from '../assets/card-back.png';
import { useState } from 'react';

function Card({ imageUrl }: { imageUrl: string }) {
    const [clicked, setClicked] = useState(false);
    return (
        <div className='card-container'>
            <div className={clicked ? 'card clicked': 'card'} onClick={() => setClicked(!clicked)} data-clicked={clicked}>
                <div className="card-inner">
                    <div className="card-front">
                        <img src={imageUrl} alt="" className="card-img"/>
                    </div>
                    <div className="card-back">
                        <img src={cardBack} alt="" className="card-img"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;