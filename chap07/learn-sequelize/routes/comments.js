// /comments로 들어오는 작업을 처리하는 라우터
const express = require('express');
const { User, Comment } = require('../models');

const router = express.Router();

// POST /comments
router.post('/', async (req, res, next) => {
    try{
        let targetUser = await User.findOne({
            attributes: ['id'],
            where: {
                name: req.body.id,
            }
        });
        const comment = await Comment.create({
            commenter: targetUser.dataValues.id,
            comment: req.body.comment,
        });
        console.log(comment);
        res.status(201).json(comment);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id')
    // PATCH /comments/:id
    .patch(async (req, res, next) => {
        try{
            const result = await Comment.update({
                comment: req.body.comment,
            }, {
                where: { id: req.params.id },
            });
            res.json(result);
        } catch(err) {
            console.error(err);
            next(err);
        }
    })
    // DELETE /comments/:id
    .delete(async (req, res, next) => {
        try{
            const result = await Comment.destroy({ where: { id: req.params.id } });
            res.json(result);
        } catch(err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;