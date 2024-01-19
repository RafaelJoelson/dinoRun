const dino = document.querySelector('.dino');
const cactus = document.querySelector('.cactus');
const gameBoard = document.querySelector('.game-board');
const backgroundMusic = document.getElementById("backgroundMusic");
const jumpSound = document.getElementById("jumpSound");
const crashSound = document.getElementById("crashSound");
var points = 0;
var dificuldade = 0;
document.getElementById("pontuacaoFinal").innerHTML = points;

let gameIsOver = false; // Variável para rastrear se o jogo acabou

const jump = () => {
    if (!gameIsOver) {
        // Reproduz o som de salto
        jumpSound.currentTime = 0; // Reinicia o som para evitar sobreposição
        jumpSound.play();

        dino.classList.add('jump');
        dino.src = "./imgs/dinojump.gif";

        setTimeout(() => {
            dino.classList.remove('jump');
            dino.src = "./imgs/dinorun.gif";
        }, 600);
    }
}

const reiniciarJogo = () => {
    // Recarrega a página
    location.reload();
}

const gameOver = () => {
    // Mostrar pop-up de "Game Over"
    document.getElementById("gameOverPopup").style.display = "block";
    document.getElementById("pontuacaoFinal").textContent = points;
    gameIsOver = true; // Define o status do jogo como "Game Over"
}
const aplicarTransicao = (animationDuration, backgroundGradient) => {
    cactus.style.animationDuration = animationDuration;
    gameBoard.style.background = backgroundGradient;
};
const loop = setInterval(() => {
    
    if (dificuldade > 1000 && dificuldade <= 2000) {
        aplicarTransicao('2s', 'linear-gradient(rgb(0, 102, 255), rgb(255, 255, 255)');
        cactus.src = "./imgs/cactus3.png";
    } else if (dificuldade > 2000 && dificuldade <= 3000) {
        aplicarTransicao('2s', 'linear-gradient(rgb(0, 17, 255), rgb(255, 255, 255))');
        cactus.src = "./imgs/cactus2.png";
    } else if (dificuldade > 3000 && dificuldade <= 4000) {
        aplicarTransicao('1s', 'linear-gradient(rgb(80, 0, 178), rgb(38, 32, 25))');
        cactus.src = "./imgs/cactus3.png";
    } else if (dificuldade > 4000 && dificuldade <= 5000) {
        aplicarTransicao('1s', 'linear-gradient(rgb(0, 17, 255), rgb(255, 255, 255))');
        cactus.src = "./imgs/cactus2.png";
    }else if (dificuldade > 5000) {
        aplicarTransicao('1s', 'linear-gradient(rgb(0, 102, 255), rgb(255, 255, 255)');
        cactus.src = "./imgs/cactus3.png";
        dificuldade *=0; 
    }

    if (!gameIsOver) {
        const cactusPosition = cactus.offsetLeft;
        const dinoPosition = window.getComputedStyle(dino).bottom.replace('px', '');
        if (dinoPosition < 60 && cactusPosition <= 128 && cactusPosition > -3) {
            crashSound.currentTime = 0; // Reinicia o som para evitar sobreposição
            crashSound.play();
            cactus.style.animation = 'nome';
            cactus.style.left = `${cactusPosition}px`;
            dino.style.animation = 'nome';
            dino.style.bottom = `${dinoPosition}px`;
            setTimeout(()=>{
                dino.src = "./imgs/dinocry.gif";
            },200);
            // Para pausar a música
            backgroundMusic.pause();
            clearInterval(loop);

            // Chama a função de Game Over
            gameOver();
        } else {

            // Para reproduzir a música
            backgroundMusic.play();
            points++;
            dificuldade++;
            document.getElementById("pontuacaoFinal").innerHTML = points;
            
        }
    }
}, 10);
window.addEventListener("load", () => {
    backgroundMusic.play();
});
document.addEventListener('keydown', jump);
