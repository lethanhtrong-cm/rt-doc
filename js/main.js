document.addEventListener("DOMContentLoaded", () => {
    // Hàm tải module HTML động
    async function loadModule(url, containerId) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Lỗi tải module: ${url}`);
            const htmlContent = await response.text();
            document.getElementById(containerId).innerHTML = htmlContent;
        } catch (error) {
            console.error(error);
            document.getElementById(containerId).innerHTML = `<p style="color:red; font-size:14px;">Lỗi tải nội dung</p>`;
        }
    }

    // Mảng cấu hình các module cần load
    const modules = [
        { url: 'components/hero-quiz.html', id: 'module-quiz' },
        { url: 'components/hero-ct.html', id: 'module-ct' },
        { url: 'components/hero-mri-sequence.html', id: 'module-mri-seq' },
        { url: 'components/hero-mri-protocol.html', id: 'module-mri-proto' }
    ];

    // Load tất cả module cùng lúc
    modules.forEach(mod => loadModule(mod.url, mod.id));
});
