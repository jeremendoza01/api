const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token recibido:', token); // Verifica que el token es válido

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
};
