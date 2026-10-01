import { useEffect, useState } from "react"

const getGameIdFromURL = () => new URLSearchParams(window.location.search).get("game")

function App() {
  const [gameId, setGameId] = useState(getGameIdFromURL)
  const [game, setGame] = useState(null)
  const [error, setError] = useState("")

  const createGame = async () => {
    const response = await fetch('/api/games', { method: 'POST' })
    const newGame = await response.json()
    
    // localStorage.setItem(newGame._id, "X")

    window.history.pushState(null, "", `?game=${newGame._id}`)

    setGame(newGame)
    setGameId(newGame._id)
  }


}