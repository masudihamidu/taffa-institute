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
    
    // Sticky Header Logic
    const header = document.querySelector('header');
    
    // Function to calculate and update header height
    function updateHeaderHeight() {
        if (header) {
            const headerHeight = header.offsetHeight;
            document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
            document.body.style.paddingTop = headerHeight + 'px';
        }
    }
    
    // Update header height initially
    updateHeaderHeight();
    
    // Update header height on window resize
    window.addEventListener('resize', updateHeaderHeight);
    
    // Create Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.title = 'Back to Top';
    document.body.appendChild(backToTopButton);
    
    // Show/hide Back to Top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
        
        // Add scroll class to header for visual changes
        if (window.pageYOffset > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
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
    
    // Campus Slider - similar to Hero Slider
    const campusSlides = document.querySelectorAll('.campus-slide');
    const campusPrevBtn = document.querySelector('.campus-prev-btn');
    const campusNextBtn = document.querySelector('.campus-next-btn');
    let currentCampusSlide = 0;
    const campusSlideInterval = 6000; // 6 seconds
    
    function showCampusSlide(index) {
        campusSlides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= campusSlides.length) {
            currentCampusSlide = 0;
        } else if (index < 0) {
            currentCampusSlide = campusSlides.length - 1;
        } else {
            currentCampusSlide = index;
        }
        
        campusSlides[currentCampusSlide].classList.add('active');
    }
    
    function nextCampusSlide() {
        showCampusSlide(currentCampusSlide + 1);
    }
    
    function prevCampusSlide() {
        showCampusSlide(currentCampusSlide - 1);
    }
    
    if (campusSlides.length > 0) {
        if (campusPrevBtn) {
            campusPrevBtn.addEventListener('click', function() {
                prevCampusSlide();
                resetCampusSlideInterval();
            });
        }
        
        if (campusNextBtn) {
            campusNextBtn.addEventListener('click', function() {
                nextCampusSlide();
                resetCampusSlideInterval();
            });
        }
        
        let campusSlideTimer = setInterval(nextCampusSlide, campusSlideInterval);
        
        function resetCampusSlideInterval() {
            clearInterval(campusSlideTimer);
            campusSlideTimer = setInterval(nextCampusSlide, campusSlideInterval);
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
    
    // Create images directory structure
    console.log('Taffa Institute website loaded successfully');
}); 