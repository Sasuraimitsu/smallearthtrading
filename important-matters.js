document.addEventListener('DOMContentLoaded', function () {
    // 言語切り替えボタン
    const langSwitchButtons = document.querySelectorAll('.lang-switch-btn');
    // 日本語コンテンツ
    const allJaElements = document.querySelectorAll('.lang-ja');
    // 英語コンテンツ
    const allEnElements = document.querySelectorAll('.lang-en');
    // HTMLタグ（lang属性設定用）
    const htmlTag = document.documentElement;

    // ページタイトル定義
    const pageTitles = {
        ja: "重要事項説明 - SMALL EARTH TRADING Co.,ltd",
        en: "Important Disclosures - SMALL EARTH TRADING Co.,ltd"
    };

    /**
     * ページ表示言語を設定する関数
     * @param {string} lang - 設定する言語コード ('ja' または 'en')
     */
    function setLanguage(lang) {
        if (lang === 'en') {
            // 英語に設定する場合
            allJaElements.forEach(el => el.style.display = 'none'); // 日本語を非表示
            allEnElements.forEach(el => el.style.display = '');    // 英語を表示
            htmlTag.setAttribute('lang', 'en');                     // HTMLタグのlang属性を'en'に設定
            document.title = pageTitles.en;                         // ページタイトルを英語に変更
        } else {
            // 日本語に設定する場合（デフォルト）
            allJaElements.forEach(el => el.style.display = '');    // 日本語を表示
            allEnElements.forEach(el => el.style.display = 'none'); // 英語を非表示
            htmlTag.setAttribute('lang', 'ja');                     // HTMLタグのlang属性を'ja'に設定
            document.title = pageTitles.ja;                         // ページタイトルを日本語に変更
        }

        // 言語切り替えボタンのアクティブ状態を更新
        langSwitchButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // ユーザーの言語設定をlocalStorageに保存
        localStorage.setItem('preferredLanguage', lang);
    }

    // 各言語切り替えボタンにクリックイベントリスナーを設定
    langSwitchButtons.forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });

    // ページ読み込み時にユーザーの保存された言語設定を読み込む
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    // 保存された設定があればそれを適用、なければ'ja'をデフォルトとする
    setLanguage(preferredLanguage || 'ja');
});
