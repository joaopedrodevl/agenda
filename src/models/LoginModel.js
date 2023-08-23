const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({ 
    email: { type: String, required: true }, 
    password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();
        await this.userExistis();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync(); // Gera um hash para a senha
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body); // Em alterações de base de dados, é necessário usar o await
    }

    async login() {
        this.valida();
        if(this.errors.length > 0) return;

        this.user = await LoginModel.findOne({ email: this.body.email });
        
        if (!this.user) {
            this.errors.push('Usuário ou senha inválido.');
            return;
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Usuário ou senha inválido.');
            this.user = null;
            return;
        }
    }

    async userExistis() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if(this.user) this.errors.push('Usuário já existe.');
    }

    valida() {
        this.cleanUp();

        // O e-mail precisa ser válido
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
        if(!this.body.password || this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('Senha é um campo obrigatório.');
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password,
        };
    }
}

module.exports = Login; 