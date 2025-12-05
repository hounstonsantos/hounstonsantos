import Card from './components/Card';
import CardGrid from './components/CardGrid';
import Counter from './components/Counter';
import ResetButton from './components/ResetButton';
import Header from './components/Header';
import { useGame } from './hooks/useGame';

import './App.css'

function App() {
  const { state, actions } = useGame();

  return (
    <>
      <Header>
        <Counter value={state.clickCount} />
        <ResetButton onClick={actions.resetGame} />
      </Header>
      <CardGrid>
        {state.cards.map((item) => (
          <Card key={item.id} character={item} onClick={actions.toggleCard} />
        ))}
      </CardGrid>
    </>
  );
}

export default App
