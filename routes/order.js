const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const Order = require("../models/mOrder")


//get all
router.get('/', async(req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }


})

//get one
router.get('/id/:id', getOrder, (req, res) => {
    res.json(res.order)
})

//get by client_id
router.get('/client_id/:client_id', async(req, res) => {
    const client_id = req.params.client_id
    let order
    try {
        order = await Order.find({ client_id: client_id });
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order' })
        } else {
            res.status(201).json(order)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

//get by client_id
router.get('/username/:username', async(req, res) => {
    const username = req.params.username
    let order
    try {
        order = await Order.find({ username: username });
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order' })
        } else {
            res.status(201).json(order)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

//create one
router.post('/', async(req, res) => {
    console.log(req.file, req.body)
    const order = new Order({
        client_id: req.body.client_id,
        username: req.body.username,
        address: req.body.address,
        products: req.body.products,
        price: req.body.price,
        date: req.body.date,
        vip: req.body.vip,
        completed: req.body.completed,
    })
    try {
        const neworder = await order.save()
        res.status(201).json(neworder)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


//update one
router.patch('/:id', getOrder, async(req, res) => {

    if (req.body.client_id != null) {
        res.order.client_id = req.body.client_id
    }
    if (req.body.username != null) {
        res.order.username = req.body.username
    }
    if (req.body.address != null) {
        res.order.address = req.body.address
    }
    if (req.body.products != null) {
        res.order.products = req.body.products
    }
    if (req.body.price != null) {
        res.order.price = req.body.price
    }
    if (req.body.date != null) {
        res.order.date = req.body.date
    }
    if (req.body.vip != null) {
        res.order.vip = req.body.vip
    }
    if (req.body.completed != null) {
        res.order.completed = req.body.completed
    }

    try {
        const updateOrder = await res.order.save()
        res.json(updateOrder)
    } catch (err) {
        res.status(400).json({ message: err.message }) //parametro non accettabile
    }

})


//delete one
router.delete('/:id', getOrder, async(req, res) => {
    try {
        await res.order.remove()
        res.json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }


})

async function getOrder(req, res, next) {
    let order
    try {
        order = await Order.findById(req.params.id)
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.order = order
    next()
}


module.exports = router