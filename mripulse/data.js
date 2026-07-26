const MRIData = {
    translations: {
        'ui.title': { vi: 'Sổ tay Chuỗi Xung MRI', en: 'MRI Pulse Sequence Handbook' },
        'ui.subtitle': { vi: 'Dành cho Kỹ thuật viên Hình ảnh Y học', en: 'For Medical Imaging Technologists' },
        'ui.group_name': { vi: 'Nhóm KTV Hình ảnh y học 3 Miền', en: 'Vietnam Medical Imaging Technologists Group' },
        'ui.vnrad_home': { vi: 'VnRad.tech', en: 'VnRad.tech' },
        'ui.mri_protocol': { vi: 'MRI Protocol', en: 'MRI Protocol' },
        'ui.search_placeholder': { vi: 'Tìm kiếm theo tên chuỗi xung, tên hãng, ứng dụng...', en: 'Search by sequence name, vendor, application...' },
        'ui.footer_copyright': { vi: '© 2026 Sổ tay MRI. Tài liệu chỉ mang tính chất tham khảo.', en: '© 2026 MRI Handbook. For reference only.' },
        'ui.footer_designer': { vi: 'Cấu trúc & Giao diện tối ưu', en: 'Optimized Structure & UI' },
        'ui.card_vendor_name': { vi: 'Danh pháp theo hãng', en: 'Vendor Nomenclature' },
        'ui.card_vendor_header': { vi: 'Nhà sản xuất', en: 'Manufacturer' },
        'ui.card_name_header': { vi: 'Tên chuỗi xung', en: 'Sequence Name' },
        'ui.card_physics': { vi: 'Nguyên lý vật lý', en: 'Physical Principles' },
        'ui.card_applications': { vi: 'Ứng dụng lâm sàng', en: 'Clinical Applications' },
        'ui.card_image': { vi: 'Hình ảnh tham chiếu', en: 'Reference Image' },
        'ui.card_tips': { vi: 'Lưu ý kỹ thuật (Tips)', en: 'Technical Tips' },
        'ui.no_sequences_found': { vi: 'Không tìm thấy kết quả phù hợp.', en: 'No matching sequences found.' },
        'ui.no_data': { vi: 'Danh mục trống.', en: 'Empty directory.' }
    },
    
    groupStyles: {
        'spin-echo': { title: { vi: 'Nhóm Spin Echo (SE)', en: 'Spin Echo (SE)' }, bg: 'bg-gradient-to-r from-blue-700 to-blue-600', textDark: 'text-blue-900', hover: 'hover:bg-blue-100', border: 'border-blue-100' },
        'gradient-echo': { title: { vi: 'Nhóm Gradient Echo (GRE)', en: 'Gradient Echo (GRE)' }, bg: 'bg-gradient-to-r from-rose-600 to-red-500', textDark: 'text-rose-900', hover: 'hover:bg-rose-50', border: 'border-rose-100' },
        'fat-suppression': { title: { vi: 'Kỹ Thuật Xóa Mỡ', en: 'Fat Suppression' }, bg: 'bg-gradient-to-r from-emerald-600 to-green-500', textDark: 'text-emerald-900', hover: 'hover:bg-emerald-50', border: 'border-emerald-100' },
        'non-contrast-mra': { title: { vi: 'Mạch Máu (Không Thuốc)', en: 'Non-Contrast MRA' }, bg: 'bg-gradient-to-r from-indigo-600 to-violet-500', textDark: 'text-indigo-900', hover: 'hover:bg-indigo-50', border: 'border-indigo-100' },
        'ce-mra': { title: { vi: 'Mạch Máu (Tiêm Thuốc)', en: 'Contrast-Enhanced MRA' }, bg: 'bg-gradient-to-r from-teal-600 to-cyan-500', textDark: 'text-teal-900', hover: 'hover:bg-teal-50', border: 'border-teal-100' },
        'diffusion': { title: { vi: 'Xung Khuếch Tán (DWI)', en: 'Diffusion-Weighted (DWI)' }, bg: 'bg-gradient-to-r from-fuchsia-600 to-purple-500', textDark: 'text-fuchsia-900', hover: 'hover:bg-fuchsia-50', border: 'border-fuchsia-100' },
        'advanced-maps': { title: { vi: 'Kỹ Thuật Nâng Cao', en: 'Advanced Techniques' }, bg: 'bg-gradient-to-r from-amber-600 to-orange-500', textDark: 'text-amber-900', hover: 'hover:bg-amber-50', border: 'border-amber-100' }
    },

    sequences: [
        {
            id: 't1w', group: 'spin-echo',
            genericName: { vi: 'T1W (TSE/FSE)', en: 'T1W (TSE/FSE)' },
            vendors: { Siemens: 'TSE', GE: 'FastSE', Philips: 'TSE', Canon: 'FastSE', Fujifilm: 'FastSE' },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wMaSpsmRiiyzo0rSGU8E23kjvFGwxUIAxA&s', 
            physics: { vi: 'Sử dụng TR ngắn (300-600ms) và TE ngắn (10-20ms). Độ tương phản chủ yếu dựa trên thời gian hồi phục T1 của mô. Mỡ sáng, Nước/Dịch tối.', en: 'Uses short TR and short TE. Contrast based on T1 recovery. Fat is bright, Fluid is dark.' },
            applications: [
                { priority: 1, use: { vi: 'Đánh giá giải phẫu chi tiết cho não, cột sống, khớp.', en: 'Anatomical detail evaluation.' } },
                { priority: 2, use: { vi: 'Chuỗi xung nền (pre-contrast) so sánh ngấm thuốc.', en: 'Pre-contrast baseline.' } },
                { priority: 3, use: { vi: 'Phát hiện mỡ, máu bán cấp, melanin.', en: 'Detection of fat, subacute blood, melanin.' } }
            ],
            tips: { vi: 'Tăng TR tăng SNR nhưng giảm tương phản T1. Tăng Turbo Factor chụp nhanh nhưng dễ mờ ảnh.', en: 'Increasing TR increases SNR but reduces T1 contrast.' }
        },
        {
            id: 't2w', group: 'spin-echo',
            genericName: { vi: 'T2-weighted (T2W)', en: 'T2-weighted (T2W)' },
            vendors: { Siemens: 'TSE', GE: 'FastSE', Philips: 'TSE', Canon: 'FastSE', Fujifilm: 'FastSE' },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhe4Aei1XRdB8L5XUJNkjtUCYrDAEBOlMe4A&s', 
            physics: { vi: 'Sử dụng TR dài (2000-6000ms) và TE dài (80-120ms). Dịch sáng, mỡ cũng sáng (nếu không xóa).', en: 'Long TR and TE. Fluid is bright.' },
            applications: [
                { priority: 1, use: { vi: 'Phát hiện bệnh lý: phù, viêm, u, nhồi máu.', en: 'Pathology detection: edema, tumor, infarct.' } },
                { priority: 2, use: { vi: 'Đánh giá dịch, nang.', en: 'Fluid evaluation.' } }
            ],
            tips: { vi: 'Dùng Flow Compensation khi chụp cột sống để giảm artifact dòng chảy CSF.', en: 'Use Flow Comp for spine to reduce CSF artifacts.' }
        },
        {
            id: 't2w_fs', group: 'spin-echo',
            genericName: { vi: 'T2W Fat-Sat (T2W-FS)', en: 'T2W Fat-Sat (T2W-FS)' },
            vendors: { Siemens: 'T2 TSE Fat Sat', GE: 'T2 FSE Fat Sat', Philips: 'T2 TSE SPIR' },
            imageUrl: 'https://medality.com/wp-content/uploads/2024/08/jg-ss202019-05-3120at204.08.4320PM.png', 
            physics: { vi: 'Xóa tín hiệu mỡ để làm nổi bật tín hiệu dịch/phù.', en: 'Fat suppression applied to T2W to highlight fluid.' },
            applications: [
                { priority: 1, use: { vi: 'Đánh giá phù tủy xương, chấn thương cơ xương khớp.', en: 'Bone marrow edema evaluation.' } }
            ],
            tips: { vi: 'Yêu cầu từ trường đồng nhất tốt (Shimming). Nếu lỗi, chuyển sang STIR.', en: 'Requires good shimming. Switch to STIR if failing.' }
        },
        {
            id: 'flair', group: 'spin-echo',
            genericName: { vi: 'FLAIR', en: 'FLAIR' },
            vendors: { Siemens: 'TIRM/Dark Fluid', GE: 'FLAIR', Philips: 'FLAIR' },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQJxSVqgsQ1A1eDB-f8ZElPpPeUbEgr50Tw&s', 
            physics: { vi: 'T2W thêm xung đảo nghịch 180 độ và TI dài (2000-2500ms) xóa tín hiệu dịch tự do.', en: 'T2W with inversion recovery to null free fluid.' },
            applications: [
                { priority: 1, use: { vi: 'Đánh giá tổn thương chất trắng (MS, đột quỵ).', en: 'White matter lesion evaluation.' } }
            ],
            tips: { vi: 'Thời gian TI cực kỳ quan trọng và phụ thuộc vào từ trường (1.5T vs 3T).', en: 'TI is field-strength dependent.' }
        },
        {
            id: 'gre_t2star', group: 'gradient-echo',
            genericName: { vi: 'T2* GRE', en: 'T2* GRE' },
            vendors: { Siemens: 'GRE', GE: 'GRE', Philips: 'FFE' },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkM4aRcP8UbaT2x1p6S52_mpb1kHjS4nX-A&s', 
            physics: { vi: 'Chuỗi xung nhạy với sự không đồng nhất từ trường. Máu, sắt, vôi hóa làm mất tín hiệu.', en: 'Sensitive to magnetic susceptibility. Blood, iron cause signal loss.' },
            applications: [
                { priority: 1, use: { vi: 'Phát hiện xuất huyết, vi xuất huyết.', en: 'Detection of hemorrhage, microbleeds.' } }
            ],
            tips: { vi: 'TE càng dài độ nhạy càng cao nhưng dễ nhiễu.', en: 'Longer TE increases sensitivity but adds noise.' }
        },
        {
            id: 'dwi', group: 'diffusion',
            genericName: { vi: 'DWI (Khuếch Tán)', en: 'DWI (Diffusion)' },
            vendors: { Siemens: 'DWI/RESOLVE', GE: 'DWI/MUSE', Philips: 'DWI' },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAqNlmUQfGuBhPdLDZ7jRRQrMao9tHQc7yFEDYGnYSy-XDPsKj5LINDUZbTL62dvUhRc&usqp=CAU',
            physics: { vi: 'Đo chuyển động Brown của nước. Vùng hạn chế khuếch tán sẽ sáng trên DWI và tối trên ADC.', en: 'Measures water diffusion. Restricted areas are bright on DWI, dark on ADC.' },
            applications: [
                { priority: 1, use: { vi: 'Phát hiện nhồi máu não cấp.', en: 'Acute stroke detection.' } },
                { priority: 2, use: { vi: 'Đặc tính hóa khối u ác tính.', en: 'Tumor characterization.' } }
            ],
            tips: { vi: 'Luôn đối chiếu với bản đồ ADC để loại trừ hiệu ứng T2 shine-through.', en: 'Always check ADC map to rule out T2 shine-through.' }
        }
    ]
};
