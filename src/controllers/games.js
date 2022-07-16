const { game, genre, platform, user } = require('../../models');


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

exports.getAllGames = async(req, res) => {
    try {
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
            }
        });
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
exports.getAllGames = async(req, res) => {
    try {
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
            }
        });
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