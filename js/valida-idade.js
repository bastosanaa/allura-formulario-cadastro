export default function ehMaiorDeIdade(campo) {
    const dataNascimento  = new Date(campo.value);
    console.log(validaMaioridade(dataNascimento));
    if (!validaMaioridade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade')
    }
}

function validaMaioridade(data) {
    const dataAtual = new Date();
    const aniversarioMaioridade = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= aniversarioMaioridade;
}