document.addEventListener("DOMContentLoaded", function () {
	const audio = document.getElementById("background-audio");
	const toggleButton = document.getElementById("audio-toggle");
	const iconOn = document.getElementById("icon-audio-on");
	const iconOff = document.getElementById("icon-audio-off");
	const form = document.getElementById("romantic-quiz");
	const feedback = document.getElementById("quiz-feedback");

	toggleButton.addEventListener("click", () => {
		audio.muted = !audio.muted;
		iconOn.classList.toggle("hidden", audio.muted);
		iconOff.classList.toggle("hidden", !audio.muted);
	});

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		feedback.classList.remove("hidden");
	});
});

// Carrossel
const imagens = document.getElementById("carousel-images");
const totalImagens = imagens.children.length;
let indexAtual = 0;

function moveCarousel(direcao) {
	indexAtual += direcao;
	if (indexAtual < 0) indexAtual = totalImagens - 1;
	if (indexAtual >= totalImagens) indexAtual = 0;
	imagens.style.transform = `translateX(-${indexAtual * 300}px)`;
}

// Autoplay do carrossel: muda de imagem a cada 3 segundos
setInterval(() => {
	moveCarousel(1);
}, 3000); // 3000 milissegundos = 3 segundos

// Quiz
const quizContainer = document.getElementById("quiz-container");
const quizResult = document.getElementById("quiz-result");

const quizData = [
	{
		pergunta: "Onde foi nosso primeiro encontro?",
		opcoes: ["No parque", "No cinema"],
		respostaCorreta: 1,
	},
	{
		pergunta: "Qual é a comida preferida dela?",
		opcoes: ["Sushi", "Pizza"],
		respostaCorreta: 0,
	},
	{
		pergunta: "Qual música marcou nosso relacionamento?",
		opcoes: ["Perfect - Ed Sheeran", "Thinking Out Loud - Ed Sheeran"],
		respostaCorreta: 0,
	},
	{
		pergunta: "Qual foi nossa primeira viagem juntos?",
		opcoes: ["Praia", "Montanha"],
		respostaCorreta: 0,
	},
	{
		pergunta: "Como se chama o nosso pet (ou futuro pet)?",
		opcoes: ["Luna", "Thor"],
		respostaCorreta: 1,
	},
];

// Contador de tempo
function atualizarContador() {
	const dataInicial = new Date(2024, 0, 27); // Mês é zero-indexado: 0 = Janeiro
	const agora = new Date();
	let diff = agora - dataInicial;

	if (diff < 0) {
		document.getElementById("contador").innerText =
			"A data 27/01/2024 ainda não chegou.";
		return;
	}

	let tempData = new Date(dataInicial.getTime());

	let anos = agora.getFullYear() - tempData.getFullYear();
	tempData.setFullYear(tempData.getFullYear() + anos);

	if (tempData > agora) {
		anos--;
		tempData.setFullYear(tempData.getFullYear() - 1);
	}

	let meses = agora.getMonth() - tempData.getMonth();
	if (meses < 0) {
		meses += 12;
		anos--;
	}
	tempData.setMonth(tempData.getMonth() + meses);

	if (tempData > agora) {
		meses--;
		tempData.setMonth(tempData.getMonth() - 1);
	}

	const segundosTotais = Math.floor(diff / 1000);
	const dias = Math.floor(segundosTotais / (3600 * 24));
	const horas = Math.floor((segundosTotais % (3600 * 24)) / 3600);
	const minutos = Math.floor((segundosTotais % 3600) / 60);
	const segundos = segundosTotais % 60;

	const textoAnos = anos === 1 ? "1 ano" : `${anos} anos`;
	const textoMeses = meses === 1 ? "1 mês" : `${meses} meses`;
	const textoDias = dias === 1 ? "1 dia" : `${dias} dias`;
	const textoHoras = horas === 1 ? "1 hora" : `${horas} horas`;
	const textoMinutos = minutos === 1 ? "1 minuto" : `${minutos} minutos`;
	const textoSegundos = segundos === 1 ? "1 segundo" : `${segundos} segundos`;

	document.getElementById(
		"mostrador-contador"
	).innerHTML = `${textoAnos}, ${textoMeses}, ${textoDias},<br> ${textoHoras}, ${textoMinutos} e ${textoSegundos}`;
}

atualizarContador(); // Chamada inicial imediata
setInterval(atualizarContador, 1000); // Atualiza a cada segundo

// Cartinhas
function revelarCarta(elemento) {
	const mensagem = elemento.nextElementSibling;
	if (mensagem && mensagem.classList.contains("hidden")) {
		mensagem.classList.remove("hidden");
		elemento.style.display = "none";
	}
}

// Jogo
const perguntasMemoria = [
	{
		pergunta: "Quem é mais provável de esquecer onde colocou o celular?",
		resposta: "Ela",
	},
	{ pergunta: "Quem faz mais piadas bobas?", resposta: "Você" },
	{ pergunta: "Quem dorme mais?", resposta: "Ela" },
	{ pergunta: "Quem diz 'te amo' primeiro?", resposta: "Você" },
	{ pergunta: "Quem planeja os passeios?", resposta: "Ela" },
];

let indexMemoria = 0;

function mostrarProximaMemoria() {
	if (indexMemoria < perguntasMemoria.length) {
		document.getElementById("pergunta-memoria").innerText =
			perguntasMemoria[indexMemoria].pergunta;
		document.getElementById("resposta-memoria").innerText = "";
	} else {
		document.getElementById("pergunta-memoria").innerText =
			"Fim do jogo! ❤️";
		document.querySelector("#memorias-jogo .opcoes").style.display = "none";
	}
}

function responderMemoria(resposta) {
	const correta = perguntasMemoria[indexMemoria].resposta;
	const resultado =
		resposta === correta ? "Acertou! 😄" : `Hmm... era ${correta}! 😉`;
	document.getElementById("resposta-memoria").innerText = resultado;
	indexMemoria++;
	setTimeout(mostrarProximaMemoria, 1500);
}

document.addEventListener("DOMContentLoaded", mostrarProximaMemoria);

// Corações
function createHeart() {
	const heart = document.createElement("div");
	heart.classList.add("heart");
	heart.textContent = "❤️";

	// Posição horizontal aleatória
	heart.style.left = Math.random() * window.innerWidth + "px";

	// Tamanho aleatório entre 15px e 30px
	const size = 15 + Math.random() * 15;
	heart.style.fontSize = size + "px";

	// Duração da animação entre 3s e 6s
	const duration = 3000 + Math.random() * 3000;
	heart.style.animationDuration = duration + "ms";

	document.body.appendChild(heart);

	// Remove o coração após a animação (quando chegar ao final)
	setTimeout(() => {
		heart.style.opacity = "0";
		setTimeout(() => heart.remove(), 1000);
	}, duration);
}

// Cria vários corações em sequência para o efeito
function startHearts() {
	const count = 30; // número de corações
	let created = 0;
	const interval = setInterval(() => {
		createHeart();
		created++;
		if (created >= count) clearInterval(interval);
	}, 200);
}

// Inicia ao carregar a página
window.addEventListener("load", () => {
	startHearts();
});
