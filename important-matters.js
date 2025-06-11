document.addEventListener('DOMContentLoaded', function () {

    // --- ページ全体の言語切り替え処理 ---
    const langSwitchButtons = document.querySelectorAll('.lang-switch-btn');
    const allJaElements = document.querySelectorAll('.lang-ja');
    const allEnElements = document.querySelectorAll('.lang-en');
    const htmlTag = document.documentElement;

    const pageTitles = {
        ja: "重要事項説明 - SMALL EARTH TRADING Co.,ltd",
        en: "Important Disclosures - SMALL EARTH TRADING Co.,ltd"
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

    // ユーザーの言語設定を読み込む（トップページなどと共通）
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    setLanguage(preferredLanguage || 'ja');

});
