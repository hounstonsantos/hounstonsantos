import { useState } from 'react';
import Card from './components/Card';
import cardList from './mocks/card-list.json';
import type { Character } from './models/Character';
import CardGrid from './components/CardGrid';
import Counter from './components/Counter';

import './App.css'
const cards = [...cardList, ...cardList]
  .sort(() => Math.random() - 0.5)
  .map((item, index) => ({ ...item, id: item.id + "_" + index, clicked: false }));

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [cardsState, setCardsState] = useState<Character[]>(cards);

  function handleCardClick(id: string) {
    const selectedCard = cardsState.find(card => card.id === id)!;
    const wrongCard = cardsState
      .find(item => item.name !== selectedCard.name && item.clicked)
    
    if (wrongCard) {
      setTimeout(() => {
        wrongCard.clicked = false;
        selectedCard.clicked = false;

        setCardsState([...cardsState]);
      }, 1000);
    }

    selectedCard.clicked = !selectedCard.clicked;

    setCardsState([...cardsState]);
    setClickCount(clickCount + 1);
  }

  return (
    <>
      <Counter value={clickCount} />
      <CardGrid>
        {cards.map((item: Character, index: number) => (
          <Card key={index} character={item} onClick={handleCardClick} />
        ))}
      </CardGrid>
    </>
  )
}

export default App
