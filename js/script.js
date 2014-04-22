var contLinha = 1;
var contTabela = 1;
var contFinalizados = 1;
 
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    // device APIs are available
    //
    function onDeviceReady() {
        // Now safe to use device APIs
    }

$(document).ready(function(){ 

	$(window).bind('beforeunload', function(){
		return 'Ao sair do programa todos os dados são perdidos';
	});

	//$("#nome1").tooltip();
	$("#inicial").hide();
	$("#inicial").fadeIn();
	  setTimeout(function(){
		 	//alert("teste");
	     	//$(window.document.location).attr('href', './acomanhamento.html');
	     	//$("#bodi").load("./acomanhamento.html");
	     	$.when($("#inicial").fadeOut()).done( function() {
	     		$("#limpa").remove();
	     		$('body').css('background', '#fff');
	   		  	$("#pagina").fadeIn();
	     	});

	}, 4000);

	$("#mudarInstrutor").click(function(){
		
		$("#alertaNome").slideUp(400);
		$("#alertaInstrutor").slideUp(400);

		if($("#selecionarAluno").val() == null || $("#selecionarInstrutor").val() == null){

			if($("#selecionarInstrutor").val() == null){
				$("#alertaInstrutor").slideDown(400);
				$("#selecionarInstrutor").focus();
			}

			if($("#selecionarAluno").val() == null){
				$("#alertaNome").slideDown(400);
				$("#selecionarAluno").focus();
			}

		}else{
			//alert($("#selecionarAluno").val());
			idLinha = $("#selecionarAluno").val();
			tabela = $("#selecionarInstrutor").val();
			nome = $("#nome"+$("#selecionarAluno").val()).val();
			horaInicial = $("#horaInicio"+$("#selecionarAluno").val()).val();
			mostraIninial = $("#MostrarInicio"+$("#selecionarAluno").val()).html();

			var linha = "<tr id=\"linha"+ idLinha  +"\" style=\"Display:none\">"+
								 			"<td><input class=\"aluno\" id=\"nome"+ idLinha +"\"  autofocus=\"autofocus\" placeholder=\"nome\" onkeyup=\"enterCampos(" + idLinha + ", " + tabela + ")\" value=\"" + nome + "\""+
								 			" placeholder=\"nome\" data-placement=\"top\" data-trigger=\"manual\" data-title=\"<div style='text-align: center; color: #d9534f;'><strong >Campo obrigatório</strong></div>\"data-content=\"Insira o nome do aluno.\"/></td>"+
								 			"<td id=\"MostrarInicio"+ idLinha +"\" style=\"vertical-align: middle;\"><input id=\"inicio"+ idLinha +"\" disabled=\"disabled\" style=\"Display:none;\" value=\"" + horaInicial + "\"/>"+ mostraIninial +"</td>"+
								 			"<td id=\"MostrarFim"+ idLinha +"\" style=\"vertical-align: middle;\"><input id=\"fim"+ idLinha  +"\" disabled=\"disabled\" style=\"Display:none;\"/></td>"+
								 			"<td>"+					
						  					  "<button class=\"btn btn-success fixo2\" type=\"button\" onclick=\"inicio("+ idLinha +", "+ tabela +")\" id=\"btnIniciar"+ idLinha +"\" style=\"display:none\"><span class=\"glyphicon glyphicon-plus brown\"></span></button>"+
		  				  					  "<button class=\"btn btn-primary fixo2\" type=\"button\" onclick=\"fim("+ idLinha  +", "+ tabela +")\" id=\"btnFim"+ idLinha  +"\" ><span class=\"glyphicon glyphicon-ok brown\"></span></button>"+
										      "<button class=\"btn btn-danger remover\" onclick=\"confirma("+ idLinha +", false, this, "+ tabela +")\" id=\"excluir" + idLinha + "\"><span class=\"glyphicon glyphicon-remove brown\"></span></button>"+
								 			"</td>"+					 			
								 	"</tr>";

			$("#myModal").modal('toggle');							 	
			$.when($("#linha"+$("#selecionarAluno").val()).fadeOut()).done( function() {
					$("#linha"+$("#selecionarAluno").val()).remove();
					$("#tabela"+$("#selecionarInstrutor").val()).last().append(linha);

					$("#nome"+$("#selecionarAluno").val()).val(nome);
					var row = $("#linha"+ $("#selecionarAluno").val()).closest('tr');
					row.insertBefore("#tabela"+ $("#selecionarInstrutor").val() +" .vazio");
					$("#linha"+$("#selecionarAluno").val()).fadeIn();


				antigaTabela = $("#modalTabela").val();
					if($("#personalNome"+antigaTabela).val() != ""){
						var qtd = parseInt($("#quantidadeAlunos"+antigaTabela).val());
						$("#quantidadeAlunos"+antigaTabela).val(qtd-1);
						val = $("#personalNome"+antigaTabela).val().split("(");
						$("#personalNome"+antigaTabela).val(val[0] + "(" + $("#quantidadeAlunos"+antigaTabela).val() + ")");

						nomeInstrutor = $("#menu"+antigaTabela).html().split("(");
						nomeInstrutor = nomeInstrutor[0];
						nomeInstrutor = nomeInstrutor + "(" + $("#quantidadeAlunos"+ antigaTabela).val() +")";
						$("#menu"+antigaTabela).html(nomeInstrutor);	

					}else{
						var qtd = parseInt($("#quantidadeAlunos"+antigaTabela).val());
						$("#quantidadeAlunos"+antigaTabela).val(qtd-1);
						$("#personalNome"+antigaTabela).attr("placeholder", "Personal("+  $("#quantidadeAlunos"+antigaTabela).val() +")");
						$("#menu"+antigaTabela).html("Personal("+  $("#quantidadeAlunos"+antigaTabela).val() +")");						
					}

					if($("#personalNome"+tabela).val() != ""){
						var qtd = parseInt($("#quantidadeAlunos"+tabela).val());
						$("#quantidadeAlunos"+tabela).val(qtd+1);
						val = $("#personalNome"+tabela).val().split("(");
						$("#personalNome"+tabela).val(val[0] + "(" + $("#quantidadeAlunos"+tabela).val() + ")");

						nomeInstrutor = $("#menu"+tabela).html().split("(");
						nomeInstrutor = nomeInstrutor[0];
						nomeInstrutor = nomeInstrutor + "(" + $("#quantidadeAlunos"+ tabela).val() +")";
						$("#menu"+tabela).html(nomeInstrutor);	

					}else{
						var qtd = parseInt($("#quantidadeAlunos"+tabela).val());
						$("#quantidadeAlunos"+tabela).val(qtd+1);
						$("#personalNome"+tabela).attr("placeholder", "Personal("+  $("#quantidadeAlunos"+tabela).val() +")");
						$("#menu"+tabela).html("Personal("+  $("#quantidadeAlunos"+tabela).val() +")");						
					}			
					abilitaTroca(antigaTabela);
					abilitaTroca(tabela);	  
				});  
			}
	});

	$("#adicionar").click(function(){
		contLinha ++;
		contTabela++;

		var tabela =  "<div class=\"row todaTabela"+ contTabela + "\" style=\"Display:none; margin-bottom:0px;\">" +
							"<div class=\"col-xs-10 col-sm-4 col-md-3\">" +
								"<h3 class=\"personal\"><input class=\"inputPersonal\" placeholder=\"Personal(0)\" id=\"personalNome"+ contTabela +"\" onkeyup=\"alteraTopo("+ contTabela +")\" onfocusin=\"colocaCursor("+ contTabela +")\" onfocusout=\"tiraCursor("+ contTabela +")\"/></h3>" +
	              	 		"</div>" +
              	 			"<div class=\"col-xs-1 col-sm-1 col-md-1\">" +
								"<button class=\"btn btn-info trocarPersonal\" disabled=\"disabled\" onclick=\"modal("+ contTabela +")\" id=\"trocar"+ contTabela +"\"><span class=\"glyphicon glyphicon-retweet brown\"></span></button>" +
							"</div>" +
	              	  "</div>" +
	              	  "<input id=\"quantidadeAlunos" + contTabela  +"\" style=\"Display:none\" value=\"0\"/>" + 
	              	"<div  class=\"panel\">" +
					"<div class=\"panel panel-default\ todaTabela"+ contTabela + "\" style=\"Display:none;\">" +
							"<table class=\"table table-hover table-bordered\" id=\"tabela"+contTabela+"\">" +
						 	"<tr>"+
						 			"<th>Nome do Aluno</th>"+
						 			"<th>Início</th>"+
						 			"<th>Fim</th>"+
						 			"<th>Ação</th>"+
						 	"</tr>"+
						 	"<tr class=\"vazio\" id=\"linha"+ contLinha +"\">"+
						 			"<td><input class=\"aluno\" id=\"nome"+ contLinha +"\" placeholder=\"nome\"  onkeyup=\"enterCampos(" + contLinha + ", " + contTabela + ")\" "+
						 			" placeholder=\"nome\" data-placement=\"top\" data-trigger=\"manual\" data-title=\"<div style='text-align: center; color: #d9534f;'><strong >Campo obrigatório</strong></div>\"data-content=\"Insira o nome do aluno.\"/></td>"+
						 			"<td id=\"MostrarInicio"+ contLinha +"\"  style=\"vertical-align: middle;\"></td><input id=\"inicio"+ contLinha +"\" disabled=\"disabled\" style=\"Display:none;\"/>"+
						 			"<td id=\"MostrarFim"+ contLinha +"\" style=\"vertical-align: middle;\"><input id=\"fim"+ contLinha +"\" disabled=\"disabled\"style=\"Display:none;\"/></td>"+
						 			"<td>"+
				  					 "<button class=\"btn btn-success fixo2\" type=\"button\" onclick=\"inicio("+ contLinha +", "+ contTabela +")\" id=\"btnIniciar"+ contLinha +"\"><span class=\"glyphicon glyphicon-plus brown\"></span></button>"+
  				  					  "<button class=\"btn btn-primary fixo2\" type=\"button\" onclick=\"fim("+ contLinha +"," + contTabela + " )\" id=\"btnFim"+ contLinha +"\" style=\"display:none\"><span class=\"glyphicon glyphicon-ok brown\"></span></button>"+
  				  					  "<button class=\"btn btn-danger remover confirm\" onclick=\"confirma("+ contLinha +", false, this, "+ contTabela +")\" id=\"excluir" + contLinha + "\"><span class=\"glyphicon glyphicon-remove brown\"></span></button>"+			  
						 			"</td>"	+					 			
						 	"</tr>"	+
						"</table>" +
					  "</div>"+
					"</div>";
		$("#tabelas").append(tabela);
		$('html, body').animate({scrollTop: '+=230px'}, 800);
		$(".todaTabela"+contTabela).fadeIn();

		menu = "<li onclick=\"ir("+contTabela+")\"><a href=\"#\" id=\"menu"+ contTabela +"\">Personal(0)</a></li>";
		$("#incluirMenu").append(menu);

		contador=1;
		for(contador=1; contador<=contTabela; contador++){
			abilitaTroca(contador);
		}	
	});
});

