document.addEventListener("DOMContentLoaded", () => {
    // 1. Cấu hình danh sách các module slide (đường dẫn file)
    const slidesData = [
        'components/hero-slide-1.html',
        'components/hero-slide-2.html'
    ];

    const slideContainer = document.getElementById('slide-container');
    const dotsContainer = document.getElementById('slider-dots');
    let currentSlide = 0;
    let slides = []; // Lưu trữ các DOM element sau khi fetch xong
    let slideInterval;

    // 2. Hàm load toàn bộ module HTML qua Fetch API
    async function loadSlides() {
        for (let i = 0; i < slidesData.length; i++) {
            try {
                const response = await fetch(slidesData[i]);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const htmlText = await response.text();
                
                // Tạo một wrapper div cho mỗi slide module
                const slideWrapper = document.createElement('div');
                slideWrapper.className = 'slide-wrapper';
                if (i === 0) slideWrapper.classList.add('active'); // Slide đầu tiên hiển thị
                
                slideWrapper.innerHTML = htmlText;
                slideContainer.appendChild(slideWrapper);
                slides.push(slideWrapper);

                // Tạo dot tương ứng
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);

            } catch (error) {
                console.error("Lỗi khi load module slide:", error);
            }
        }
        
        // Khởi động auto-play sau khi load xong
        startAutoPlay();
    }

    // 3. Logic chuyển slide
    function updateSlideUI() {
        // Cập nhật class active cho slides
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Cập nhật class active cho dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlideUI();
        resetAutoPlay(); // Reset timer khi người dùng tự click
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlideUI();
        resetAutoPlay();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlideUI();
        resetAutoPlay();
    }

    // 4. Auto play
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000); // Đổi slide mỗi 5s
    }
    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    // 5. Gắn sự kiện cho nút bấm
    document.getElementById('next-btn').addEventListener('click', nextSlide);
    document.getElementById('prev-btn').addEventListener('click', prevSlide);

    // Khởi chạy
    loadSlides();
});
