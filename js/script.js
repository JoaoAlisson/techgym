var contLinha = 1;
var contTabela = 1;
var contFinalizados = 1;
$(document).ready(function(){ 
	//$("#nome1").tooltip();
	

	//$('#personalNome1').mask('aaaa(2)');
	$("#adicionar").click(function(){
		contLinha ++;
		contTabela++;

		var tabela =  "<div class=\"row todaTabela"+ contTabela + "\" style=\"Display:none;\">" +
							"<h3 class=\"personal\"><input class=\"inputPersonal\" placeholder=\"Personal(0)\" id=\"personalNome"+ contTabela +"\" onkeyup=\"alteraTopo("+ contTabela +")\" onfocusin=\"colocaCursor("+ contTabela +")\" onfocusout=\"tiraCursor("+ contTabela +")\"/></h3>" +
	              	  "</div> <input id=\"quantidadeAlunos" + contTabela  +"\" style=\"Display:none\" value=\"0\"/>" + 
					"<div class=\"panel panel-default\ todaTabela"+ contTabela + "\" style=\"Display:none;\">" +
							"<table class=\"table table-hover table-bordered\" id=\"tabela"+contTabela+"\">" +
						 	"<tr>"+
						 			"<th>Nome do Aluno</th>"+
						 			"<th>Início</th>"+
						 			"<th>Fim</th>"+
						 			"<th>Ação</th>"+
						 	"</tr>"+
						 	"<tr class=\"\" id=\"linha"+ contLinha +"\">"+
						 			"<td><input class=\"aluno\" id=\"nome"+ contLinha +"\" placeholder=\"nome\"  onkeyup=\"enterCampos(" + contLinha + ", " + contTabela + ")\" "+
						 			" placeholder=\"nome\" data-placement=\"top\" data-trigger=\"manual\" data-title=\"<div style='text-align: center; color: #d9534f;'><strong >Campo obrigatório</strong></div>\"data-content=\"Insira o nome do aluno.\"/></td>"+
						 			"<td id=\"MostrarInicio"+ contLinha +"\"  style=\"vertical-align: middle;\"></td><input id=\"inicio"+ contLinha +"\" disabled=\"disabled\" style=\"Display:none;\"/>"+
						 			"<td id=\"MostrarFim"+ contLinha +"\" style=\"vertical-align: middle;\"><input id=\"fim"+ contLinha +"\" disabled=\"disabled\"style=\"Display:none;\"/></td>"+
						 			"<td>"+
				  					 "<button class=\"btn btn-success fixo2\" type=\"button\" onclick=\"inicio("+ contLinha +", "+ contTabela +")\" id=\"btnIniciar"+ contLinha +"\"><span class=\"glyphicon glyphicon-plus brown\"></span></button>"+
  				  					  "<button class=\"btn btn-primary fixo2\" type=\"button\" onclick=\"fim("+ contLinha +"," + contTabela + " )\" id=\"btnFim"+ contLinha +"\" style=\"display:none\"><span class=\"glyphicon glyphicon-ok brown\"></span></button>"+
  				  					  "<button class=\"btn btn-danger remover confirm\" onclick=\"confirma("+ contLinha +", true, null)\"><span class=\"glyphicon glyphicon-remove brown\"></span></button>"+			  
						 			"</td>"	+					 			
						 	"</tr>"	+
						"</table>" +
					"</div>";
		$("#tabelas").append(tabela);
		$('html, body').animate({scrollTop: '+=230px'}, 800);
		$(".todaTabela"+contTabela).fadeIn();

		menu = "<li onclick=\"ir("+contTabela+")\"><a href=\"#\" id=\"menu"+ contTabela +"\">Personal</a></li>";
		$("#incluirMenu").append(menu);
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
						}else{
							var qtd = parseInt($("#quantidadeAlunos"+tabelaId).val());
							$("#quantidadeAlunos"+tabelaId).val(qtd-1);
							$("#personalNome"+tabelaId).attr("placeholder", "Personal("+  $("#quantidadeAlunos"+tabelaId).val() +")");						
						}	
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

		contLinha ++;
		var myDate = new Date();
		var displayDate
		if(myDate.getMinutes() <10)
			displayDate = myDate.getHours() + ':0' + myDate.getMinutes();
		else
			displayDate = myDate.getHours() + ':' + myDate.getMinutes();
		$("#inicio"+id).val(displayDate);
		$("#MostrarInicio"+id).last().append(displayDate+"h");
		$("#btnIniciar"+id).hide();
		$("#btnFim"+id).show();
		var linha = "<tr id=\"linha"+ contLinha  +"\" style=\"Display:none\">"+
							 			"<td><input class=\"aluno\" id=\"nome"+ contLinha +"\"  autofocus=\"autofocus\" placeholder=\"nome\" onkeyup=\"enterCampos(" + contLinha + ", " + contTabela + ")\" "+
							 			" placeholder=\"nome\" data-placement=\"top\" data-trigger=\"manual\" data-title=\"<div style='text-align: center; color: #d9534f;'><strong >Campo obrigatório</strong></div>\"data-content=\"Insira o nome do aluno.\"/></td>"+
							 			"<td id=\"MostrarInicio"+ contLinha +"\" style=\"vertical-align: middle;\"><input id=\"inicio"+ contLinha +"\" disabled=\"disabled\" style=\"Display:none;\" /></td>"+
							 			"<td id=\"MostrarFim"+ contLinha +"\" style=\"vertical-align: middle;\"><input id=\"fim"+ contLinha  +"\" disabled=\"disabled\" style=\"Display:none;\"/></td>"+
							 			"<td>"+					
					  					  "<button class=\"btn btn-success fixo2\" type=\"button\" onclick=\"inicio("+ contLinha +", "+ tabela +")\" id=\"btnIniciar"+ contLinha +"\"><span class=\"glyphicon glyphicon-plus brown\"></span></button>"+
	  				  					  "<button class=\"btn btn-primary fixo2\" type=\"button\" onclick=\"fim("+ contLinha  +", "+ tabela +")\" id=\"btnFim"+ contLinha  +"\" style=\"display:none\"><span class=\"glyphicon glyphicon-ok brown\"></span></button>"+
									      "<button class=\"btn btn-danger remover\" onclick=\"confirma("+ contLinha +", false, this, "+ tabela +")\"><span class=\"glyphicon glyphicon-remove brown\"></span></button>"+
							 			"</td>"+					 			
							 	"</tr>";
									 	
		$("#tabela"+tabela).last().append(linha);

		var row = $("#linha"+contLinha).closest('tr');
	    row.insertBefore("#tabela"+ tabela +" .finalizados");

		$("#linha"+contLinha).fadeIn();
		$('html, body').animate({scrollTop: '+=120px'}, 800);
		$("#nome"+contLinha).focus();
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
		$("#menu"+idTabela).html("Personal("+idTabela+")");
	}else{	
		//pega quantos caracteres tem antes do "("
		/*	
			digitado = $("#personalNome"+idTabela).val().split("(");
			digitado = digitado[0];
			digitado = digitado.length;	
			digitado;
			$("#personalNome"+idTabela).selectRange(digitado); */

		$("#menu"+idTabela).html($("#personalNome"+idTabela).val().substr(0,8));
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
	if($("#personalNome"+id).val() != "")
		$("#personalNome"+id).val($("#personalNome"+id).val() + "("  + $("#quantidadeAlunos"+id).val() + ")");
	else{
		$("#personalNome"+id).attr("placeholder", "Personal("+ parseInt($("#quantidadeAlunos"+id).val())+")");
	}
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