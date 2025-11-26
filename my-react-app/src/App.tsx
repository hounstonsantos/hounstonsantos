import { useState } from 'react';
import Card from './components/Card';
import cardList from './mocks/card-list.json';
import type { CardState } from './models/CardState';
import CardGrid from './components/CardGrid';
import Counter from './components/Counter';

import './App.css'
const cards = [...cardList, ...cardList]
  .sort(() => Math.random() - 0.5)
  .map((item, index) => ({ ...item, id: index, clicked: false }));

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [cardsState, setCardsState] = useState<CardState[]>(cards);

  function setCardsStateWrapper(index: number) {
    const selectedCard = cardsState[index];
    const wrongCard = cardsState
      .find(item => item.name !== selectedCard.name && item.clicked && !item.pairFound);

    const matchingCard = cardsState
      .find(item => item.name === selectedCard.name && item.clicked && !item.pairFound);

    if (wrongCard) {
      setTimeout(() => {
        wrongCard.clicked = false;
        selectedCard.clicked = false;

        setCardsState([...cardsState]);
      }, 1000);
    }

    if (matchingCard) {
      matchingCard.pairFound = true;
      selectedCard.pairFound = true;
    }

    selectedCard.clicked = !selectedCard.clicked;

    setCardsState([...cardsState]);
    setClickCount(clickCount + 1);
  }

  return (
    <>
      <Counter value={clickCount} />
      <CardGrid>
        {cards.map((item: CardState, index: number) => (
          <Card key={index} character={item} onClick={setCardsStateWrapper} />
        ))}
      </CardGrid>
    </>
  )
}

export default App
