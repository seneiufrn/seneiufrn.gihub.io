var url = 'https://spreadsheets.google.com/feeds/list/1_1-Kmw1H85Oz3lSwsyiUHRxu1xQighBpZFbH2Hh1Z1E/1/public/full?alt=json';

function verificarCertificado() {	
	var codigo = $('#codigo').val();	
	
	$.getJSON(url,function(result){
		var dados = result.feed.entry;
		var valido = false;
		var nome;
		var cpfFormatado;
		for(var i=0; i<dados.length; i++) {
			var codigoNaLista = dados[i].gsx$codigo.$t;			
			if(codigoNaLista.toUpperCase() === codigo.toUpperCase()) {
				nome = dados[i].gsx$nome.$t;
				cpfFormatado = dados[i].gsx$cpf.$t;
				valido = true;
				break;
			}
		}
		if(valido) {
			var mensagem = 'CERTIFICADO VÁLIDO PARA '.concat(nome).concat(' CPF Nº ').concat(cpfFormatado);
			alert(mensagem);
		} else {
			alert('CÓDIGO DE VERIFICAÇÃO NÃO IDENTIFICADO');
		}
	});
}

function gerarCertificado(mainPage) {	
	var cpf = $('#cpf').val();	
	
	$.getJSON(url,function(result){
		var dados = result.feed.entry;
		var valido = false;
		for(var i=0; i<dados.length; i++) {
			var cpfNaLista = dados[i].gsx$cpfnumeros.$t;			
			if(cpfNaLista === cpf) {
				valido = true;
				break;
			}
		}
		if(valido) {
			var linkCertificado = '<a target="_blank" class="btn btn-primary btn-learn" href="****/####.pdf">BAIXAR CERTIFICADO</a>';
			if(mainPage) {
				linkCertificado = linkCertificado.replace('****','certificados/files');
			} else {
				linkCertificado = linkCertificado.replace('****','files');
			}			
			linkCertificado = linkCertificado.replace('####',cpf);
			$('#divLinkCertificado').html(linkCertificado);			
		} else {
			alert('CPF INVÁLIDO OU PARTICIPANTE NÃO ATENDE AOS REQUISITOS PARA RECEBER O CERTIFICADO');
		}
	});
}

