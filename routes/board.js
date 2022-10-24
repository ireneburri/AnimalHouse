const express = require('express')
const router = express.Router()
const Board = require("../models/mBoard")

//get all
router.get('/', async(req, res) => {
        try {
            const boards = await Board.find()
            res.json(boards)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }


})

//get posts filtered by category
router.get("/:category", async (request , response) => {
    const category = request.params.category
    const boards = await Board.find({category: category});

    try {
      response.send(boards);
    } catch (error) {
      response.status(500).send(error);
    }
});

//get one
router.get('/:id', getBoard, (req, res) => {
        res.json(res.board)
})

//create one
router.post('/', async(req, res) => {
        const board = new Board({
            author: req.body.author,
            title: req.body.title,
            text: req.body.text,
            data: req.body.data,
            img: req.body.img,
            post_id: req.body.post_id,
            category: req.body.category,
            comment: req.body.comment,
        })
        try {
            const newBoard = await board.save()
            res.status(201).json(newBoard)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
})

//update one
router.patch('/:id', getBoard, async(req, res) => {
        if (req.body.author != null) {
            res.board.author = req.body.author
        }
        if (req.body.title != null) {
            res.board.title = req.body.title
        }
        if (req.body.text != null) {
            res.board.text = req.body.text
        }
        if (req.body.data != null) {
            res.board.data = req.body.data
        }
        if (req.body.img != null) {
            res.board.img = req.body.img
        }
        if (req.body.post_id != null) {
            res.board.post_id = req.body.post_id
        }
        if (req.body.category != null) {
            res.board.category = req.body.category
        }
        if (req.body.comment != null) {
            res.board.comment = req.body.comment
        }

        try {
            const updateBoard = await res.board.save()
            res.json(updateBoard)
        } catch (err) {
            res.status(400).json({ message: err.message }) //parametro non accettabile
        }

})

//delete one
router.delete('/:id', getBoard, async(req, res) => {
    try {
        await res.board.remove()
        res.json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }


})

async function getBoard(req, res, next) {
    let board
    try {
        board = await Board.findById(req.params.id)
        if (board == null) {
            return res.status(404).json({ message: 'Cannot find board' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.board = board
    next()
}

module.exports = router