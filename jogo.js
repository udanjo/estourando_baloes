var timeId = null; // variavel que armazena a chamada da função timeout

function IniciaJogo(){
	
	//alert('jogo iniciado');
	//PEgando a url
	var url = window.location.search;

	//Retirando o ? que vem junto na URL
	 var nivel_jogo = url.replace("?", "");
	
	 var tempo_segundos = 0;

	 // 1 Fácil -> 120 segundos
	 if (nivel_jogo == 1){
	 	tempo_segundos = 120;
	 }
	// 2 Normal -> 60 segundos
	if (nivel_jogo == 2){
		tempo_segundos = 60;
	}
	// 3 Dificil -> 30 segundos
	if (nivel_jogo == 3){
		tempo_segundos = 30;
	}

	 //Inserindo segundos
	 document.getElementById('cronometro').innerHTML = tempo_segundos;

	 // quantidade de balões
	 var qtde_baloes = 80;

	 cria_baloes(qtde_baloes);

	 //Quantidade de Balões inteiros
	 document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	 //Quantidade de Balões estourados
	 document.getElementById('baloes_estourados').innerHTML = 0;

	 // Setando o cronometro
	 contagem_tempo(tempo_segundos + 1);

}

function contagem_tempo(segundos){

	if (segundos == 0){
		clearTimeout(timeId);//para a execução da função do settimeout
		game_over();
		return false;
	}

	segundos = segundos - 1;

	document.getElementById('cronometro').innerHTML = segundos;

	timeId = setTimeout("contagem_tempo("+segundos+")", 1000);

}

function game_over(){
	remove_eventos_baloes();
	alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo!');
}

function cria_baloes(qtde_baloes){

	for (var i = 1; i <= qtde_baloes; i++) {
		
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b'+ i;
		balao.onclick = function(){estourar(this);}

		document.getElementById('cenario').appendChild(balao);


	}

}

function estourar(e){
	
	var id_balao = e.id;

	document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";

	pontuacao(-1);

	//document.getElementById(id_balao).setAttibute("onclick", "");
	document.getElementById(id_balao).onclick = '';

	
}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
	
	if(baloes_inteiros == 0){
		alert('Parabéns, você conseguiu estourar todos os balões a tempo!');
		parar_jogo();
	}

}

function parar_jogo(){
	clearTimeout(timeId);
}

function remove_eventos_baloes(){
	var i = 1;//contador

	while(document.getElementById('b'+i)){
		//retira o evento click
		document.getElementById('b'+i).onclick = '';
		i++;// faz o inclemento
	}
}

function recomeco(){
	 window.location.href = 'index.html';
	
}