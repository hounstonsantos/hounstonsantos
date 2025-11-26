import { useState } from 'react';
import Card from './components/Card';
import cardList from './mocks/card-list.json';
import type { CardState } from './models/CardState';
import CardGrid from './components/CardGrid';
import Counter from './components/Counter';
import ResetButton from './components/ResetButton';
import Header from './components/Header';

import './App.css'
const cards = [...cardList, ...cardList]
  .sort(() => Math.random() - 0.5)
  .map((item, index) => ({ ...item, id: index, clicked: false }));

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [cardsState, setCardsState] = useState<CardState[]>(cards);

  function setCardsStateWrapper(index: number) {
    const selectedCard = cardsState[index];

    if (cardsState.filter(item => item.clicked && !item.pairFound).length >= 2 || selectedCard.clicked) {
      return;
    }

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

  function resetGame() {

    cardsState.forEach(card => {
      card.clicked = false;
      card.pairFound = false;
    });

    setCardsState([...cardsState]);

    const randomCards = [...cardList, ...cardList]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: index, clicked: false, pairFound: false }));

    setTimeout(() => {
      setCardsState(randomCards);
      setClickCount(0);
    }, 1000);

  }

  return (
    <>
      <Header>
        <Counter value={clickCount} />
        <ResetButton onClick={() => {
          resetGame();
        }} />
      </Header>
      <CardGrid>
        {cardsState.map((item: CardState, index: number) => (
          <Card key={index} character={item} onClick={setCardsStateWrapper} />
        ))}
      </CardGrid>
    </>
  )
}

export default App