function confirma(id, primeiro, handler, tabelaId){
	if($("#btnIniciar"+id).css('display') == "none"){
		var tr = $(handler).closest('tr');
		$.confirm({
		    text: "Deseja <strong style='color:#f81713;'>EXCLUIR</strong> o aluno <strong>"+$("#nome"+id).val()+"</strong>?",
		    title: "Confirmação",
		    confirm: function(button) {
	     		
					$.when($("#linha"+id).fadeOut()).done( function() {
						tr.remove();
						if($("#personalNome"+tabelaId).val() != ""){
							var qtd = parseInt($("#quantidadeAlunos"+tabelaId).val());
							$("#quantidadeAlunos"+tabelaId).val(qtd-1);
							val = $("#personalNome"+tabelaId).val().split("(");
							$("#personalNome"+tabelaId).val(val[0] + "(" + $("#quantidadeAlunos"+tabelaId).val() + ")");

							nomeInstrutor = $("#menu"+tabelaId).html().split("(");
							nomeInstrutor = nomeInstrutor[0];
							nomeInstrutor = nomeInstrutor + "(" + $("#quantidadeAlunos"+ tabelaId).val() +")";
							$("#menu"+tabelaId).html(nomeInstrutor);	

						}else{
							var qtd = parseInt($("#quantidadeAlunos"+tabelaId).val());
							$("#quantidadeAlunos"+tabelaId).val(qtd-1);
							$("#personalNome"+tabelaId).attr("placeholder", "Personal("+  $("#quantidadeAlunos"+tabelaId).val() +")");
							$("#menu"+tabelaId).html("Personal("+  $("#quantidadeAlunos"+tabelaId).val() +")");						
						}	
						abilitaTroca(tabelaId);
					});
		    },
		    cancel: function(button) {
		        
		    },
		    confirmButton: "Sim",
		    cancelButton: "Não",
		    post: true
		});
	}
}

