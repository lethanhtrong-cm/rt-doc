const App = {
    currentLang: localStorage.getItem('mri_lang') || 'vi',
    
    init() {
        UIManager.init();
        this.setLanguage(this.currentLang);
        this.bindEvents();
    },

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('mri_lang', lang);
        document.documentElement.lang = lang;

        // Update UI toggles
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`lang-${lang}`).classList.add('active');

        // Update static text
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            const text = MRIData.translations[key]?.[lang];
            if (text) {
                if (el.tagName === 'INPUT') el.placeholder = text;
                else el.textContent = text;
            }
        });

        UIManager.render(lang);
        
        // Active Scrollspy setup
        this.setupScrollSpy();
    },

    bindEvents() {
        document.getElementById('lang-vi').addEventListener('click', () => this.setLanguage('vi'));
        document.getElementById('lang-en').addEventListener('click', () => this.setLanguage('en'));
        
        // Tìm kiếm
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterData(e.target.value));

        // Mobile Menu
        const btn = document.getElementById('mobile-menu-button');
        const sidebar = document.getElementById('sidebar-nav');
        btn.addEventListener('click', () => sidebar.classList.toggle('hidden'));
        sidebar.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && e.target.tagName === 'A') sidebar.classList.add('hidden');
        });
    },

    filterData(term) {
        const query = term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        document.querySelectorAll('.sequence-card').forEach(card => {
            const text = card.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            card.classList.toggle('hidden', !text.includes(query));
        });

        // Cập nhật trạng thái hiển thị của các nhóm
        document.querySelectorAll('.group-section').forEach(section => {
            const hasVisibleCards = Array.from(section.querySelectorAll('.sequence-card')).some(c => !c.classList.contains('hidden'));
            section.classList.toggle('hidden', !hasVisibleCards);
            
            const groupId = section.querySelector('.group-heading').dataset.groupId;
            const sidebarGroup = document.querySelector(`.sidebar-group:has([data-group-id="${groupId}"])`);
            if(sidebarGroup) sidebarGroup.classList.toggle('hidden', !hasVisibleCards);
        });
    },

    setupScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.sidebar-link').forEach(l => {
                        l.classList.remove('text-blue-700', 'font-bold', 'bg-blue-50');
                    });
                    const link = document.querySelector(`.sidebar-link[href="#${entry.target.id}"]`);
                    if(link) link.classList.add('text-blue-700', 'font-bold', 'bg-blue-50');
                }
            });
        }, { rootMargin: '0px 0px -60% 0px', threshold: 0 });

        document.querySelectorAll('.sequence-card').forEach(card => observer.observe(card));
    }
};

// Kích hoạt toàn bộ hệ thống
document.addEventListener('DOMContentLoaded', () => App.init());
