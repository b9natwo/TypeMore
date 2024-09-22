import React, { useState, useEffect } from 'react';
import carImage from '../assets/car.png';

const prompts = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "In the middle of difficulty lies opportunity.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Life is what happens when you're busy making other plans.",
  "To succeed in life, you need three things: a wishbone, a backbone, and a funny bone.",
  "It does not matter how slowly you go as long as you do not stop.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "Happiness is not something ready-made. It comes from your own actions.",
  "Act as if what you do makes a difference. It does.",
  "The best way to predict the future is to create it."
];

const TypingRace = () => {
  const [prompt, setPrompt] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isRacing, setIsRacing] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  useEffect(() => {
    if (isRacing) {
      const timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
        const totalCharacters = prompt.length;
        const correctCharacters = userInput
          .split('')
          .filter((char, index) => char === prompt[index]).length;

        setAccuracy((correctCharacters / totalCharacters) * 100);
        const typedChars = userInput.length;
        const newDistance = Math.min(100, (typedChars / totalCharacters) * 100);
        setDistance(newDistance);
        setWpm(Math.floor((typedChars / 5) / (elapsedTime / 60000)));
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isRacing, startTime, userInput, elapsedTime, prompt]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (!isRacing && input.length > 0) {
      setIsRacing(true);
      setStartTime(Date.now());
    }

    if (input === prompt) {
      setIsRacing(false);
      alert(`You've completed the race! Time: ${(elapsedTime / 1000).toFixed(2)} seconds`);

      setTimeout(() => {
        resetGame();
      }, 1000);
    }
  };

  const resetGame = () => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    setUserInput('');
    setDistance(0);
    setElapsedTime(0);
    setWpm(0);
    setAccuracy(0);
  };

  const getCharacterStyle = (index) => {
    if (index < userInput.length) {
      return userInput[index] === prompt[index] ? 'correct' : 'incorrect';
    }
    return 'default';
  };

  return (
    <div className="typing-race-container">
      <div className="header">
        <h1 className="title">TypeMore</h1>
        <p className="subtext">Sharpen your typing skills and race against time or <s>other players</s>.</p>
      </div>
      <div className="race-area">
        <div className="prompt">
          {prompt.split('').map((char, index) => (
            <span key={index} className={getCharacterStyle(index)}>{char}</span>
          ))}
        </div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          autoFocus
          className="input-field"
          placeholder="Start typing to race..."
        />
        <div className="track">
          <div
            className="car"
            style={{ left: `${distance}%`, transition: 'left 0.1s ease' }}
          >
            <img src={carImage} alt="Car" />
          </div>
        </div>
        <div className="stats">
          <div className="stat-item"><span>Time:</span> {(elapsedTime / 1000).toFixed(2)} s</div>
          <div className="stat-item"><span>WPM:</span> {wpm}</div>
          <div className="stat-item"><span>Accuracy:</span> {accuracy.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
};

export default TypingRace;
