const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token recibido:', token);

    if (!token) {
        console.log('No se proporcionó token');
        return res.status(401).json({ message: 'No se proporcionó token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Token decodificado correctamente:', decoded);
        next();
    } catch (err) {
        console.log('Error al verificar el token:', err.message);
        res.status(401).json({ message: 'Token inválido' });
    }
};
