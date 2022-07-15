const Joi = require('joi');
const { user, profile } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    // our validation schema here
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    });
    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body);

    // if error exist send validation error message
    if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });

    try {
        const isEmailExists = await user.findOne({
            where: {
                email: req.body.email,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (isEmailExists) {
            res.status(500).send({
                status: 'failed',
                message: 'email already registered!',
            });
            return;
        }
        // we generate salt (random value) with 10 rounds
        const salt = await bcrypt.genSalt(10);
        // we hash password from request with salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await user.create({
            username: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        console.log(newUser);
        // generate token
        const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_KEY);
        res.status(200).send({
            status: 'success...',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

exports.login = async(req, res) => {
    try {
        // our validation schema here
        const schema = Joi.object({
            username: Joi.string().min(3).required(),
            password: Joi.string().min(6).required(),
        });

        // do validation and get error object from schema.validate
        const { error } = schema.validate(req.body);

        // if error exist send validation error message
        if (error)
            return res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });

        const userExist = await user.findOne({
            where: {
                username: req.body.username,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (!userExist) {
            return res.status(404).send({
                status: 'failed',
                message: `username: ${req.body.username} not found`,
            });
        }

        // compare password between entered from client and from database
        const isValid = await bcrypt.compare(
            req.body.password,
            userExist.password
        );

        // check if not valid then return response with status 400 (bad request)
        if (!isValid) {
            return res.status(400).send({
                status: 'failed',
                message: 'credential is invalid',
            });
        }

        // generate token
        const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY);
        res.status(200).send({
            status: 'success...',
            user: {
                id: userExist.id,
                username: userExist.username,
                email: userExist.email,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

exports.checkAuth = async(req, res) => {
    try {
        const id = req.user.id;

        const dataUser = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
            },
        });

        if (!dataUser) {
            return res.status(404).send({
                status: 'failed',
            });
        }
        res.send({
            status: 'success...',
            user: {
                id: dataUser.id,
                username: dataUser.username,
                email: dataUser.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status({
            status: 'failed',
            message: 'Server Error',
        });
    }
};