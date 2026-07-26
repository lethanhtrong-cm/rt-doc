// Khởi tạo các Icon Lucide ngay khi file load
lucide.createIcons();

// Cập nhật năm tự động cho Footer
document.getElementById('year').textContent = new Date().getFullYear();

// --- LOGIC CHO NÚT LÊN ĐẦU TRANG (BACK TO TOP) ---
const bttButton = document.getElementById('backToTop');
window.onscroll = function() {
    // Hiển thị nút khi cuộn quá 400px
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        bttButton.classList.add('show');
    } else {
        bttButton.classList.remove('show');
    }
};

bttButton.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- LOGIC CHO HOẠT ẢNH BACKGROUND (AMBIENT PARTICLES) ---
const bg = document.getElementById('ambient-bg');
function addParticle() {
    const item = document.createElement('div');
    item.className = 'float-item';
    
    // Kích thước ngẫu nhiên từ 5px - 25px
    const size = Math.random() * 20 + 5 + 'px';
    item.style.width = size;
    item.style.height = size;
    
    // Vị trí ngang ngẫu nhiên trên toàn màn hình
    item.style.left = Math.random() * 100 + 'vw';
    
    // Tốc độ trôi ngẫu nhiên (chậm rãi, chuyên nghiệp)
    item.style.animationDuration = (Math.random() * 20 + 15) + 's';
    
    // Màu sắc theo tone y khoa nhẹ nhàng
    const colors = ['#ffffff', '#e0f2fe', '#f8fafc'];
    item.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    item.style.opacity = Math.random() * 0.3;
    
    bg.appendChild(item);
    
    // Dọn dẹp DOM sau khi hoạt ảnh kết thúc để tối ưu hiệu suất
    setTimeout(() => item.remove(), 35000);
}
// Tạo particle mới mỗi 1.5s
setInterval(addParticle, 1500);

