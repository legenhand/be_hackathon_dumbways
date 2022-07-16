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
        let data = JSON.parse(JSON.stringify(dataNewGames))
        data = {
            ...data,
            screenshots: dataNewGames.screenshots.split(";").filter(Boolean),
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