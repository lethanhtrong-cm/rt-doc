// Global var to store current recommendation
let currentIdrRec = 0.021;

// --- Dữ liệu Bình luận ---
let comments = JSON.parse(localStorage.getItem('ccta_comments')) || [
    { id: 1, author: 'Bác sĩ Tuấn', role: 'BS', roleClass: 'bg-blue-100 text-blue-600', time: '2 giờ trước', text: 'Giao diện tính toán rất tiện lợi, thông số WB-IDR gợi ý chuẩn xác giúp tôi an tâm hơn khi thiết lập protocol.' },
    { id: 2, author: 'KTV Minh Hải', role: 'KTV', roleClass: 'bg-emerald-100 text-emerald-600', time: '1 ngày trước', text: 'Công thức hoạt động ổn định trên cả điện thoại. Cảm ơn tác giả đã phát triển tool này.' }
];

// --- Utility cho an toàn DOM (Fail-Safe Pattern) ---
function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// --- Init (Cơ chế an toàn 100% khi tách file) ---
function init() {
    if (document.getElementById('weight-input')) {
        calculate();
        initCounter();
        renderComments();
    } else {
        setTimeout(init, 50);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init(); // Đảm bảo luôn chạy tính toán lần đầu kể cả khi DOM đã load xong
}
window.addEventListener('load', init); // Fallback cuối cùng nếu có độ trễ

// --- Tính năng Đếm Lượt Truy cập ---
function initCounter() {
    // Đổi key thành 'ccta_views_v2' để reset bộ đếm cũ về số 0 theo yêu cầu
    let views = localStorage.getItem('ccta_views_v2'); 
    if (!views) {
        views = 1; // Bắt đầu từ 1 ở lần truy cập đầu tiên sau reset
    } else {
        views = parseInt(views) + 1; // Tự động cộng dồn
    }
    localStorage.setItem('ccta_views_v2', views);
    safeSetText('page-view-counter', views.toLocaleString('vi-VN'));
}

// --- Tính năng Bình luận ---
function renderComments() {
    const list = document.getElementById('comments-list');
    if (!list) return;

    let html = '<h4 class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">Bình luận gần đây</h4>';

    if (comments.length === 0) {
        html += '<p class="text-xs text-slate-400 italic">Chưa có bình luận nào. Hãy là người đầu tiên đánh giá!</p>';
    }

    comments.forEach(c => {
        html += `
        <div class="p-3 sm:p-4 bg-slate-50/50 rounded-2xl border border-slate-100 relative group transition-all">
            <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2 sm:gap-3">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full ${c.roleClass || 'bg-slate-200 text-slate-600'} flex items-center justify-center font-bold text-[10px] sm:text-xs">${c.role}</div>
                    <div>
                        <h5 class="text-xs sm:text-sm font-bold text-slate-700">${c.author}</h5>
                        <p class="text-[9px] sm:text-[10px] text-slate-400">${c.time}</p>
                    </div>
                </div>
                <div class="flex text-amber-400 text-[10px] sm:text-xs">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-600 ml-9 sm:ml-11 mt-1 sm:mt-0 pr-12">${c.text}</p>
            
            <!-- Nút Xóa bình luận (Sẽ hiện lên khi hover) -->
            <button onclick="deleteComment(${c.id})" class="absolute bottom-3 right-4 text-[10px] sm:text-xs text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer">
                <i class="fa-solid fa-trash"></i> Xóa
            </button>
        </div>
        `;
    });

    list.innerHTML = html;
}

function submitComment() {
    const input = document.getElementById('comment-input');
    if (!input || !input.value.trim()) return;

    const newComment = {
        id: Date.now(),
        author: 'Khách',
        role: 'G',
        roleClass: 'bg-indigo-100 text-indigo-600',
        time: 'Vừa xong',
        text: input.value.trim()
    };

    comments.unshift(newComment); // Đẩy bình luận mới lên trên cùng
    localStorage.setItem('ccta_comments', JSON.stringify(comments));
    input.value = ''; // Làm rỗng ô nhập
    renderComments(); // Render lại danh sách
}

function deleteComment(id) {
    if (confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
        comments = comments.filter(c => c.id !== id);
        localStorage.setItem('ccta_comments', JSON.stringify(comments));
        renderComments(); // Render lại sau khi xóa
    }
}

// --- Input Synchronization Logic ---
function syncInput(type, val) {
    const slider = document.getElementById(`${type}-slider`);
    if (slider) slider.value = val;
    calculate();
}

function syncSlider(type, val) {
    const input = document.getElementById(`${type}-input`);
    if (input) input.value = val;
    calculate();
}

function setPreset(val) {
    const concInput = document.getElementById('conc-input');
    const concSlider = document.getElementById('conc-slider');
    if (concInput) concInput.value = val;
    if (concSlider) concSlider.value = val;
    
    // Visual feedback for buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('bg-slate-50', 'text-slate-500'); // inactive style
        
        if(btn.dataset.val == val) {
            btn.classList.add('active');
            btn.classList.remove('bg-slate-50', 'text-slate-500');
        }
    });

    calculate();
}

function applyIdrRecommendation() {
    const idrInput = document.getElementById('idr-input');
    const idrSlider = document.getElementById('idr-slider');
    if (idrInput) idrInput.value = currentIdrRec;
    if (idrSlider) idrSlider.value = currentIdrRec;
    calculate();
}

