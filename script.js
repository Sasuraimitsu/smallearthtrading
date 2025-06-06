document.addEventListener('DOMContentLoaded', function () {

    // --- モバイルナビゲーションのトグル ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavUl = document.querySelector('#mainNav');

    if (menuToggle && mainNavUl) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNavUl.classList.toggle('active');
        });

        mainNavUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavUl.classList.contains('active')) {
                    menuToggle.click();
                }
            });
        });
    }

    // --- ページ全体の言語切り替え処理 ---
    const langSwitchButtons = document.querySelectorAll('.lang-switch-btn');
    const allJaElements = document.querySelectorAll('.lang-ja');
    const allEnElements = document.querySelectorAll('.lang-en');
    const htmlTag = document.documentElement;

    const pageTitles = {
        ja: "貴社名 - サービス案内",
        en: "Your Company Name - Service Information"
    };

    function setLanguage(lang) {
        if (lang === 'en') {
            allJaElements.forEach(el => el.style.display = 'none');
            allEnElements.forEach(el => el.style.display = '');
            htmlTag.setAttribute('lang', 'en');
            document.title = pageTitles.en;
        } else { // デフォルトは日本語
            allJaElements.forEach(el => el.style.display = '');
            allEnElements.forEach(el => el.style.display = 'none');
            htmlTag.setAttribute('lang', 'ja');
            document.title = pageTitles.ja;
        }

        langSwitchButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        localStorage.setItem('preferredLanguage', lang);
    }

    langSwitchButtons.forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });

    const preferredLanguage = localStorage.getItem('preferredLanguage');
    setLanguage(preferredLanguage || 'ja'); // 保存された言語、なければ日本語を適用

    // --- スクロールに応じてナビゲーションのアクティブ状態を更新 ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.global-nav ul a');
    const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));

    function changeNavOnScroll() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 10;
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', changeNavOnScroll);
});
