import { useReducer, useCallback } from 'react';
import type { CardState } from '../models/CardState';
import { createShuffledCards } from '../utils/shuffle';

type State = {
    cards: CardState[];
    clickCount: number;
};

type Action =
    | { type: 'FLIP'; index: number }
    | { type: 'MATCH'; a: number; b: number }
    | { type: 'UNFLIP'; a: number; b: number }
    | { type: 'UNFLIPALL'; }
    | { type: 'RESET'; cards: CardState[] }
    | { type: 'INCREMENT' };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FLIP': {
            const cards = state.cards.map((c, i) => i === action.index ? { ...c, clicked: true } : c);
            return { ...state, cards, clickCount: state.clickCount + 1 };
        }
        case 'MATCH': {
            const cards = state.cards.map((c, i) =>
                i === action.a || i === action.b ? { ...c, pairFound: true } : c
            );
            return { ...state, cards };
        }
        case 'UNFLIP': {
            const cards = state.cards.map((c, i) =>
                i === action.a || i === action.b ? { ...c, clicked: false } : c
            );
            return { ...state, cards };
        }
        case 'UNFLIPALL': {
            return { cards: state.cards.map(c => ({ ...c, clicked: false })), clickCount: state.clickCount };
        }
        case 'RESET':
            return { cards: action.cards, clickCount: 0 };
        default:
            return state;
    }
}

export function useGame() {
    const [state, dispatch] = useReducer(reducer, {
        cards: createShuffledCards(),
        clickCount: 0,
    });

    const toggleCard = useCallback((index: number) => {
        const selected = state.cards[index];
        if (!selected) return;

        // block if already clicked or two unmatched opened
        const openUnmatched = state.cards.filter(c => c.clicked && !c.pairFound);
        if (selected.clicked || openUnmatched.length >= 2) return;

        // if there is one open unmatched, check for match
        if (openUnmatched.length === 1) {
            const openIndex = state.cards.findIndex(c => c.clicked && !c.pairFound);
            const openCard = state.cards[openIndex];

            if (openCard.name === selected.name) {
                // match immediately
                dispatch({ type: 'FLIP', index });
                dispatch({ type: 'MATCH', a: openIndex, b: index });
                return;
            } else {
                // flip both, then unflip after delay
                dispatch({ type: 'FLIP', index });
                setTimeout(() => {
                    dispatch({ type: 'UNFLIP', a: openIndex, b: index });
                }, 1000);
                return;
            }
        }

        // no open unmatched cards, just flip
        dispatch({ type: 'FLIP', index });
    }, [state.cards]);

    const resetGame = useCallback(() => {
        const newCards = createShuffledCards();
        // small UX: clear current shown cards first (optional)
        dispatch({ type: 'UNFLIPALL' });
        // then reset after a short delay
        setTimeout(() => dispatch({ type: 'RESET', cards: newCards }), 300);
    }, []);

    return {
        state,
        actions: {
            toggleCard,
            resetGame,
        },
    };
}