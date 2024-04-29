import ehUmCpf from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const camposDoFormulario = document.querySelectorAll("[required]");
const formularioCadastro = document.querySelector("[data-formulario]")

formularioCadastro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const listaResposta = {
        "nome": evento.target.elements["nome"].value,
        "email": evento.target.elements["email"].value,
        "rg": evento.target.elements["rg"].value,
        "cpf": evento.target.elements["cpf"].value,
        "aniversario": evento.target.elements["aniversario"].value
    }

    localStorage.setItem("cadastro", JSON.stringify(listaResposta));

    window.location.href = './abrir-conta-form-2.html'
})

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => validaCampo(campo));
    //retirando os pop-ups de erro padroes
    campo.addEventListener("invalid", evento => evento.preventDefault())
    
});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagensDeErro = { 
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
};


function validaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('')
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCpf(campo);
    }
    if (campo.name == "aniversario" && campo.value != ""){
        ehMaiorDeIdade(campo)
    }
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]){
            mensagem = mensagensDeErro[campo.name][erro]
            console.log(mensagem)
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;        
    } else {
        mensagemErro.textContent = "";
    }
}