// --- Core Calculation ---
function calculate() {
    // Get Values
    const weightInput = document.getElementById('weight-input');
    const concInput = document.getElementById('conc-input');
    const timeInput = document.getElementById('time-input');
    const idrInput = document.getElementById('idr-input');
    
    if (!weightInput || !concInput || !timeInput || !idrInput) return; // Tránh lỗi crash nếu chưa load đủ DOM

    const weight = parseFloat(weightInput.value) || 0;
    const concMg = parseFloat(concInput.value) || 0;
    const time = parseFloat(timeInput.value) || 13;
    const idr = parseFloat(idrInput.value) || 0.0215;

    // Update Time Display in Header
    safeSetText('display-time', time);

    // --- Update Recommendations ---
    updateKvRecommendation(weight);
    updateIdrRecommendation(weight);

    if (weight <= 0 || concMg <= 0 || time <= 0) {
        safeSetText('res-flow', '--');
        safeSetText('res-vol', '--');
        return;
    }

    // Logic
    const concG = concMg / 1000;
    
    // Flow = (Weight * IDR) / Concentration(g)
    let flow = (weight * idr) / concG;
    flow = Math.round(flow * 10) / 10;
    let volume = Math.round(flow * time);

    // Update Text
    safeSetText('res-flow', flow.toFixed(1));
    safeSetText('res-vol', volume);

    // Update Formula Breakdown
    safeSetText('calc-weight', weight);
    safeSetText('calc-idr', idr);
    safeSetText('calc-conc', concG.toFixed(3)); // e.g., 0.350
    safeSetText('calc-flow-res', flow.toFixed(1));

    safeSetText('calc-flow-in', flow.toFixed(1));
    safeSetText('calc-time', time);
    safeSetText('calc-vol-res', volume);

    // Update Bars
    const flowPercent = Math.min((flow / 8) * 100, 100); 
    const volPercent = Math.min((volume / 120) * 100, 100);
    
    const flowBar = document.getElementById('flow-bar');
    const volBar = document.getElementById('vol-bar');

    if (flowBar) flowBar.style.width = `${flowPercent}%`;
    if (volBar) volBar.style.width = `${volPercent}%`;

    // Warnings
    const alertBox = document.getElementById('alert-box');
    if (alertBox) {
        if (flow > 6.5) {
            alertBox.classList.remove('hidden');
            safeSetText('alert-flow-val', flow.toFixed(1));
        } else {
            alertBox.classList.add('hidden');
        }
    }
}

// --- kV Recommendation Logic ---
function updateKvRecommendation(weight) {
    const kvEl = document.getElementById('kv-recommendation');
    const kvBox = document.getElementById('kv-alert-box');
    const kvIcon = document.getElementById('kv-icon-bg');
    
    if (!kvEl || !kvBox || !kvIcon) return;

    let kvText = "";
    let colorClass = "";
    let bgClass = "";
    let iconBgClass = "";
    let iconTextClass = "";

    if (weight <= 0) {
        kvText = "-- kV";
        bgClass = "bg-slate-50 border-slate-200";
        iconBgClass = "bg-slate-100";
        iconTextClass = "text-slate-400";
        colorClass = "text-slate-500";
    } else if (weight < 65) {
        kvText = "80 kV";
        bgClass = "bg-emerald-50 border-emerald-200";
        iconBgClass = "bg-emerald-100";
        iconTextClass = "text-emerald-600";
        colorClass = "text-emerald-600";
    } else if (weight < 85) {
        kvText = "100 kV";
        bgClass = "bg-blue-50 border-blue-200";
        iconBgClass = "bg-blue-100";
        iconTextClass = "text-blue-600";
        colorClass = "text-blue-600";
    } else {
        kvText = "120 kV";
        bgClass = "bg-amber-50 border-amber-200";
        iconBgClass = "bg-amber-100";
        iconTextClass = "text-amber-600";
        colorClass = "text-amber-600";
    }

    kvEl.textContent = kvText;
    kvEl.className = `text-xl font-black ${colorClass}`;
    kvBox.className = `${bgClass} border rounded-2xl p-4 flex items-center gap-3 relative overflow-hidden transition-colors duration-300`;
    kvIcon.className = `w-10 h-10 rounded-full ${iconBgClass} flex items-center justify-center ${iconTextClass} flex-shrink-0 transition-colors duration-300`;
}

// --- IDR Recommendation Logic ---
function updateIdrRecommendation(weight) {
    const idrValEl = document.getElementById('idr-rec-val');
    const idrLabelEl = document.getElementById('idr-rec-label');
    
    if (!idrValEl || !idrLabelEl) return;

    let recIdr = 0.021;
    let label = "(Standard)";

    if(weight <= 0) {
        recIdr = 0.021;
        label = "";
    }
    else if (weight < 60) {
        recIdr = 0.015;
        label = "(Nhẹ cân)";
    } else if (weight <= 85) {
        recIdr = 0.021;
        label = "(Trung bình)";
    } else {
        recIdr = 0.026;
        label = "(Nặng cân)";
    }

    currentIdrRec = recIdr;
    idrValEl.textContent = recIdr;
    idrLabelEl.textContent = label;
}
