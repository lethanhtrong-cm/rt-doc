/**
 * Module xử lý giao tiếp server và tự động gửi email (Mock API)
 */

export async function submitAndSendEmail(formData) {
    return new Promise((resolve) => {
        // Giả lập thời gian delay của network và tiến trình gửi email của server (2 giây)
        setTimeout(() => {
            console.log("---- LOG HỆ THỐNG ----");
            console.log("Đã lưu data vào CSDL:", formData);
            console.log(`Đang gọi Email Service... Đã gửi email chứa link hội thảo tới: ${formData.email}`);
            
            resolve({
                success: true,
                message: "Đăng ký thành công và đã gửi email!"
            });
        }, 2000);
    });
}
