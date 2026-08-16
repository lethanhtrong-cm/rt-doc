/**
 * Module xử lý xác thực dữ liệu đầu vào
 */

export function validateRegistrationData(data) {
    const errors = [];

    if (!data.fullName || data.fullName.trim().length < 2) {
        errors.push("Vui lòng nhập đầy đủ họ và tên.");
    }

    if (!data.workplace || data.workplace.trim().length < 2) {
        errors.push("Vui lòng nhập đơn vị công tác.");
    }

    if (!data.qualification) {
        errors.push("Vui lòng chọn trình độ chuyên môn.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push("Định dạng email không hợp lệ.");
    }

    return {
        isValid: errors.length === 0,
        errorMessage: errors[0] // Trả về lỗi đầu tiên gặp phải
    };
}
