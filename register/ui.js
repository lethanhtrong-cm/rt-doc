/**
 * Module xử lý các thay đổi trên giao diện UI
 */

export function toggleLoadingState(buttonElement, isLoading) {
    if (isLoading) {
        buttonElement.disabled = true;
        buttonElement.innerText = "Đang xử lý đăng ký & gửi thư...";
    } else {
        buttonElement.disabled = false;
        buttonElement.innerText = "Đăng Ký Tham Dự";
    }
}

export function showError(errorContainer, message) {
    errorContainer.style.display = 'block';
    errorContainer.innerText = message;
}

export function hideError(errorContainer) {
    errorContainer.style.display = 'none';
    errorContainer.innerText = '';
}

export function renderSuccessState(containerElement, formElement, userEmail) {
    // Ẩn form hiện tại
    formElement.style.display = 'none';
    
    // Tạo giao diện thành công
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="check-icon">✓</div>
        <h3>Đăng ký thành công!</h3>
        <p>Hệ thống đã tự động gửi đường link tham dự hội thảo đến email <strong>${userEmail}</strong>.</p>
        <p>Vui lòng kiểm tra hộp thư đến (hoặc thư mục Spam).</p>
    `;
    
    // Chèn vào container
    containerElement.appendChild(successDiv);
}
