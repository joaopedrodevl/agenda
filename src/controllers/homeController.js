const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    const contatos = await Contato.buscarContatos();
    return res.render('index', { contatos }); 
};