function inicio(id, tabela){
	if($("#nome"+id).val() == ""){
		$("#nome"+id).popover('show');
		$("#nome"+id).focus();
		setTimeout(function(){
      		 $("#nome"+id).popover('hide');
   		 }, 4000);
		$("#nome"+id).keyup(function() {
			$("#nome"+id).popover('hide');
		});

	}else{

		if($("#personalNome"+tabela).val() != ""){
			var qtd = parseInt($("#quantidadeAlunos"+tabela).val());
			$("#quantidadeAlunos"+tabela).val(qtd+1);
			val = $("#personalNome"+tabela).val().split("(");
			$("#personalNome"+tabela).val(val[0] + "(" + $("#quantidadeAlunos"+tabela).val() + ")");
		}else{
			var qtd = parseInt($("#quantidadeAlunos"+tabela).val());
			$("#quantidadeAlunos"+tabela).val(qtd+1);
			$("#personalNome"+tabela).attr("placeholder", "Personal("+  $("#quantidadeAlunos"+tabela).val() +")");
		}

		$("#nome"+id).focusout();
		$("#linha"+id).removeClass("vazio");
		contLinha++;
		var myDate = new Date();
		var displayDate;
		if(myDate.getMinutes() <10)
			displayDate = myDate.getHours() + ':0' + myDate.getMinutes();
		else
			displayDate = myDate.getHours() + ':' + myDate.getMinutes();
		$("#inicio"+id).val(displayDate);
		$("#MostrarInicio"+id).last().append(displayDate+"h");
		$("#btnIniciar"+id).hide();
		$("#btnFim"+id).show();
		var linha = "<tr class=\"vazio\" id=\"linha"+ contLinha  +"\" style=\"Display:none\">"+
							 			"<td><input class=\"aluno\" id=\"nome"+ contLinha +"\"  autofocus=\"autofocus\" placeholder=\"nome\" onkeyup=\"enterCampos(" + contLinha + ", " + tabela + ")\" "+
							 			" placeholder=\"nome\" data-placement=\"top\" data-trigger=\"manual\" data-title=\"<div style='text-align: center; color: #d9534f;'><strong >Campo obrigatório</strong></div>\"data-content=\"Insira o nome do aluno.\"/></td>"+
							 			"<td id=\"MostrarInicio"+ contLinha +"\" style=\"vertical-align: middle;\"><input id=\"inicio"+ contLinha +"\" disabled=\"disabled\" style=\"Display:none;\" /></td>"+
							 			"<td id=\"MostrarFim"+ contLinha +"\" style=\"vertical-align: middle;\"><input id=\"fim"+ contLinha  +"\" disabled=\"disabled\" style=\"Display:none;\"/></td>"+
							 			"<td>"+					
					  					  "<button class=\"btn btn-success fixo2\" type=\"button\" onclick=\"inicio("+ contLinha +", "+ tabela +")\" id=\"btnIniciar"+ contLinha +"\"><span class=\"glyphicon glyphicon-plus brown\"></span></button>"+
	  				  					  "<button class=\"btn btn-primary fixo2\" type=\"button\" onclick=\"fim("+ contLinha  +", "+ tabela +")\" id=\"btnFim"+ contLinha  +"\" style=\"display:none\"><span class=\"glyphicon glyphicon-ok brown\"></span></button>"+
									      "<button class=\"btn btn-danger remover\" onclick=\"confirma("+ contLinha +", false, this, "+ tabela +")\" id=\"excluir" + contLinha + "\"><span class=\"glyphicon glyphicon-remove brown\"></span></button>"+
							 			"</td>"+					 			
							 	"</tr>";
									 	
		$("#tabela"+tabela).last().append(linha);

		var row = $("#linha"+contLinha).closest('tr');
	    row.insertBefore("#tabela"+ tabela +" .finalizados");

		$("#linha"+contLinha).fadeIn();
		$('html, body').animate({scrollTop: '+=120px'}, 800);
		$("#nome"+contLinha).focus();

		nomeInstrutor = $("#menu"+tabela).html().split("(");
		nomeInstrutor = nomeInstrutor[0];
		nomeInstrutor = nomeInstrutor + "(" + $("#quantidadeAlunos"+ tabela).val() +")";
		$("#menu"+tabela).html(nomeInstrutor);	
		abilitaTroca(tabela);
	}
}

