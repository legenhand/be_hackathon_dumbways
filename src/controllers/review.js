const { reviews, game, user } = require('../../models');
const Joi = require('joi');

exports.addReview = async(req, res) => {
    // our validation schema here
    const { gameId } = req.params;
    const createdBy = req.user.id;
    const schema = Joi.object({
        rating: Joi.number().greater(0).less(6).required(),
        comment: Joi.string().required(),
    });
    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body);

    // if error exist send validation error message
    if (error) {
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });
    }

    try {
        const isReviewExists = await reviews.findOne({
            where: {
                gameId: gameId,
                createdBy: createdBy
            }
        });

        if (isReviewExists) {
            res.status(500).send({
                status: 'failed',
                message: 'Review already Exists!',
            });
            return;
        }

        const newReview = await reviews.create({
            ...req.body,
            gameId: gameId,
            createdBy: createdBy
        });

        const dataNewReview = await reviews.findOne({
            where: {
                id: newReview.id
            },
            include: [{
                    model: game,
                    as: "game",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                },
                {
                    model: user,
                    as: "creator",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "gameId", "createdBy"],
            },
        });
        let data = JSON.parse(JSON.stringify(dataNewReview));
        data = {
            ...data,
            createdBy: data.creator
        }
        delete data.creator;
        res.send({
            status: "success...",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.getReviewByGameId = async(req, res) => {
    try {
        const { gameId } = req.params;

        const dataReview = await reviews.findAll({
            where: {
                gameId: gameId
            },
            include: [{
                    model: game,
                    as: "game",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                },
                {
                    model: user,
                    as: "creator",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "gameId", "createdBy"],
            },
        });
        if (dataReview.length === 0) {
            return res.status(404).send({
                status: "not found",
                message: "Review for this game is empty"
            })
        }

        let data = JSON.parse(JSON.stringify(dataReview));
        data = data.map(item => {
            newItem = {
                ...item,
                createdBy: item.creator
            }
            delete newItem.creator;
            return newItem;
        })

        res.send({
            status: "success...",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.updateReview = async(req, res) => {
    try {
        const { gameId } = req.params;
        const isReviewExists = await reviews.findOne({
            where: {
                gameId: gameId,
                createdBy: req.user.id
            }
        });

        if (!isReviewExists) {
            res.status(500).send({
                status: 'failed',
                message: 'Review doesnt Exists!',
            });
            return;
        }

        const newReview = await reviews.update({
            ...req.body,
        }, {
            where: {
                id: isReviewExists.id
            }
        });
        const dataNewReview = await reviews.findOne({
            where: {
                gameId: gameId,
                createdBy: req.user.id
            },
            include: [{
                    model: game,
                    as: "game",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                },
                {
                    model: user,
                    as: "creator",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "gameId", "createdBy"],
            },
        });
        let data = JSON.parse(JSON.stringify(dataNewReview));
        data = {
            ...data,
            createdBy: data.creator
        }
        delete data.creator;
        res.send({
            status: "success...",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}