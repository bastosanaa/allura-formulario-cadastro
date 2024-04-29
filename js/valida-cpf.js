export default function ehUmCpf(campo) {
    const cpf = campo.value.replace(/\.|-/g, "");
    if(verificaNumerosTodosRepetidos(cpf) || validaPrimeiroDigitoVerificador(cpf) || validaSegundoDigitoVerificador(cpf)) {
        campo.setCustomValidity("Este cpf não existe")
    } 
}

function verificaNumerosTodosRepetidos(cpf) {
    const numerosTodosRepetidos = Array.from({length: 9}, (_, i) => (i+1).toString().repeat(11));
    console.log(numerosTodosRepetidos);
    return numerosTodosRepetidos.includes(cpf)
}

function validaPrimeiroDigitoVerificador(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[9];
}

function validaSegundoDigitoVerificador(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[10];
}