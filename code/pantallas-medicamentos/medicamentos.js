function desplegarCrearAlarma() {
    window.open('create-medicamento.html', '_blank', 'width=600,height=400,scrollbars=yes');
}

document.addEventListener('DOMContentLoaded', function() {
    const desplegarCrearAlarmaButton = document.getElementById('añadirNuevaAlarma');

    desplegarCrearAlarmaButton.addEventListener('click', desplegarCrearAlarma);
});






function deleteAlarma(){
	window.open('../ventanas-emergentes/delete-confirmar.html', '_blank', 'width=600, height=400, scrollbars=yes');
}

document.addEventListener('DOMContentLoaded', function() {
    const desplegarDeleteButton = document.getElementById('boton-borrar');

    desplegarDeleteButton.addEventListener('click', deleteAlarma);
});






function modifyAlarma(){
	window.open('create-medicamento.html', '_blank', 'width=600, height=400, scrollbars=yes');
}

document.addEventListener('DOMContentLoaded', function(){
	const desplegarModifyButton= document.getElementById('boton-configurar');

	desplegarModifyButton.addEventListener('click', modifyAlarma);
});

