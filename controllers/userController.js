const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require ('jsonwebtoken')

exports.createUser = async (req, res) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {email, password} = req.body
        
        try {
            // Validate Users
            let user = await User.findOne({ email })            
            if (user) {
                return res.status(400).json({ msg: 'This email has been already registered.' })
            }

            // Create User
            newUser = new User(req.body)

            const salt = await bcryptjs.genSalt(10)
            newUser.password = await bcryptjs.hash(password, salt)

            // Save User
            await newUser.save()

            // Crear y firmar el JWT

            const payload = {
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                }
            }

            jwt.sign(payload, process.env.TOKEN_SECRET, {
                expiresIn: 129600 // 3 horas
            }, (error, token) => {
                if(error) throw error

                res.json({ token })
            })

        } catch (error) {

            console.log(error);
            res.status(400).send('Something went wrong')

        }
    
}

exports.authUser = async (req, res) => {
    
    const {email, password} = req.body

    try {
        let user = await User.findOne( { email } )

        if(!user){
            return res.status(400).json({ msg: 'This email is NOT registered' })
        }

        const passwordValidate = await bcryptjs.compare(password, user.password)

        if(!passwordValidate){
            return res.status(200).json( {msg: 'Invalid Passowrd' } )
        }

        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

        jwt.sign( payload, process.env.TOKEN_SECRET, {
            expiresIn: 126000
        }, (error, token) => {
            if(error)throw error
            res.json({token})
        } )

    } catch (error) {
        console.log(erro);
    }
}