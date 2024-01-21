const dino = document.querySelector('.dino');
const cactus = document.querySelector('.cactus');
const ptero = document.querySelector('.ptero');
const vulcan = document.querySelector('.vulcan');
const ground = document.querySelector('.ground');
const background = document.querySelector('.mountains-ini');
const gameBoard = document.querySelector('.game-board');
const backgroundMusic = document.getElementById("backgroundMusic");
const jumpSound = document.getElementById("jumpSound");
const crashSound = document.getElementById("crashSound");

var points = 0;
var dificuldade = 0;
document.getElementById("pontuacaoFinal").innerHTML = points;

let gameIsOver = false; // Variável para rastrear se o jogo acabou

// Função para o pulo do dinossauro
const jump = () => {
    if (!gameIsOver) {
        // Reproduz o som de salto
        jumpSound.currentTime = 0; // Reinicia o som para evitar sobreposição
        jumpSound.play();

        // Adiciona a classe de pulo e altera a imagem do dinossauro
        dino.classList.add('jump');
        dino.src = "./imgs/dinojump.gif";

        // Remove a classe de pulo e restaura a imagem após um intervalo de tempo
        setTimeout(() => {
            dino.classList.remove('jump');
            dino.src = "./imgs/dinorun.gif";
        }, 600);
    }
}

// Função para reiniciar o jogo (recarrega a página)
const reiniciarJogo = () => {
    location.reload();
}

// Função chamada quando o jogo termina
const gameOver = () => {

    // Remove o event listener da tecla após o game over para desativar o pulo
    document.removeEventListener('keydown', jump);
    // adiciona imagem do dino chorando
    // Pausa a música de fundo e finaliza o loop
    backgroundMusic.pause();
    // Exibe o modal ao finalizar o jogo 
    modal.style.display = "block";
    setTimeout(()=>{
        dino.src = "./imgs/dinocry.gif";
    },300);
    setTimeout(()=>{
        dino.src = "./imgs/dinocry.gif";
    },1000);
}

// Loop principal do jogo
const loop = setInterval(() => {
    if (!gameIsOver) {

        // Posições das entidades e tile-sets
        const cactusPosition = cactus.offsetLeft;
        const pteroPosition = ptero.offsetLeft;
        const dinoPosition = window.getComputedStyle(dino).bottom.replace('px', '');
        const groundPosition = ground.offsetLeft;
        const vulcanPosition = vulcan.offsetLeft;
        const backgroundPosition = background.offsetLeft;

        // Verifica colisões em x, se passou de x e em y.
        if (cactusPosition <= 200 && cactusPosition > 0 && dinoPosition < 256
            || pteroPosition <= 200 && pteroPosition > 0 && dinoPosition < 256) {
            // Reproduz o som de colisão
            crashSound.currentTime = 0;
            crashSound.play();
            // Animação de parada dos elementos e finaliza o loop
            ground.style.animation = 'nome';
            ground.style.left = `${groundPosition}px`;
            background.style.animation = 'nome';
            background.style.left = `${backgroundPosition}px`;
            vulcan.style.animation = 'nome';
            vulcan.style.left = `${vulcanPosition}px`;
            cactus.style.animation = 'nome';
            cactus.style.left = `${cactusPosition}px`;
            ptero.style.animation = 'nome';
            ptero.style.left = `${pteroPosition}px`;
            dino.style.animation = 'nome';
            dino.style.bottom = `${dinoPosition}px`;
            clearInterval(loop);
            // Chama a função de Game Over
            gameOver();
        } else {
            // Continua reproduzindo a música e atualiza a pontuação
            backgroundMusic.play();
            points++;
            dificuldade++;
            document.getElementById("pontuacaoFinal").innerHTML = points;
        }
    }
}, 10);

// Event listener para começar a música de fundo ao carregar a página
window.addEventListener("load", () => {
    backgroundMusic.play();
});

// Event listener para o pulo do dinossauro quando a tecla é pressionada
document.addEventListener('keydown', jump);