document.addEventListener('click', (event) => {
    const button = event.target.closest('.wp-block-myplugin-alert-box .alert-close');

    if (button) {
        button.closest('.wp-block-myplugin-alert-box').style.display = 'none';
    }
});
