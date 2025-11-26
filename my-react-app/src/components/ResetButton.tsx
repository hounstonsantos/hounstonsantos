import './ResetButton.css'

function ResetButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} type="button">
            Reset
        </button>
    );
};

export default ResetButton;