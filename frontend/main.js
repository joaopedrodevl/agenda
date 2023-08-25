import 'regenerator-runtime/runtime';
import 'core-js/stable';

import './assets/css/style.css';

document.addEventListener('DOMContentLoaded', () => {
    const formRegister = document.querySelector('#form-register');
    const formLogin = document.querySelector('#form-login');

    if (formRegister && formLogin) {
        formRegister.addEventListener('submit', (e) => {
            e.preventDefault();
            const register = new ValidaForm(formRegister);
            register.verifyData();
        });
        
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const login = new ValidaForm(formLogin);
            login.verifyData();
        });
    }
});

class ValidaForm {
    constructor(form) {
        this.formRegister = form;
        this.formData = new FormData(form);
        this.data = Object.fromEntries(this.formData);
        this.errors = [];
    }

    verifyData() {
        const { email, password } = this.data;
        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(email)) {
            this.errors.push('Email inválido!');
        }
        if (password.length < 3 || password.length > 50) {
            this.errors.push('Senha deve ter entre 3 e 50 caracteres!');
        }

        this.register();
    }

    register() {
        if (this.errors.length > 0) {
            this.errosNaTela();
            this.errors = [];
            return;
        }

        this.formRegister.submit();
        this.errors = [];
        return;
    }

    errosNaTela() {
        const divLogin = document.getElementById('div-login');
        const divErros = document.querySelector('.div-errors');
        if (!divErros) {
            const divErrors = document.createElement('div');
            divLogin.appendChild(divErrors);
            divErrors.classList.add('div-errors', 'alert', 'alert-danger');

            this.criaErros(divErrors);
            return;
        }
        
        if (this.errors.length > 0) {
            this.criaErros(divErros);
            return;
        }

        if (this.errors.length === 0) {
            divErros.remove();
            return;
        }
    }

    criaErros(divErrors) {
        divErrors.innerHTML = '';
        this.errors.forEach(error => {
            const small = document.createElement('small');
            small.innerHTML = `${error}<br/>`;
            divErrors.appendChild(small);
        });
        return;
    }
}