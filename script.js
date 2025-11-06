// QUIZ DE DBC
const questoes = [
    { // Questao 1
        pergunta: "O QUE REPRESENTA UM DIAGRAMA DE BLOCOS DE CONFIABILIDADE (DBC)?",
        opcoes: [
            "Um fluxograma que descreve o funcionamento lógico do software.",
            "Um modelo gráfico que mostra como os componentes de um sistema contribuem para a confiabilidade total.",
            "Um diagrama que indica a ordem de execução das tarefas em um programa."
        ],
        respostaCorreta: "Um modelo gráfico que mostra como os componentes de um sistema contribuem para a confiabilidade total."
    },
    { // Questao 2
        pergunta: "EM UM DBC, OS BLOCOS GERALMENTE REPRESENTAM:",
        opcoes: [
            "Os usuários finais do sistema.",
            "Componentes ou subsistemas que podem falhar.",
            "Entradas e saídas de dados de um algoritmo."
        ],
        respostaCorreta: "Componentes ou subsistemas que podem falhar."
    },
    { // Questao 3 - PONTUAÇÃO DUPLA
        pergunta: "QUANDO OS BLOCOS DE UM DBC ESTÃO CONECTADOS EM SÉRIE, ISSO SIGNIFICA QUE :",
        opcoes: [
            "Todos devem funcionar para que o sistema funcione.",
            "Basta que um deles funcione para o sistema funcionar.",
            "Nenhum deles influencia a confiabilidade total."
        ],
        respostaCorreta: "Todos devem funcionar para que o sistema funcione.",
        desafio: true 
    },
    { // Questao 4
        pergunta: "EM UMA CONFIGURAÇÃO PARALELA DE BLOCOS EM UM DBC : ",
        opcoes: [
            "A falha de um bloco implica falha do sistema.",
            "A confiabilidade total é o produto das confiabilidades individuais.",
            "O sistema falha somente se todos os blocos falharem."
        ],
        respostaCorreta: "O sistema falha somente se todos os blocos falharem."
    },
    { // Questao 5
        pergunta: "A PRINCIPAL FINALIDADE DE UM DBC É : ",
        opcoes: [
            "Reduzir o tempo de execução de um algoritmo.",
            "Avaliar a confiabilidade global de um sistema com base nas confiabilidades dos componentes.",
            "Projetar a interface de um sistema de controle."
        ],
        respostaCorreta: "Avaliar a confiabilidade global de um sistema com base nas confiabilidades dos componentes."
    },
    { // Questao 6 - PONTUAÇÃO DUPLA
        pergunta: "EM UM SISTEMA EM SÉRIE CONFIABILIDADE R1 E R2, A CONFIABILIDADE TOTAL (RT) É DADA POR : ",
        opcoes: [
            "RT = R1 + R2",
            "RT = R1 * R2", 
            "RT = (R1 + R2) / 2"
        ],
        respostaCorreta: "RT = R1 * R2",
        desafio: true 
    },
    { // Questao 7
        pergunta: "QUAL É A VANTAGEM DO USO DE DIAGRAMAS DE BLOCO DE CONFIABILIDADE ? ",
        opcoes: [
            "Simplificam a modelagem de sistemas complexos em termos de confiabilidade. ",
            "Eliminam a necessidade de dados de falha dos componentes.",
            "Substituem completamente simulações de Monte Carlo."
        ],
        respostaCorreta: "Simplificam a modelagem de sistemas complexos em termos de confiabilidade. "
    },
    { // Questao 8 - PONTUAÇÃO DUPLA
        pergunta: "QUAL SOFTWARE PODE SER UTILIZADO PARA A CONSTRUÇÃO DE DBCs e realizar análise de confiabilidade ?",
        opcoes: [
            "Quartus Prime",
            "Mercury",
            "Mars"
        ],
        respostaCorreta: "Mercury",
        desafio: true 
    } 
];


let score = 0;
let erros = 0; 
let perguntaAtualIndex = 0;
const MAX_ERROS = 3;
const TOTAL_PERGUNTAS = questoes.length;

// seletores

const startButton = document.getElementById('start-button');
const restartButtonFail = document.getElementById('restart-button-fail');
const restartButtonWin = document.getElementById('restart-button-win');
const okProfessorButton = document.getElementById('ok-professor'); 

const telaInicial = document.getElementById('tela-inicial');
const telaQuiz = document.getElementById('tela-quiz');
const telaGameOver = document.getElementById('tela-game-over');
const telaVitoria = document.getElementById('tela-vitoria');

