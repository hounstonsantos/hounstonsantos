import './CardGrid.css';

function CardGrid({ children }: { children: React.ReactNode }) {
    return <div className='card-grid'>{children}</div>;
}

export default CardGrid;