document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change hamburger to X
            const spans = this.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Dropdown on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    }
    
    // Hero Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.hero-slider .prev-btn');
    const nextBtn = document.querySelector('.hero-slider .next-btn');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    if (slides.length > 0) {
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                resetSlideInterval();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                resetSlideInterval();
            });
        }
        
        let slideTimer = setInterval(nextSlide, slideInterval);
        
        function resetSlideInterval() {
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, slideInterval);
        }
    }
    
    // Campus Slider
    const campusSlider = document.querySelector('.campus-slider');
    const campusSlides = document.querySelectorAll('.campus-slide');
    const campusPrevBtn = document.querySelector('.campuses .prev-btn');
    const campusNextBtn = document.querySelector('.campuses .next-btn');
    
    if (campusSlides.length > 0 && campusSlider) {
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        
        // For touch devices
        campusSlider.addEventListener('touchstart', touchStart);
        campusSlider.addEventListener('touchend', touchEnd);
        campusSlider.addEventListener('touchmove', touchMove);
        
        // For mouse
        campusSlider.addEventListener('mousedown', touchStart);
        campusSlider.addEventListener('mouseup', touchEnd);
        campusSlider.addEventListener('mouseleave', touchEnd);
        campusSlider.addEventListener('mousemove', touchMove);
        
        if (campusPrevBtn) {
            campusPrevBtn.addEventListener('click', function() {
                navigate(-1);
            });
        }
        
        if (campusNextBtn) {
            campusNextBtn.addEventListener('click', function() {
                navigate(1);
            });
        }
        
        function navigate(direction) {
            const slideWidth = campusSlider.clientWidth / 3;
            currentTranslate = prevTranslate + direction * slideWidth;
            
            // Check bounds
            if (currentTranslate > 0) {
                currentTranslate = 0;
            } else if (currentTranslate < -(campusSlides.length - 3) * slideWidth) {
                currentTranslate = -(campusSlides.length - 3) * slideWidth;
            }
            
            prevTranslate = currentTranslate;
            setSliderPosition();
        }
        
        function touchStart(event) {
            startPos = getPositionX(event);
            isDragging = true;
        }
        
        function touchMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
                setSliderPosition();
            }
        }
        
        function touchEnd() {
            isDragging = false;
            prevTranslate = currentTranslate;
        }
        
        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }
        
        function setSliderPosition() {
            campusSlider.style.transform = `translateX(${currentTranslate}px)`;
        }
    }
    
    // Visitor Count Animation (just for demo)
    const visitorCount = document.querySelector('.visitor-count');
    if (visitorCount) {
        const counts = visitorCount.querySelectorAll('.count');
        counts.forEach(count => {
            const targetCount = parseInt(count.textContent);
            let currentCount = 0;
            const increment = Math.ceil(targetCount / 20);
            
            const interval = setInterval(() => {
                currentCount += increment;
                if (currentCount >= targetCount) {
                    count.textContent = targetCount.toLocaleString();
                    clearInterval(interval);
                } else {
                    count.textContent = currentCount.toLocaleString();
                }
            }, 100);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Create images directory structure
    console.log('Taffa Institute website loaded successfully');
}); 