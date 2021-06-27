
const { User } = require('../database')
const bcrypt = require('bcryptjs')
const sgMailing = require('../services/sendgrid')
const jwt = require('jsonwebtoken')
const { userCreation } = require('../validations/validations')
require('dotenv').config()




const register= async (req, res) => {
    const { name, email, password } = req.body
    const usr = req.body
    const errors = userCreation(usr)

    if (errors.result) {

        try {



            let mailExist = await User.findOne({
                where: {
                    email,
                },
            })

            if (mailExist) {
                return res.json({ message: 'Email already exists' });
            }


            //encriptamos el password
            const hash = await bcrypt.hash(password, 10)

            // se agrega el nuevo usuario
            const newUser = await User.create({
                name,
                email,
                password: hash,
            });



            const { to, subject, text, html, sandboxMode = false } = req.body;

            const msg = {
                to: newUser.email,
                from: process.env.MAIL_SENDGRID,
                subject: 'Bienvenid@',
                text: `gracias ${newUser.name} por registrarse`,
                html,
                mail_settings: {
                    sandbox_mode: {
                        enable: sandboxMode
                    }
                }
            };


            try {

                await sgMailing.send(msg);
            }
            catch (err) {
                return res.status(err.code).send(err.message);
            }

            res.status(201).send({ success: true });
        }



        catch (error) {
            return  res.status(500).json({
                error : error,
                msg : "Internal server error",
            })        }
    }
    else {
        res.send(val.error)
    }
}



//inicio de sesion


const login= async (req, res) => {
    const mail = req.body.email

    try {

        const user = await User.findOne({
            where: {
                email: mail,
            },
        });

        if (!user) {
            res.json('Username does not exist')
        }
        else {

            const verifyPassword = await bcrypt.compare(req.body.password, user.password);
            if (!verifyPassword) {
                return res.json({ error: 'Incorrect password' });
            }
            else {
                const createToken = jwt.sign({ user: user.id }, process.env.SECRET, (err, token) => {
                    expiresIn: 1000 * 60 * 60 * 24 * 7,
                    res
                    .status(200)
                    .json({ token, user });
                })

            }

        }


    } catch (error) {

        res.status(500).json({
            error : error,
            msg : "Internal server error"})
    }

}

module.exports ={register,login}