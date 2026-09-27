
export default function Square({ value, onSquareClick, highlight }) {
    const color = value === "X" ? 'bg-black-800' : value === "O" ? 'bg-gray-800' : 'bg-transparent';
    return (
        <button className={`square cursor-pointer ${color} ${highlight ? 'winner-square' : ''}`} onClick={onSquareClick}>
            {value}
        </button>
    );
}