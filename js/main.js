document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LOGIC DARK MODE (PACS THEME) ---
    const themeBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const body = document.body;

    // Kiểm tra trạng thái đã lưu
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            localStorage.setItem('theme', 'light');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    });

    // --- 2. LOGIC FETCH MODULE KÈM SKELETON LOADING ---
    async function loadModule(url, containerId) {
        const container = document.getElementById(containerId);
        
        // Render Skeleton Loading UI
        container.innerHTML = `
            <div class="skeleton-wrapper">
                <div class="skeleton skel-badge"></div>
                <div class="skeleton skel-title"></div>
                <div class="skeleton skel-title" style="width: 50%;"></div>
                <div class="skeleton skel-desc"></div>
                <div class="skeleton skel-desc" style="width: 80%;"></div>
                <div class="skeleton skel-visual"></div>
            </div>
        `;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Lỗi tải: ${url}`);
            const htmlContent = await response.text();
            
            // Giả lập độ trễ mạng nhẹ (300ms) để thấy hiệu ứng mượt mà (Có thể xóa ở thực tế)
            setTimeout(() => {
                container.innerHTML = htmlContent;
            }, 300);

        } catch (error) {
            console.error(error);
            container.innerHTML = `<p style="color:var(--text-muted); font-size:14px;">Lỗi tải dữ liệu. Vui lòng thử lại.</p>`;
        }
    }

    const modules = [
        { url: 'components/hero-quiz.html', id: 'module-quiz' },
        { url: 'components/hero-ct.html', id: 'module-ct' },
        { url: 'components/hero-mri-sequence.html', id: 'module-mri-seq' },
        { url: 'components/hero-mri-protocol.html', id: 'module-mri-proto' }
        { url: 'components/hero-ccta.html', id: 'module-ccta' } // Thêm dòng này
    ];

    modules.forEach(mod => loadModule(mod.url, mod.id));
});
