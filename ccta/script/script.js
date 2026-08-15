// Global var to store current recommendation
let currentIdrRec = 0.021;

// --- Utility cho an toàn DOM (Fail-Safe Pattern) ---
function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// --- Init ---
function initApp() {
    // Chỉ chạy logic khi DOM cơ bản (ô nhập liệu) đã thực sự tồn tại
    if (document.getElementById('weight-input')) {
        calculate();
    } else {
        setTimeout(initApp, 50); // Lặp lại kiểm tra nếu DOM render chậm
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
// Fallback an toàn đảm bảo 100% kích hoạt sau khi tải xong tài nguyên
window.addEventListener('load', initApp);

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
    // Lấy Values an toàn (tránh crash code nếu không tìm thấy DOM)
    const weightInput = document.getElementById('weight-input');
    const concInput = document.getElementById('conc-input');
    const timeInput = document.getElementById('time-input');
    const idrInput = document.getElementById('idr-input');

    if (!weightInput || !concInput || !timeInput || !idrInput) return; // Dừng hàm để bảo vệ luồng

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

    // Update Bars an toàn
    const flowPercent = Math.min((flow / 8) * 100, 100); 
    const volPercent = Math.min((volume / 120) * 100, 100);
    
    const flowBar = document.getElementById('flow-bar');
    if (flowBar) flowBar.style.width = `${flowPercent}%`;
    
    const volBar = document.getElementById('vol-bar');
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

    safeSetText('kv-recommendation', kvText);
    
    const kvEl = document.getElementById('kv-recommendation');
    if(kvEl) kvEl.className = `text-xl font-black ${colorClass}`;
    
    const kvBox = document.getElementById('kv-alert-box');
    if(kvBox) kvBox.className = `${bgClass} border rounded-2xl p-4 flex items-center gap-3 relative overflow-hidden transition-colors duration-300`;
    
    const kvIcon = document.getElementById('kv-icon-bg');
    if(kvIcon) kvIcon.className = `w-10 h-10 rounded-full ${iconBgClass} flex items-center justify-center ${iconTextClass} flex-shrink-0 transition-colors duration-300`;
}

// --- IDR Recommendation Logic ---
function updateIdrRecommendation(weight) {
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
    safeSetText('idr-rec-val', recIdr);
    safeSetText('idr-rec-label', label);
}
