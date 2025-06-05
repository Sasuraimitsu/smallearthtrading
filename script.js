document.addEventListener('DOMContentLoaded', function () {
    // モバイルナビゲーションのトグル
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('#mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');

            // ハンバーガーアイコンのアニメーション (X印など)
            const bars = menuToggle.querySelectorAll('.bar');
            if (mainNav.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-4px, 4px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // ナビリンククリックでメニューを閉じる
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    menuToggle.click(); // ハンバーガーボタンのクリックイベントを発火
                }
            });
        });
    }

    // FAQ言語切り替え
    const langToggleButtons = document.querySelectorAll('.lang-btn');
    const faqItemsJa = document.querySelectorAll('.faq-item.lang-ja');
    const faqItemsEn = document.querySelectorAll('.faq-item.lang-en');

    langToggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.dataset.lang;

            // ボタンのアクティブ状態を更新
            langToggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (lang === 'ja') {
                faqItemsJa.forEach(item => item.style.display = 'block');
                faqItemsEn.forEach(item => item.style.display = 'none');
            } else if (lang === 'en') {
                faqItemsJa.forEach(item => item.style.display = 'none');
                faqItemsEn.forEach(item => item.style.display = 'block');
            }
        });
    });

    // スクロールに応じてナビゲーションのアクティブ状態を更新 (オプション)
    const sections = document.querySelectorAll('main section[id]');
    const navLi = document.querySelectorAll('.global-nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - (var(--header-height) + 50); // ヘッダーの高さを考慮 + 少しオフセット
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
         // Request Formボタンは常にアクティブにはしない
        const requestFormNavButton = document.querySelector('.global-nav a.nav-button');
        if (requestFormNavButton && current === 'request-form') {
            // 何もしないか、特別なスタイルが必要ならここに追加
        } else if (requestFormNavButton) {
            // requestFormNavButton.classList.remove('active'); // 通常のリンクと同じように扱うなら必要
        }
    });
});
