const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

/**
 * GET / READ ALL
 * Endpoint: `/accounts`
 * description: get all accounts data.
 * SELECT * FROM `accounts`
 */
router.get('/', async (req, res, next) => {
  try {
    res.json(await db('accounts').select());
  } catch (err) {
    next(err);
  }
});

/**
 * GET / READ specific :id
 * Endpoint: `/accounts/:id`
 * description: get account with matching :id
 * SELECT * FROM `accounts` where id = 'req.params.id' LIMIT 1;
 */
router.get('/:id', async (req, res, next) => {
  try {
    res.json(
      await db('accounts')
        .where('id', req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

/**
 * POST / CREATE
 * Endpoint: `/accounts`
 * Description: insert on post in first account where id matches.
 * INSERT INTO `accounts` (<table values>) VALUES (<value..to insert..>);
 * SELECT * FROM `accounts` WHERE id = (destructured id) LIMIT 1;
 */
router.post('/', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    const [id] = await db('accounts').insert(payload);
    // { id: id[0] }
    res.json(
      await db('accounts')
        .where('id', id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

/**
 * PUT / UPDATE
 * Endpoint: `/accounts/:id`
 * description:
 */
router.put('/:id', async (req, res, next) => {
  try {
    const updatePayload = {
      name: req.body.name, // string
      budget: req.body.budget // num
    };
    await db('accounts')
      .where('id', req.params.id)
      .update(updatePayload);

    res.json(
      await db('accounts')
        .where('id', req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await db('accounts')
      .where({ id: req.params.id })
      .del();
    res.json(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