// --- HỆ THỐNG ĐA NGÔN NGỮ (I18N TRANSLATIONS) ---
const translations = {
    vi: {
        header_main: "TRANG THÔNG TIN HƯỚNG DẪN",
        header_sub: "TẦM SOÁT UNG THƯ PHỔI BẰNG CẮT LỚP VI TÍNH LIỀU THẤP",
        header_desc: "Medical Excellence • Precision Protocols • Patient Safety",
        btn_explore: "Khám phá nội dung <i data-lucide='arrow-down' size='20'></i>",
        btn_view_params: "<i data-lucide='file-down'></i> Tải Protocol Chi Tiết của AAPM",
        nav_guidelines: "Khuyến cáo",
        nav_studies: "Nghiên cứu",
        nav_workflow: "Quy trình",
        nav_dose: "Liều tia",
        nav_params: "Thông số",
        nav_calc: "Tính Liều",
        
        sec_guidelines: "Đối tượng Tầm soát",
        uspstf_title: "Khuyến cáo USPSTF (2021)",
        uspstf_content: "<li><strong>Độ tuổi:</strong> 50 - 80 tuổi.</li><li><strong>Tiền sử:</strong> ≥ 20 gói-năm.</li><li><strong>Tình trạng:</strong> Đang hút hoặc đã cai < 15 năm.</li>",
        nccn_title: "Khuyến cáo NCCN (2024)",
        nccn_content: "<li><strong>Nhóm 1:</strong> Tương tự tiêu chuẩn của USPSTF.</li><li><strong>Nhóm 2:</strong> Tuổi ≥ 50, ≥ 20 gói-năm <strong>kèm thêm</strong> ≥ 1 yếu tố nguy cơ khác (phơi nhiễm nghề nghiệp, tiền sử gia đình...).</li>",
        contra_title: "Chống chỉ định:",
        contra_content: "Bệnh nhân đã cai thuốc > 15 năm; kỳ vọng sống ngắn; hoặc đang có triệu chứng nghi ngờ ung thư phổi (cần chụp CT chẩn đoán thay vì LDCT).",
        
        sec_studies: "Chứng minh lâm sàng",
        nlst_content: "Nghiên cứu quy mô lớn chứng minh <strong>LDCT giảm 20% tỷ lệ tử vong</strong> so với chụp X-quang phổi quy ước.",
        read_nejm: "Xem báo cáo NEJM <i data-lucide='external-link' size='16'></i>",
        nelson_content: "Giảm tử vong 24% ở nam và 33% ở nữ sau 10 năm sàng lọc định kỳ.",
        lusi_content: "Khẳng định giá trị LDCT trong phát hiện sớm và can thiệp kịp thời.",
        
        sec_workflow: "Quy trình Standard",
        step1_title: "1. Định vị (Position)",
        step1_desc: "Nằm ngửa, hai tay giơ cao quá đầu. Tháo bỏ toàn bộ trang sức, kim loại vùng ngực.",
        step2_title: "2. Hô hấp (Breathing)",
        step2_desc: "Hít sâu tối đa và nín thở. Đảm bảo phổi nở căng hoàn toàn để tránh nhiễu và xẹp phổi phụ thuộc.",
        step3_title: "3. Thu nhận (Acquisition)",
        step3_desc: "Quét xoắn ốc (Spiral) từ đỉnh phổi đến hết góc sườn hoành. <strong>Tuyệt đối không tiêm thuốc cản quang</strong>.",
        step4_title: "4. Tái tạo & Đọc kết quả",
        step4_desc: "Tái tạo lát cắt mỏng ≤ 1.25mm với thuật toán IR. Phân loại và báo cáo nốt phổi theo hệ thống <strong>Lung-RADS</strong>.",
        
        sec_dose: "Quản lý Liều tia",
        th_org: "Tổ chức",
        sub_ctdi_weight: "Phân loại $CTDI_{vol}$ theo Cân nặng",
        sub_eff_dose: "Công thức liều hiệu dụng:",
        ex_content: "Ví dụ: DLP 70 mGy·cm → E = 0.98 mSv. (Thấp hơn khoảng 10 lần so với CT ngực quy ước).",
        
        sec_params: "Thông số & Protocols",
        params_desc: "Hướng dẫn thiết lập mức năng lượng (kV), dòng dẫn (mAs) và hệ thống tự động điều chỉnh liều (AEC) tối ưu cho các hãng máy CT.",
        sec_refs: "Tài liệu Tham khảo"
    },
    en: {
        header_main: "TECHNICAL GUIDELINES",
        header_sub: "LOW DOSE CT LUNG SCREENING (LDCT)",
        header_desc: "Medical Excellence • Precision Protocols • Patient Safety",
        btn_explore: "Explore Content <i data-lucide='arrow-down' size='20'></i>",
        btn_view_params: "<i data-lucide='file-down'></i> Download AAPM Protocols",
        nav_guidelines: "Guidelines",
        nav_studies: "Studies",
        nav_workflow: "Workflow",
        nav_dose: "Radiation",
        nav_params: "Parameters",
        nav_calc: "Dose Calc",
        
        sec_guidelines: "Screening Criteria",
        uspstf_title: "USPSTF Guidelines (2021)",
        uspstf_content: "<li><strong>Age:</strong> 50 - 80 years.</li><li><strong>History:</strong> ≥ 20 pack-years.</li><li><strong>Status:</strong> Current smoker or quit < 15 years.</li>",
        nccn_title: "NCCN Guidelines (2024)",
        nccn_content: "<li><strong>Group 1:</strong> Same as USPSTF criteria.</li><li><strong>Group 2:</strong> Age ≥ 50, ≥ 20 pack-years <strong>plus</strong> ≥ 1 additional risk factor (e.g., occupational exposure, family history).</li>",
        contra_title: "Contraindications:",
        contra_content: "Quit smoking > 15 years; poor performance status (short life expectancy); or presenting with suspected lung cancer symptoms (requires diagnostic CT).",
        
        sec_studies: "Clinical Evidence",
        nlst_content: "Study proved <strong>LDCT reduced mortality by 20%</strong> compared to routine chest X-ray.",
        read_nejm: "View NEJM Report <i data-lucide='external-link' size='16'></i>",
        nelson_content: "Mortality reduced by 24% in men and 33% in women after 10-year follow-up.",
        lusi_content: "Confirms LDCT as an effective early screening and intervention tool.",
        
        sec_workflow: "Standard Workflow",
        step1_title: "1. Position",
        step1_desc: "Supine position, arms above head. Remove all metal objects from the chest area.",
        step2_title: "2. Breathing",
        step2_desc: "Maximum inspiration and breath-hold. Ensure lungs are fully expanded to avoid dependent atelectasis.",
        step3_title: "3. Acquisition",
        step3_desc: "Spiral scan from lung apices through the costophrenic angles. <strong>No IV contrast media</strong>.",
        step4_title: "4. Reconstruction & Reporting",
        step4_desc: "Thin slice reconstruction ≤ 1.25mm using IR. Nodules evaluated and reported using the <strong>Lung-RADS</strong> system.",
        
        sec_dose: "Radiation Management",
        th_org: "Organization",
        sub_ctdi_weight: "$CTDI_{vol}$ by Patient Weight",
        sub_eff_dose: "Effective Dose Calculation:",
        ex_content: "Example: DLP 70 mGy·cm → E = 0.98 mSv (~10x lower than routine diagnostic CT).",
        
        sec_params: "Machine Protocols",
        params_desc: "Optimized guidelines for configuring kV, mAs, and AEC systems across various CT vendors.",
        sec_refs: "References"
    }
};

let currentLang = 'vi';

// Hàm thay đổi ngôn ngữ
window.toggleLanguage = function() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
    
    // Cập nhật text của nút chuyển ngôn ngữ
    document.querySelector('.lang-btn').textContent = currentLang === 'vi' ? 'EN' : 'VN';
    
    // Render lại các Icon Lucide bên trong các chuỗi được thêm vào (nếu có thẻ <i>)
    lucide.createIcons();
    
    // Trigger lại MathJax để render công thức hóa học/toán học
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
};
