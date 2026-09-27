import { useState } from 'react';
import Board from './components/Board.jsx';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Power } from 'lucide-react';

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
        let description = idx ? <p style={idx % 2 == 0 ? { color: "cornflowerblue" } : { color: "coral" }}> Go to move #{idx}</p> : <p style={{ color: "darkslateblue" }}> Go to game start</p>;

        return <li key={idx}><button className='cursor-pointer h-12' onClick={() => jumpTo(idx)}>{description}</button></li>;
    })

    function toggleOrder() {
        setAscending(!ascending);
    }
    function resetGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    return (
        <div className="main ">
            <div className="navbar px-2 py-1 sm:px-6 lg:px-8 absolute left-0 top-0 flex items-center justify-between border-b-indigo-900 bg-slate-800 shadow-lg shadow-indigo-800 w-full">
                <div className="logo absolute md:left-5  "><img src='./Logo.png' className='h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 '></img></div>
                <div className="w-full text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl ">TicTacToe</div>
                <button onClick={resetGame} className=" w-fit rounded p-1 bg-gray-700 transition-colors hover:bg-red-500 ">
                    <Power className="h-5 w-5 cursor-pointer  md:h-7 md:w-7 lg:h-9 lg:w-9" />
                </button>
            </div>
            <div className="game place-content-center md:flex justify-evenly items-center w-full h-screen ">
                <div className='board text-6xl '>
                    <Board squares={currentSquares} isXNext={isXNext} onPlay={handlePlay} />
                </div>
                <div className="border info items-center text-4xl h-120 w-100 text-center ">
                    <div className="history flex justify-between px-5">
                        <div className="list text-xl xs:text-2xl sm:text-4xl md:text-4xl b">
                            <ol>{move}</ol>
                        </div>
                        <div className="">
                            <button className='border cursor-pointer text-xl h-fit w-fit p-1' onClick={toggleOrder}>{ascending ? <ArrowDownWideNarrow /> : <ArrowUpNarrowWide />}</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
