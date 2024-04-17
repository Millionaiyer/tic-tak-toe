import './App.css';
import { useState, useEffect } from 'react';
import Square from './components/Square';
import { Patterns } from './constants/Patterns';
import Button from './components/Button';

function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [player, setPlayer] = useState('O');
  const [result, setResult] = useState({ winner: 'none', state: 'none' });

  // executes the  check winner and check tie function whenever [board] value changes and checks if the player is X or 0
  useEffect(() => {
    checkWin();
    checkIfTie();

    setPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X')); // check if the player is X or 0
  }, [board]);

  // used to check if there is a winner if there is prints the winner and resets the game whenever [result] value changes
  useEffect(() => {
    if (result.state != 'none') {
      alert(`Game Finished! Winning Player: ${result.winner}`);
      restartGame();
    }
  }, [result]);

  // prints the value of X or 0 depending on the current player
  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx == square && val == '') {
          return player;
        }
        return val;
      })
    );
  };

  const checkWin = () => {
    // function to check for win
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]]; // check the first element and  which player it is
      if (firstPlayer == '') return; // if it's '' it stops
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          // check if everything in the pattern is the same player
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        // check if the pattern is winning pattern
        setResult({ winner: player, state: 'Won' }); // if winning pattern is true alerts winner
      }
    });
  };

  // check if all squares are filled if all are filled it declares a tie
  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == '') {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: 'No one, it is a tie!', state: 'Tie' });
    }
  };

  // Resets the game to the initial state
  const restartGame = () => {
    setBoard(Array(9).fill(''));
    setPlayer('O');
  };

  return (
    <>
      <div className="container">
        <div className="board">
          <div className="row">
            {[0, 1, 2].map((index) => (
              <Square
                key={index}
                val={board[index]}
                chooseSquare={() => chooseSquare(index)}
              />
            ))}
          </div>
          <div className="row">
            {[3, 4, 5].map((index) => (
              <Square
                key={index}
                val={board[index]}
                chooseSquare={() => chooseSquare(index)}
              />
            ))}
          </div>
          <div className="row">
            {[6, 7, 8].map((index) => (
              <Square
                key={index}
                val={board[index]}
                chooseSquare={() => chooseSquare(index)}
              />
            ))}
          </div>

          <Button text={'Reset Game'} restartGame={restartGame} />
        </div>
      </div>
    </>
  );
}

export default App;