function fim(id, tabela){

	$.confirm({
	    text: "Deseja <strong style='color:#3276b1;'>finalizar</strong> o treino do aluno <strong>"+$("#nome"+id).val()+"<strong>?",
	    title: "Confirmação",
	    confirm: function(button) {   	

			var myDate = new Date();
			var displayDate;
			if(myDate.getMinutes()<10)
				displayDate = myDate.getHours() + ':0' + myDate.getMinutes();
			else
				displayDate = myDate.getHours() + ':' + myDate.getMinutes();

			$("#fim"+id).val(displayDate);
			$("#MostrarFim"+id).html(displayDate+"h");
			Tfim = $("#inicio"+id).val().split(':');
			tempo = myDate.getHours() - Tfim[0];

			horaFinal = myDate.getHours();
			minutoFinal = myDate.getMinutes();
			horaInicio =  Tfim[0];
			minutoInicio = Tfim[1];

			horasEmMinutos = (horaFinal - horaInicio)*60;
			minutosTotal = horasEmMinutos;
			minutosTotal = minutosTotal - minutoInicio + minutoFinal;

			//alert(minutosTotal);

			$("#btnFim"+id).attr("disabled","disabled");
			if(minutosTotal > 70)
				$("#linha"+id).attr("class", "danger finalizados");
			else
				$("#linha"+id).attr("class","success finalizados");
			$("#nome"+id).attr("disabled","disabled");
			$.when($("#linha"+id).delay(800).fadeOut()).done( function() {
				var row = $("#linha"+id).closest('tr');
			    row.insertAfter("#tabela"+ tabela +" tbody>tr:last");
			    $("#linha"+id).fadeIn();
			});	       	


			if($("#personalNome"+tabela).val() != ""){
				var qtd = parseInt($("#quantidadeAlunos"+tabela).val());
				$("#quantidadeAlunos"+tabela).val(qtd-1);
				val = $("#personalNome"+tabela).val().split("(");
				$("#personalNome"+tabela).val(val[0] + "(" + $("#quantidadeAlunos"+tabela).val() + ")");

				nomeInstrutor = $("#menu"+tabela).html().split("(");
				nomeInstrutor = nomeInstrutor[0];
				nomeInstrutor = nomeInstrutor + "(" + $("#quantidadeAlunos"+ tabela).val() +")";
				$("#menu"+tabela).html(nomeInstrutor);	

			}else{
				var qtd = parseInt($("#quantidadeAlunos"+tabela).val());
				$("#quantidadeAlunos"+tabela).val(qtd-1);
				$("#personalNome"+tabela).attr("placeholder", "Personal("+  $("#quantidadeAlunos"+tabela).val() +")");
				$("#menu"+tabela).html("Personal("+  $("#quantidadeAlunos"+tabela).val() +")");						
			}
			abilitaTroca(tabela);
	    },
	    cancel: function(button) {
	        
	    },
	    confirmButton: "Sim",
	    cancelButton: "Não",
	    post: true
	});
}

