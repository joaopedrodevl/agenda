const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    return res.render('contatos', { contatoBuscado: {} });
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() => res.redirect(`/`));
        return;
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
}

exports.editIndex = async function(req, res) {
    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        const contatoBuscado = await contato.buscarPorId(req.params.id);
        if(!contato) return res.render('404');

        res.render('contatos', { contatoBuscado });
        return;
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}

exports.edit = async function(req, res) {
    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() => res.redirect(`/`));
        return;
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}

exports.delete = async function(req, res) {
    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.delete(req.params.id);

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato deletado com sucesso.');
        req.session.save(() => res.redirect(`/`));
        return;
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}