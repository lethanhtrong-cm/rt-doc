const UIManager = {
    init() {
        this.container = document.getElementById('sequence-container');
        this.sidebar = document.getElementById('sidebar-nav');
        this.setupModals();
        this.setupScrollToTop();
    },

    generateCardHTML(seq, lang) {
        const style = MRIData.groupStyles[seq.group] || MRIData.groupStyles['spin-echo'];
        const t = MRIData.translations;

        // Xử lý bảng Vendor
        let vendorRows = '';
        if (seq.vendors) {
            let i = 0;
            for (const [vendor, name] of Object.entries(seq.vendors)) {
                const bg = i % 2 === 0 ? 'bg-white' : 'bg-slate-50/80';
                vendorRows += `<tr class="${bg} hover:bg-blue-50/50 transition-colors"><td class="py-2.5 px-4 font-semibold text-slate-700">${vendor}</td><td class="py-2.5 px-4 text-slate-600">${name}</td></tr>`;
                i++;
            }
        }

        // Xử lý Danh sách ứng dụng
        let appItems = '';
        [...seq.applications].sort((a,b) => a.priority - b.priority).forEach(app => {
            appItems += `<li class="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-blue-500 before:rounded-full"><span class="text-slate-700">${app.use[lang]}</span></li>`;
        });

        return `
            <article class="sequence-card bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden group" id="${seq.id}">
                <!-- Header Banner -->
                <div class="p-5 ${style.bg} relative overflow-hidden">
                    <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>
                    <h2 class="text-xl font-bold text-white relative z-10">${seq.genericName[lang]}</h2>
                </div>
                
                <div class="p-6 space-y-6">
                    <!-- Section: Vendor -->
                    <section>
                        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                            ${t['ui.card_vendor_name'][lang]}
                        </h3>
                        <div class="rounded-lg border border-slate-200 overflow-hidden">
                            <table class="w-full text-sm text-left">
                                <thead class="bg-slate-100/80 text-xs text-slate-500 uppercase border-b border-slate-200">
                                    <tr><th class="py-2.5 px-4 font-semibold">${t['ui.card_vendor_header'][lang]}</th><th class="py-2 px-4 font-semibold">${t['ui.card_name_header'][lang]}</th></tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">${vendorRows}</tbody>
                            </table>
                        </div>
                    </section>

                    <!-- Section: Physics -->
                    <section>
                        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            ${t['ui.card_physics'][lang]}
                        </h3>
                        <p class="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">${seq.physics[lang]}</p>
                    </section>

                    <!-- Section: Applications -->
                    <section>
                        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <svg class="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                            ${t['ui.card_applications'][lang]}
                        </h3>
                        <ul class="space-y-2 text-sm">${appItems}</ul>
                    </section>
                    
                    <!-- Section: Image -->
                    ${seq.imageUrl ? `
                    <section>
                        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">${t['ui.card_image'][lang]}</h3>
                        <div class="rounded-lg overflow-hidden border border-slate-200 bg-slate-100 cursor-zoom-in group/img">
                            <img src="${seq.imageUrl}" alt="${seq.genericName[lang]}" class="w-full h-48 object-cover transition-transform duration-500 group-hover/img:scale-105" data-action="zoom">
                        </div>
                    </section>` : ''}

                    <!-- Section: Tips -->
                    ${seq.tips && seq.tips[lang] ? `
                    <section>
                        <div class="p-4 bg-amber-50/80 border border-amber-200 rounded-xl relative overflow-hidden">
                            <div class="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
                            <h3 class="text-sm font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
                                ${t['ui.card_tips'][lang]}
                            </h3>
                            <p class="text-sm text-amber-800/90 leading-relaxed">${seq.tips[lang]}</p>
                        </div>
                    </section>` : ''}
                </div>
            </article>
        `;
    },

    render(lang) {
        this.sidebar.innerHTML = '';
        this.container.innerHTML = '';
        
        const grouped = Object.keys(MRIData.groupStyles).reduce((acc, key) => {
            acc[key] = MRIData.sequences.filter(s => s.group === key);
            return acc;
        }, {});

        let sidebarHTML = '<div class="space-y-6">';
        let contentHTML = '';

        for (const [groupId, style] of Object.entries(MRIData.groupStyles)) {
            if (grouped[groupId] && grouped[groupId].length > 0) {
                // Build Sidebar
                sidebarHTML += `
                    <div class="sidebar-group">
                        <h3 class="text-xs font-bold uppercase tracking-wider ${style.textDark} mb-3 flex justify-between items-center cursor-pointer select-none" data-group-id="${groupId}">
                            <span>${style.title[lang]}</span>
                            <svg class="w-4 h-4 toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </h3>
                        <div class="space-y-1 border-l-2 ${style.border} pl-3 ml-1" id="sidebar-${groupId}-links">
                            ${grouped[groupId].map(seq => `<a href="#${seq.id}" class="sidebar-link block py-1.5 px-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 ${style.hover} transition-all duration-200 truncate">${seq.genericName[lang]}</a>`).join('')}
                        </div>
                    </div>`;

                // Build Content
                contentHTML += `
                    <div class="group-section mb-12">
                        <h2 id="${groupId}-group" class="group-heading text-2xl md:text-3xl font-extrabold text-slate-800 mb-6 flex justify-between items-center cursor-pointer pb-2 border-b-2 ${style.border}" data-group-id="${groupId}">
                            <span class="bg-clip-text text-transparent bg-gradient-to-r ${style.bg.replace('bg-gradient-to-r', '')}">${style.title[lang]}</span>
                            <svg class="w-6 h-6 text-slate-400 toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </h2>
                        <div id="${groupId}-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            ${grouped[groupId].map(seq => this.generateCardHTML(seq, lang)).join('')}
                        </div>
                    </div>`;
            }
        }
        
        sidebarHTML += '</div>';
        
        if (MRIData.sequences.length === 0) {
            this.container.innerHTML = `<div class="text-center py-20"><p class="text-slate-500 text-lg">${MRIData.translations['ui.no_sequences_found'][lang]}</p></div>`;
        } else {
            this.sidebar.innerHTML = sidebarHTML;
            this.container.innerHTML = contentHTML;
        }
    },

    setupModals() {
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        
        document.body.addEventListener('click', (e) => {
            // Mở Lightbox
            if (e.target.dataset.action === 'zoom') {
                img.src = e.target.src;
                lightbox.classList.remove('hidden');
                setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
                document.body.style.overflow = 'hidden';
            }
            // Đóng Lightbox
            if (e.target.id === 'lightbox-close' || e.target === lightbox) {
                lightbox.classList.add('opacity-0');
                setTimeout(() => {
                    lightbox.classList.add('hidden');
                    img.src = '';
                    document.body.style.overflow = '';
                }, 300);
            }
            
            // Collapse Groups
            const heading = e.target.closest('[data-group-id]');
            if (heading) {
                const id = heading.dataset.groupId;
                const grid = document.getElementById(`${id}-grid`);
                const links = document.getElementById(`sidebar-${id}-links`);
                const icons = document.querySelectorAll(`[data-group-id="${id}"] .toggle-icon`);
                
                grid?.classList.toggle('hidden');
                links?.classList.toggle('hidden');
                icons.forEach(i => i.classList.toggle('rotate-180'));
            }
        });
    },

    setupScrollToTop() {
        const btn = document.getElementById('scrollToTopBtn');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.remove('hidden', 'translate-y-10', 'opacity-0');
            } else {
                btn.classList.add('translate-y-10', 'opacity-0');
                setTimeout(() => { if(window.scrollY <= 400) btn.classList.add('hidden'); }, 300);
            }
        });
        btn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
    }
};
