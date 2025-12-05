import cardList from '../mocks/card-list.json';
import type { CardState } from '../models/CardState';

export function createShuffledCards(): CardState[] {
  return [...cardList, ...cardList]
    .sort(() => Math.random() - 0.5)
    .map((item, index) => ({ ...item, id: index, clicked: false, pairFound: false }));
}