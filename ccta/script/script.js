// Global var to store current recommendation
let currentIdrRec = 0.021;

// --- Init (Cơ chế an toàn 100% khi tách file) ---
function init() {
    calculate(); // Calc on load
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init(); // Đảm bảo luôn chạy tính toán lần đầu kể cả khi DOM đã load xong
}

window.addEventListener('load', init); // Fallback cuối cùng nếu có độ trễ

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
    document.getElementById('conc-input').value = val;
    document.getElementById('conc-slider').value = val;
    
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
    document.getElementById('idr-input').value = currentIdrRec;
    document.getElementById('idr-slider').value = currentIdrRec;
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

    const flowEl = document.getElementById('res-flow');
    const volEl = document.getElementById('res-vol');
    const timeDisplayEl = document.getElementById('display-time');
    const alertBox = document.getElementById('alert-box');
    
    // Update Time Display in Header
    if (timeDisplayEl) timeDisplayEl.textContent = time;

    // --- Update Recommendations ---
    updateKvRecommendation(weight);
    updateIdrRecommendation(weight);

    if (weight <= 0 || concMg <= 0 || time <= 0) {
        if (flowEl) flowEl.textContent = "--";
        if (volEl) volEl.textContent = "--";
        return;
    }

    // Logic
    const concG = concMg / 1000;
    
    // Flow = (Weight * IDR) / Concentration(g)
    let flow = (weight * idr) / concG;
    flow = Math.round(flow * 10) / 10;
    let volume = Math.round(flow * time);

    // Update Text
    if (flowEl) flowEl.textContent = flow.toFixed(1);
    if (volEl) volEl.textContent = volume;

    // Update Formula Breakdown
    const elWeight = document.getElementById('calc-weight');
    const elIdr = document.getElementById('calc-idr');
    const elConc = document.getElementById('calc-conc');
    const elFlowRes = document.getElementById('calc-flow-res');
    const elFlowIn = document.getElementById('calc-flow-in');
    const elTime = document.getElementById('calc-time');
    const elVolRes = document.getElementById('calc-vol-res');

    if (elWeight) elWeight.textContent = weight;
    if (elIdr) elIdr.textContent = idr;
    if (elConc) elConc.textContent = concG.toFixed(3); // e.g., 0.350
    if (elFlowRes) elFlowRes.textContent = flow.toFixed(1);

    if (elFlowIn) elFlowIn.textContent = flow.toFixed(1);
    if (elTime) elTime.textContent = time;
    if (elVolRes) elVolRes.textContent = volume;

    // Update Bars
    const flowPercent = Math.min((flow / 8) * 100, 100); 
    const volPercent = Math.min((volume / 120) * 100, 100);
    
    const flowBar = document.getElementById('flow-bar');
    const volBar = document.getElementById('vol-bar');

    if (flowBar) flowBar.style.width = `${flowPercent}%`;
    if (volBar) volBar.style.width = `${volPercent}%`;

    // Warnings
    if (alertBox) {
        if (flow > 6.5) {
            alertBox.classList.remove('hidden');
            const alertFlowVal = document.getElementById('alert-flow-val');
            if (alertFlowVal) alertFlowVal.textContent = flow.toFixed(1);
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

// --- IDR Recommendation Logic (New) ---
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
