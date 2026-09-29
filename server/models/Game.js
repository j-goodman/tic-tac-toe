const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema(
    {
        board: { type: [String], default: ["","","","","","","","",""] },
        turn: { type: String, default: "X" },
        winner: { type: String, default: "" },
    },
    {timestamps: true}
)

module.exports = mongoose.model('Game', gameSchema)