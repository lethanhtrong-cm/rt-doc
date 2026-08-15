// Global var to store current recommendation
let currentIdrRec = 0.021;

// --- Init ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', calculate);
} else {
    calculate(); // Đảm bảo luôn chạy tính toán lần đầu
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
    const weight = parseFloat(document.getElementById('weight-input').value) || 0;
    const concMg = parseFloat(document.getElementById('conc-input').value) || 0;
    const time = parseFloat(document.getElementById('time-input').value) || 13;
    const idr = parseFloat(document.getElementById('idr-input').value) || 0.0215;

    const flowEl = document.getElementById('res-flow');
    const volEl = document.getElementById('res-vol');
    const timeDisplayEl = document.getElementById('display-time');
    const alertBox = document.getElementById('alert-box');
    
    // Update Time Display in Header
    timeDisplayEl.textContent = time;

    // --- Update Recommendations ---
    updateKvRecommendation(weight);
    updateIdrRecommendation(weight);

    if (weight <= 0 || concMg <= 0 || time <= 0) {
        flowEl.textContent = "--";
        volEl.textContent = "--";
        return;
    }

    // Logic
    const concG = concMg / 1000;
    
    // Flow = (Weight * IDR) / Concentration(g)
    let flow = (weight * idr) / concG;
    flow = Math.round(flow * 10) / 10;
    let volume = Math.round(flow * time);

    // Update Text
    flowEl.textContent = flow.toFixed(1);
    volEl.textContent = volume;

    // Update Formula Breakdown
    document.getElementById('calc-weight').textContent = weight;
    document.getElementById('calc-idr').textContent = idr;
    document.getElementById('calc-conc').textContent = concG.toFixed(3); // e.g., 0.350
    document.getElementById('calc-flow-res').textContent = flow.toFixed(1);

    document.getElementById('calc-flow-in').textContent = flow.toFixed(1);
    document.getElementById('calc-time').textContent = time;
    document.getElementById('calc-vol-res').textContent = volume;

    // Update Bars
    const flowPercent = Math.min((flow / 8) * 100, 100); 
    const volPercent = Math.min((volume / 120) * 100, 100);
    
    document.getElementById('flow-bar').style.width = `${flowPercent}%`;
    document.getElementById('vol-bar').style.width = `${volPercent}%`;

    // Warnings
    if (flow > 6.5) {
        alertBox.classList.remove('hidden');
        document.getElementById('alert-flow-val').textContent = flow.toFixed(1);
    } else {
        alertBox.classList.add('hidden');
    }
}

// --- kV Recommendation Logic ---
function updateKvRecommendation(weight) {
    const kvEl = document.getElementById('kv-recommendation');
    const kvBox = document.getElementById('kv-alert-box');
    const kvIcon = document.getElementById('kv-icon-bg');
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
