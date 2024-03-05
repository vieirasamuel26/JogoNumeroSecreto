//let titulo = document.querySelector("h1");
//titulo.innerHTML = "Jogo Número Secreto";

//let paragrafo = document.querySelector("p")
//paragrafo.innerHTML = "Escolha um número entre 1 e 10:"

let listaDeNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroaleatorio ();
let tentativas = 1;

//função executa sem retorno
function exibirTextonatela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brasilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial () {
    exibirTextonatela("h1","Jogo Número Secreto");
    exibirTextonatela("p","Escolha um número entre 1 e 10:");
    //exibirTextonatela("p",`Escolha um número entre 1 e ${numeroMaximo}:`);
}

exibirMensagemInicial ();

//função sem parametro e retorno
function verificarChute() {
    let chute = document.querySelector("input").value;
    console.log(chute == numeroSecreto);
    
    if (chute == numeroSecreto) {
        exibirTextonatela("h1","Acertou!"); 
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextonatela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled", true);
    } else { 
        if (chute > numeroSecreto) {
            exibirTextonatela("p","O número secreto é menor");
        } else {
            exibirTextonatela("p","O número secreto é maior");
        }
        tentativas++;
        limparCampo();

    }

}

//função sem parametro e com retorno
function gerarNumeroaleatorio () {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista  = listaDeNumerosSorteados.length;
    
     if(quantidadeDeElementosNaLista == numeroMaximo) {
         listaDeNumerosSorteados = [];
     }
 
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
     return gerarNumeroaleatorio ();
    } else {
     listaDeNumerosSorteados.push(numeroEscolhido);
     console.log(listaDeNumerosSorteados);
     return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroaleatorio ();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial ();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}