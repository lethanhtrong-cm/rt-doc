document.addEventListener("DOMContentLoaded", () => {
    // Hàm fetch module HTML và nhúng vào DOM
    async function loadModule(url, containerId) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Lỗi HTTP: ${response.status} khi tải ${url}`);
            const htmlContent = await response.text();
            document.getElementById(containerId).innerHTML = htmlContent;
        } catch (error) {
            console.error("Lỗi tải module:", error);
            document.getElementById(containerId).innerHTML = `<p style="color:red; text-align:center;">Không thể tải dữ liệu: ${url}</p>`;
        }
    }

    // Khởi chạy load song song 2 module
    loadModule('components/hero-ct.html', 'ct-module-container');
    loadModule('components/hero-mri.html', 'mri-module-container');
});
