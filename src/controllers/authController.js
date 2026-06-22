const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const register = async (req, res) => {

    try {

        const { nombre, email, password, role } = req.body;

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'El usuario ya existe'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            nombre,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: 'Usuario registrado',
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        res.json({
            message: 'Login exitoso',
            token,
            role: user.role,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    register,
    login
};