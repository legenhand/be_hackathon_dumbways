const { platform } = require('../../models')

exports.getAllPlatform = async(req, res) => {
    try {
        const data = await platform.findAll({
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

exports.getPlatformById = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await platform.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            where: {
                id: id,
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