document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('#navbarNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');

            // ハンバーガーアイコンのアニメーション（X印への変化など）
            const bars = menuToggle.querySelectorAll('.bar');
            if (!isExpanded) { // メニューを開くとき
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else { // メニューを閉じるとき
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // メニュー項目クリックでメニューを閉じる（シングルページナビゲーションの場合）
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    menuToggle.click(); // ハンバーガーボタンのクリックイベントを発火させて閉じる
                }
            });
        });
    }
});
