/**
 * Module chính điều phối ứng dụng
 */
import { validateRegistrationData } from './validation.js';
import { submitAndSendEmail } from './api.js';
import { toggleLoadingState, showError, hideError, renderSuccessState } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const container = document.getElementById('form-container');
    const submitBtn = document.getElementById('submit-btn');
    const errorContainer = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        // Ngăn chặn hành vi reload trang mặc định của form
        e.preventDefault();
        hideError(errorContainer);

        // Thu thập dữ liệu từ form
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Bước 1: Validate dữ liệu
        const validation = validateRegistrationData(data);
        if (!validation.isValid) {
            showError(errorContainer, validation.errorMessage);
            return;
        }

        // Bước 2: Hiển thị trạng thái loading
        toggleLoadingState(submitBtn, true);

        try {
            // Bước 3: Gửi dữ liệu và kích hoạt luồng email
            const response = await submitAndSendEmail(data);

            if (response.success) {
                // Bước 4: Cập nhật giao diện thành công
                renderSuccessState(container, form, data.email);
            }
        } catch (error) {
            showError(errorContainer, "Có lỗi hệ thống xảy ra, vui lòng thử lại sau.");
        } finally {
            toggleLoadingState(submitBtn, false);
        }
    });
});
