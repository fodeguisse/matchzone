const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName, lastName, email, password: hashedPassword, phone, role
        });

        res.status(201).json({message: "Utilisateur créé avec succé", user: newUser});
    } catch (error) {
        console.error("erreur lors de la l'inscription :", error);
        res.status(500).json({error: "Erreur lors de l'inscription"});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({error: "Identifiants invalides"});
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            {expiresIn: '1d'}
        );
        
        res.json({message: "Connexion réussie", token});
    } catch (error) {
        console.error("erreur lors de la connexion :", error);
        res.status(500).json({error : "Erreur lors de la connexion"});
    }
};

exports.logout = (req, res) => {
    res.json({message: "deconnexion réussie"});
};