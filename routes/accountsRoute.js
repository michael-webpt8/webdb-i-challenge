const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.json(await db('accounts').select())
    }
    catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await db("accounts").where("id", req.params.id).first())
    } catch (err) {
        next(err);
    }
})

module.exports = router;