const perguntaTexto = document.getElementById('pergunta-texto');
const opcoesRespostas = document.getElementById('opcoes-respostas');
const scoreDisplay = document.getElementById('score');
const vidasDisplay = document.getElementById('vidas');
const finalScoreDisplay = document.getElementById('final-score');

const professorSprite = document.getElementById('professor'); 
const caixaDialogoProfessor = document.getElementById('caixa-dialogo-professor');
const gameContainer = document.getElementById('game-container'); 

// config de tela

function mudarTela(telaParaMostrar) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('ativo');
    });
    telaParaMostrar.classList.add('ativo');

    if (telaParaMostrar !== telaQuiz) {
        gameContainer.classList.remove('fundo-desafio');
        professorSprite.style.display = 'none';
        caixaDialogoProfessor.style.display = 'none';
        if (okProfessorButton) okProfessorButton.style.display = 'none';
    } else {
        professorSprite.style.display = 'block';
        caixaDialogoProfessor.style.display = 'flex';
        okProfessorButton.style.display = 'block';

        perguntaTexto.style.display = 'none';
        opcoesRespostas.style.display = 'none';
    }
}


function iniciarJogo() {
    score = 0; 
    erros = 0; 
    perguntaAtualIndex = 0; 
    mudarTela(telaQuiz);
    atualizarHUD();
}
// inicializa quiz 
function iniciarQuizReal() {
    professorSprite.style.display = 'none';
    caixaDialogoProfessor.style.display = 'none';

    perguntaTexto.style.display = 'block';
    opcoesRespostas.style.display = 'flex'; 

    exibirPergunta();
}


function exibirPergunta() {
    if (perguntaAtualIndex >= TOTAL_PERGUNTAS) {
        mudarTela(telaVitoria);
        finalScoreDisplay.textContent = score;
        return;
    }

    const questao = questoes[perguntaAtualIndex];
    perguntaTexto.textContent = questao.pergunta;
    opcoesRespostas.innerHTML = ''; 

    // EFEITO DE ANOITECER
    if (questao.desafio) {
        gameContainer.classList.add('fundo-desafio');
    } else {
        gameContainer.classList.remove('fundo-desafio');
    }


    questao.opcoes.forEach(opcao => {
        const button = document.createElement('button');
        button.textContent = opcao;
        button.classList.add('botao-pixel', 'opcao-btn');
        
        button.addEventListener('click', () => verificarResposta(button, opcao, questao.respostaCorreta, questao.desafio)); 
        opcoesRespostas.appendChild(button);
    });
}

// att de score e vida
function atualizarHUD() {
    scoreDisplay.textContent = `Score: ${score}`;
    
    vidasDisplay.innerHTML = '';
    const vidasRestantes = MAX_ERROS - erros;
    for (let i = 0; i < vidasRestantes; i++) {
        const coracao = document.createElement('span');
        coracao.textContent = '❤️'; 
        coracao.classList.add('coracao-pixel'); 
        vidasDisplay.appendChild(coracao);
    }
}


// verifica resposta
function verificarResposta(button, respostaSelecionada, respostaCorreta, isDesafio = false) {
    document.querySelectorAll('.opcao-btn').forEach(btn => btn.disabled = true);

    if (respostaSelecionada === respostaCorreta) {
        score += isDesafio ? 2 : 1; 
        button.classList.add('correta');
    } else {
        erros++;
        button.classList.add('errada');
        
        document.querySelectorAll('.opcao-btn').forEach(btn => {
            if (btn.textContent === respostaCorreta) {
                btn.classList.add('correta');
            }
        });
    }

    atualizarHUD();
    
    setTimeout(() => {
        document.querySelectorAll('.opcao-btn').forEach(btn => {
            btn.classList.remove('correta', 'errada');
        });

        if (erros >= MAX_ERROS) {
            mudarTela(telaGameOver);
        } else {
             perguntaAtualIndex++;
             if (perguntaAtualIndex < TOTAL_PERGUNTAS) {
                exibirPergunta();
             } else {
                mudarTela(telaVitoria);
                finalScoreDisplay.textContent = score;
             }
        }
    }, 1000); 
}

// Listeners de botões
startButton.addEventListener('click', iniciarJogo);
okProfessorButton.addEventListener('click', iniciarQuizReal);

// Game Over e vitoria
function handleRestartClick() {
    mudarTela(telaInicial); 
}

restartButtonFail.addEventListener('click', handleRestartClick);
restartButtonWin.addEventListener('click', handleRestartClick);


document.addEventListener('DOMContentLoaded', () => {
    mudarTela(telaInicial);
});