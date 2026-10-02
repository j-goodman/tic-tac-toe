import { useEffect, useState } from "react"

const getGameIdFromURL = () => new URLSearchParams(window.location.search).get("game")

function App() {
  const [gameId, setGameId] = useState(getGameIdFromURL)
  const [game, setGame] = useState(null)
  const [error, setError] = useState("")

  const player = gameId && (localStorage.getItem(gameId) || "O")

  useEffect(() => {
    if (!gameId) return

    const loadGame = async () => {
      const response = await fetch(`/api/games/${gameId}`)
      const data = await response.json()
      if (response.ok) {
        setGame(data)
      } else {
        setError(data.message)
      }
    }

    loadGame()

    const timer = setInterval(loadGame, 1000)
    return () => clearInterval(timer)
  }, [gameId])

  const createGame = async () => {
    const response = await fetch('/api/games', { method: 'POST' })
    const newGame = await response.json()
    
    localStorage.setItem(newGame._id, "X")

    window.history.pushState(null, "", `?game=${newGame._id}`)

    setGame(newGame)
    setGameId(newGame._id)
  }

  if (!gameId) {
    return (
      <main>
        <h1># Tic-Tac-Toe #</h1>
        <button onClick={createGame}>New game</button>
      </main>
    )
  }

  if (!game) {
    return (
      <main>
        <p>{error || 'Loading...'}</p>
      </main>
    )
  }

  return (
    <main>
      <h1># Tic-Tac-Toe #</h1>
      <p>You are <strong>{player}</strong>.</p>
      <div className="board">
        {game.board.map((cell, index) => (
          <button key={index} className="cell">{cell}</button>
        ))}
      </div>
    </main>
  )
}

export default App