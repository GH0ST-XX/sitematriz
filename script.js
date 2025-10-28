document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Controle da Barra de Navegação (Navbar) ---
    // Muda a cor da navbar ao rolar a página
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Controle do Modal de Doação (Pop-up) ---
    const modal = document.getElementById('donation-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    
    // Pega TODOS os botões que abrem o modal
    const openModalButtons = document.querySelectorAll('#open-modal-btn, #open-modal-btn-hero, #open-modal-btn-cta');

    // Adiciona o evento de abrir em cada botão
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    });

    // Evento para fechar no 'X'
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Evento para fechar clicando fora do modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // --- 3. Animação de Fade-in-Up ao Rolar (Intersection Observer) ---
    // Seleciona todos os elementos que devem ter a animação
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Quando o elemento entra na tela
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Para a animação não repetir
            }
        });
    }, { 
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    });

    // Observa cada elemento
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- 4. Função para Copiar PIX para a Área de Transferência ---
    const copyPixBtn = document.getElementById('copy-pix-btn');
    if (copyPixBtn) {
        copyPixBtn.addEventListener('click', () => {
            const pixInput = document.getElementById('pix-key');
            
            // Seleciona o texto no input
            pixInput.select();
            pixInput.setSelectionRange(0, 99999); // Para mobile

            try {
                // Tenta copiar o texto
                navigator.clipboard.writeText(pixInput.value);
                
                // Feedback visual para o usuário
                const originalText = copyPixBtn.innerHTML;
                copyPixBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                
                setTimeout(() => {
                    copyPixBtn.innerHTML = originalText;
                }, 2000); // Volta ao texto original após 2 segundos

            } catch (err) {
                console.error('Erro ao copiar: ', err);
                alert('Não foi possível copiar o texto.');
            }
        });
    }

}); // Fim do DOMContentLoaded