import Square from './Square.jsx';

export default function Board({ squares, isXNext, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) return;

        const newSquares = squares.slice();
        newSquares[i] = isXNext ? 'X' : 'O';
        onPlay(newSquares);
    }

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: lines[i] };
            }
        }
        return null;
    }

    let status;
    let result = calculateWinner(squares);
    if (result) {
        status = <p style={{ color: "limegreen" }} >winner: {result.winner}</p>;
    } else if (squares.every((square) => square !== null)) {
        status = <p style={{ color: "orange" }}>Draw</p>;
    } else {
        status = 'Next player: ' + (isXNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="game flex flex-col gap-10 items-center ">
                <div className="status text-2xl md:text-5xl">
                    {status}
                </div>
                <div className=" w-fit flex flex-col gap-2">
                    {[0, 1, 2].map((row) => (
                        <div className="row flex gap-2">
                            {[0, 1, 2].map((col) => {
                                const index = row * 3 + col;
                                return (
                                    <Square
                                    key={index}
                                    highlight={result?.line.includes(index)}
                                    value={squares[index]}
                                    onSquareClick={() => handleClick(index)}
                                    
                                    />
                                );
                            })} </div>
                    ))}
                </div>
            </div>
        </>
    )
}
