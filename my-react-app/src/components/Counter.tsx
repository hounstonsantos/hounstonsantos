
function Counter({ value }: { value: number }) {
      return (
        <div className="counter" aria-live="polite">
            Numbers of Attemps: {Math.floor(value/2)}
        </div>
    );
}
export default Counter;