import './Card.css';
import cardBack from '../assets/card-back.png';
import type { CardState } from '../models/CardState';

function Card({ character, onClick }: { character: CardState; onClick: (index: number) => void; }) {
    return (
        <div className='card-container'>
            <div className={character.clicked ? 'card clicked': 'card'} onClick={() => onClick(character.id)} data-clicked={character.clicked}>
                <div className="card-inner">
                    <div className="card-front">
                        <img src={character.src} alt="" className="card-img"/>
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