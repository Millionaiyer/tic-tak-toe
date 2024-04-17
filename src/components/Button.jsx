import '../App.css';

const Button = ({ restartGame, text }) => {
  return (
    <button className="btn" onClick={() => restartGame()}>
      {text}
    </button>
  );
};

export default Button;
