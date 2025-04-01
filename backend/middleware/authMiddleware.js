const jwt = require('jsonwebtoken');

app.post('/api/recipes/save', (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id; 

        Recipe.create(req.body)
            .then(recipe => res.status(201).json(recipe))
            .catch(err => res.status(400).json(err));
    } catch (error) {
        res.status(401).json({ message: 'Invalid Token' });
    }
});
