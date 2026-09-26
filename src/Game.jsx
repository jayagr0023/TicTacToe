import { useState } from 'react';
import Board from './components/Board.jsx';

export default function Game() {
    // xnext is true when currentmove is even
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [ascending, setAscending] = useState(true);
    const isXNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(newHistory);
        setCurrentMove(newHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const move = (ascending ? history.map((squares, idx) => ({ squares, idx })) : history.map((squares, idx) => ({ squares, idx })).reverse()).map(({ squares, idx }) => {
        let description = idx ? <p style={idx % 2 == 0 ? { color: "aqua" } : { color: "red" }}> Go to move #{idx}</p> : <p style={{ color: "green" }}> Go to game start</p>;

        return <li key={idx}><button className='cursor-pointer h-12' onClick={() => jumpTo(idx)}>{description}</button></li>;
    })

    function toggleOrder() {
        setAscending(!ascending);
    }

    return (
        <div className="main">
            <div className="mainHeading text-center text-4xl md:text-7xl">TicTacToe</div>
            <div className="game place-content-center md:flex justify-evenly items-center w-full h-screen ">
                <div className='board text-6xl '>
                    <Board squares={currentSquares} isXNext={isXNext} onPlay={handlePlay} />
                </div>
                <div className="border info items-center text-4xl h-120 w-100 text-center ">
                    <div className="history flex justify-around">
                        <div className="list text-xl xs:text-2xl sm:text-4xl md:text-4xl">
                            <ol>{move}</ol>
                        </div>
                        <div className=" ">
                            <button className='border cursor-pointer text-xl h-fit w-fit p-1' onClick={toggleOrder}>sort</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