function enterCampos(id, idTabela){
	if(event.which == 13){
		if($("#btnIniciar"+id).is(':visible'))
        	inicio(id, idTabela);
    }    
}

function alteraTopo(idTabela){

	if($("#personalNome"+idTabela).val() == ""){
		$("#menu"+idTabela).html("Personal("+$("#quantidadeAlunos"+idTabela).val()+")");
	}else{	
		//pega quantos caracteres tem antes do "("
		/*	
			digitado = $("#personalNome"+idTabela).val().split("(");
			digitado = digitado[0];
			digitado = digitado.length;	
			digitado;
			$("#personalNome"+idTabela).selectRange(digitado);  
		*/

		$("#personalNome"+idTabela).val($("#personalNome"+idTabela).val().replace(/\(/g,"").replace(/\)/g,""));
		$("#menu"+idTabela).html($("#personalNome"+idTabela).val().substr(0,8).replace(/\(/g,"").replace(/\)/g,"") + "(" + $("#quantidadeAlunos"+idTabela).val() + ")");
	}
}

function ir(idTabela){

	$('.navbar-collapse').collapse('hide');
	$('html, body').animate({
   		 scrollTop: $("#personalNome"+idTabela).offset().top - 100
	}, 800);
}

function colocaCursor(id){
	if($("#personalNome"+id).val() != ""){
			val = $("#personalNome"+id).val().split("(");
			$("#personalNome"+id).val(val[0]);	
	}
}

