const { genre } = require('../../models')

exports.getAllGenre = async(req, res) => {
    try {
        const data = await genre.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
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
};

exports.getGenreById = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await genre.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            where: {
                id: id,
            }
        });
        if (!data) {
            return res.status(404).send({
                status: "Not Found",
                message: "not found"
            })
        }
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
};