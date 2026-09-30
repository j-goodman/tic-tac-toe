const express = require('express')
const mongoose = require('mongoose')
const Game = require('../models/Game')

const router = express.Router()

const lines = [
    [0,1,2],[3,4,5],[6,7,8]
    [0,3,6],[1,4,7],[2,5,8]
    [0,4,8],[2,4,6]
]

const getWinner = board => {
    for (const [a,b,c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]
        }
    }
    return board.includes("") ? "" : "draw"
}

router.param('id', async (req, res, next, id) => {
    const game = mongoose.isValidObjectId(id) && await Game.findById(id)
    if (!game) {
        return res.status(404).json({message: 'Game not found'})
    }
    req.game = game
    next()
})

router.post('/', async (req, res) => {
    const game = await Game.create({})
    res.status(201).json(game)
})

router.get('/:id', (req, res) => {
    res.json(req.game)
})

router.post('/:id/move', async (req, res) => {
    const { game } = req
    const { index, player } = req.body

    if (game.winner) {
        return res.status(400).json({ message: "Game is over" })
    }

    if (player !== game.turn) {
        return res.status(400).json({ message: "Not your turn" })
    }

    if (!Number.isInteger(index) || game.board[index] !== "") {
        return res.status(400).json({ message: "Invalid move" })
    }

    game.board.set(index, player)
    game.winner = getWinner(game.board)
    game.turn = player === "X" ? "O" : "X"
    await game.save()
    res.json(game)
})

router.post('/:id/reset', async (req, res) => {
    const { game } = req
    game.board = ["","","","","","","","",""]
    game.turn = "X"
    game.winner = ""
    await game.save()
    res.json(game)
})

module.exports = router