const panel = document.querySelector('.footer');
window.addEventListener('mousemove', (event) => {
    const mouseY = event.clientY;
    if (mouseY >= window.innerHeight - 80 && window.innerWidth > 800) {
        panel.classList.add('show');
    } else {
        panel.classList.remove('show');
    }
});

