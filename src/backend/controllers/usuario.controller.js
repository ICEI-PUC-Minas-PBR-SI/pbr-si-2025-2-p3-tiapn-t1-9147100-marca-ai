const Usuario = require('../models/usuario');

exports.criarUsuario = async (req, res) => {
  try {
    const novoUsuario = await Usuario.create(req.body); // CREATE no MySQL
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll(); // READ (SELECT *) no MySQL
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};