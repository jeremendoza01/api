const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// Función de registro
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // valida q los campos no esten vacios
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está registrado' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Guardar el nuevo usuario
        await newUser.save();

        // genera un token JWT
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Responde con el token y los datos del usuario
        res.status(201).json({
            message: 'Registro exitoso',
            token,
            user: {
                username: newUser.username,
                email: newUser.email,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
    }
};

// login
const login = async (req, res) => {
    const { username, password } = req.body;

    // verifica q no esten vacios
    if (!username || !password) {
        return res.status(400).json({ message: 'Username y password son requeridos' });
    }

    try {
        // console.log('Datos recibidos:', req.body);

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Contraseña válida:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ 
            message: 'Inicio de sesión exitoso',
            token,
            user: { username: user.username, email: user.email },
        });
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    }
};


const checkToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verificar si existe el header de autorización
    if (!authHeader) {
        return res.status(401).json({
            isValid: false,
            message: 'No se proporcionó token de autorización',
        });
    }

    const token = authHeader.split(' ')[1]; // extrae el token (eliminando el prefijo 'Bearer ')

    try {
        // verifica token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // buscar el usuario
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({
                isValid: false,
                message: 'Usuario no encontrado con este token',
            });
        }
        req.user = user;

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                isValid: false,
                message: 'Token expirado',
            });
        }

        return res.status(401).json({
            isValid: false,
            message: 'Token inválido',
        });
    }
};


module.exports = { login, register, checkToken };