function tiraCursor(id){
	//alert($("#quantidadeAlunos"+id).val());
	if($("#personalNome"+id).val() != ""){
		$("#personalNome"+id).val($("#personalNome"+id).val().replace(/\(/g,"") + "("  + $("#quantidadeAlunos"+id).val() + ")");
	}else{
		$("#personalNome"+id).attr("placeholder", "Personal("+ parseInt($("#quantidadeAlunos"+id).val())+")");
	}
}

function modal(tabela){
		$("#alertaNome").hide();
		$("#alertaInstrutor").hide();
	var table = $('#tabela'+tabela);
	$("#modalTabela").val(tabela);

	opcoes = "<option value=\"\" disabled=\"disabled\" selected=\"selected\">Selecione o Aluno</option>";
	table.find('tr').each(function(i){
	 	id = this.id.split("a");
		id = id[1];
		if($("#btnFim"+id).is(':visible') && $("#btnFim"+id).attr("disabled") != "disabled"){
			if($("#nome"+id).val() == "")
				opcoes = opcoes + "<option value=\"" + id + "\">" + $("#nome"+id).attr("placeholder").toUpperCase() + "</option>";	
			else
				opcoes = opcoes + "<option value=\"" + id + "\">" + $("#nome"+id).val().toUpperCase() + "</option>";
		}
	});

	instrutores = "<option value=\"\" disabled=\"disabled\" selected=\"selected\">Selecione o Instrutor</option>";
	
	for(cont=1; cont <= contTabela; cont++){
		if(cont != tabela){
			if($("#personalNome"+cont).val() == "")
				instrutores = instrutores + "<option value=\"" + cont + "\">" + $("#personalNome"+cont).attr("placeholder") + "</option>";
			else
				instrutores = instrutores + "<option value=\"" + cont + "\">" + $("#personalNome"+cont).val() + "</option>";
		}	
	}

	$("#selecionarAluno").html(opcoes);
	$("#selecionarInstrutor").html(instrutores);
	$("#myModal").modal();
}

function abilitaTroca(idTab){
	cont = 0;
	var table = $('#tabela'+idTab);

	table.find('tr').each(function(i){
	 	id = this.id.split("a");
		id = id[1];
		if($("#btnFim"+id).is(':visible') && $("#btnFim"+id).attr("disabled") != "disabled")
			cont++;
	});
	if(cont > 0 && contTabela > 1)
		$("#trocar"+idTab).prop("disabled", false);
	else
		$("#trocar"+idTab).prop("disabled", true);
}

$.fn.selectRange = function(start, end) {
    if(!end) end = start; 
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};