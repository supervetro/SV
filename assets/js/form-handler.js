/**
 * --- LÓGICA DE FORMULÁRIO E MODAL ---
 * Gerencia o comportamento do modal de orçamento e envio via mailto
 */

/** Abre o modal evitando pular pro topo */
function openModal(e) {
    if (e) e.preventDefault();
    document.getElementById('projectModal').classList.add('active');
    // Interrompe scroll por trás do modal
    if(window.lenis) window.lenis.stop(); 
}

/** Fecha o modal */
function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
    if(window.lenis) window.lenis.start();
}

/** Atualiza o nome do arquivo selecionado na UI */
function updateFileName(input) {
    const display = document.getElementById('fileNameDisplay');
    if (input.files && input.files.length > 0) {
        display.textContent = input.files[0].name;
    } else {
        display.textContent = "";
    }
}

/** Gerencia o envio do formulário */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;
    const hasFile = document.getElementById('arquivo').files.length > 0;

    const subject = encodeURIComponent("Novo Projeto para Análise - " + nome);
    let bodyText = `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}\n\n`;
    
    if (hasFile) {
        bodyText += "=========================================\n";
        bodyText += "ATENÇÃO: Este cliente informou que possui um projeto.\n";
        bodyText += "POR FAVOR, SOLICITE O ARQUIVO COMPLETANDO ESTA CONVERSA.\n";
        bodyText += "=========================================\n";
        alert("O seu aplicativo de e-mail será aberto. Pela segurança do navegador, você precisará anexar o arquivo manualmente no seu e-mail.");
    }

    const body = encodeURIComponent(bodyText);
    window.location.href = `mailto:supervetro.ssa@gmail.com?subject=${subject}&body=${body}`;
    
    closeModal();
    document.getElementById('projectForm').reset();
    document.getElementById('fileNameDisplay').textContent = '';
}
