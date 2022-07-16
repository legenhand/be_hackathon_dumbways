const { game, genre, platform, user, Sequelize } = require('../../models');


// POST addGames url /game method POST
exports.addGames = async(req, res) => {
    try {
        let screenshots = "";
        req.files.screenshots.map(item => {
            screenshots += item.filename + ';' //split with ;
        });
        const newGames = await game.create({
            ...req.body,
            coverImage: req.files.coverImage[0].filename,
            screenshots: screenshots,
            createdBy: req.user.id
        });

        const dataNewGames = await game.findOne({
            where: {
                id: newGames.id
            },
            include: [{
                    model: genre,
                    as: "genreName",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                },
                {
                    model: platform,
                    as: "platformName",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
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
                exclude: ["createdAt", "updatedAt", "genre", "platform", "createdBy"],
            },
        });
        let data = JSON.parse(JSON.stringify(dataNewGames));

        data = {
            ...data,
            coverImage: process.env.PATH_FILE + data.coverImage,
            screenshots: dataNewGames.screenshots.split(";").filter(Boolean).map(i => process.env.PATH_FILE + i),
            genre: dataNewGames.genreName,
            platform: dataNewGames.platformName,
            createdBy: dataNewGames.creator,
        }
        delete data.genreName;
        delete data.platformName;
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
};

// Get all games = url /Games method Get
exports.getAllGames = async(req, res) => {
    try {
        let filter = {}
        if (req.query.genreId) {
            filter.genre = req.query.genreId
        }
        if (req.query.platformId) {
            filter.platform = req.query.platformId
        }
        let data = await game.findAll({
            include: [{
                    model: genre,
                    as: "genreName",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                },
                {
                    model: platform,
                    as: "platformName",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
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
                exclude: ["createdAt", "updatedAt", "genre", "platform", "createdBy"],
            },
            where: filter
        });
        console.log(data);
        data = JSON.parse(JSON.stringify(data));
        data = data.map(item => {
            let newItem = {
                ...item,
                coverImage: process.env.PATH_FILE + item.coverImage,
                screenshots: item.screenshots.split(";").filter(Boolean).map(i => process.env.PATH_FILE + i),
                genre: item.genreName,
                platform: item.platformName,
                createdBy: item.creator,
            }
            delete newItem.genreName;
            delete newItem.platformName;
            delete newItem.creator
            return newItem;
        });

        res.send({
            status: "success",
            data
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

// Get game by ID = url /Game/:id method Get 
exports.getGameById = async(req, res) => {
    const { id } = req.params;
    try {
        let data = await game.findOne({
            where: {
                id: id
            },
            include: [{
                    model: genre,
                    as: "genreName",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                },
                {
                    model: platform,
                    as: "platformName",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
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
                exclude: ["createdAt", "updatedAt", "genre", "platform", "createdBy"],
            },
        });
        data = JSON.parse(JSON.stringify(data));

        data = {
            ...data,
            coverImage: process.env.PATH_FILE + data.coverImage,
            screenshots: data.screenshots.split(";").filter(Boolean).map(i => process.env.PATH_FILE + i),
            genre: data.genreName,
            platform: data.platformName,
            createdBy: data.creator,
        }
        delete data.genreName;
        delete data.platformName;
        delete data.creator;

        res.send({
            status: "success...",
            data: data
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getGameByUserId = async(req, res) => {
    try {
        const id = req.user.id;
        let data = await game.findAll({
            where: {
                createdBy: id
            },
            include: [{
                    model: genre,
                    as: "genreName",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                },
                {
                    model: platform,
                    as: "platformName",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
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
                exclude: ["createdAt", "updatedAt", "genre", "platform", "createdBy"],
            },
        });
        data = JSON.parse(JSON.stringify(data));

        data = JSON.parse(JSON.stringify(data));
        data = data.map(item => {
            let newItem = {
                ...item,
                coverImage: process.env.PATH_FILE + item.coverImage,
                screenshots: item.screenshots.split(";").filter(Boolean).map(i => process.env.PATH_FILE + i),
                genre: item.genreName,
                platform: item.platformName,
                createdBy: item.creator,
            }
            delete item.genreName;
            delete item.platformName;
            delete item.creator
            return newItem;
        });

        res.send({
            status: "success...",
            data: data
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

// update game by ID = url /Game/:id method patch 
exports.updateGame = async(req, res) => {
    try {
        const { id } = req.params;

        let data = await game.findOne({
            where: {
                id: id
            },
        });

        if (!data) {
            return res.send({
                message: `game with ID: ${id} not found!`
            })
        }

        if (data.createdBy != req.user.id) {
            return res.send({
                message: `cannot update this game`
            })
        }
        let screenshots = '';
        req.files.screenshots.map(item => {
            screenshots += item.filename + ';' //split with ;
        });
        await game.update({
            ...req.body,
            coverImage: req.files.coverImage[0].filename,
            screenshots: screenshots,
            createdBy: req.user.id
        }, {
            where: {
                id: id
            }
        });
        let newData = await game.findOne({
            where: {
                id: id
            },
            include: [{
                    model: genre,
                    as: "genreName",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                },
                {
                    model: platform,
                    as: "platformName",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
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
                exclude: ["createdAt", "updatedAt", "genre", "platform", "createdBy"],
            },
        });
        newData = JSON.parse(JSON.stringify(newData));
        newData = {
            ...newData,
            coverImage: process.env.PATH_FILE + newData.coverImage,
            screenshots: newData.screenshots.split(";").filter(Boolean).map(i => process.env.PATH_FILE + i),
            genre: newData.genreName,
            platform: newData.platformName,
            createdBy: newData.creator,
        }
        delete newData.genreName;
        delete newData.platformName;
        delete newData.creator;

        res.send({
            status: "success...",
            data: newData
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

// delete game by ID = url /game/:id method delete
exports.deleteGame = async(req, res) => {
    try {
        const { id } = req.params;

        let data = await game.findOne({
            where: {
                id: id
            },
        });

        if (!data) {
            return res.send({
                status: 'not found',
                message: `game with ID: ${id} not found!`
            })
        }

        if (data.createdBy != req.user.id) {
            return res.send({
                status: 'restricted',
                message: `cannot delete this game `
            })
        }

        await game.destroy({
            where: {
                id: id
            }
        });
        res.send({
            status: "success...",
            data: "game successfully deleted"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

// Filter game with genre and platform