import Card from './components/Card';
import bandit from './assets/bandit.png';
import chilli from './assets/chilli.png';
import bingo from './assets/bingo.png';
import bluey from './assets/bluey.png';
import nana from './assets/nana.png';
import socks from './assets/socks.png';
import calypso from './assets/calypso.png';
import muffin from './assets/muffin.png';

import CardGrid from './components/CardGrid';

import './App.css'

function App() {
  return (
    <CardGrid>
      <Card imageUrl={bandit}/>
      <Card imageUrl={chilli}/>
      <Card imageUrl={bingo}/>
      <Card imageUrl={bluey}/>
      <Card imageUrl={nana}/>
      <Card imageUrl={socks}/>
      <Card imageUrl={calypso}/>
      <Card imageUrl={muffin}/>
    </CardGrid>
  )
}

export default App
