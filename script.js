/**
 * 和平主题网页 - 交互脚本
 */

document.addEventListener('DOMContentLoaded', () => {
    // 导航栏滚动效果
    initNavigation();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 数字计数动画
    initCounterAnimation();
    
    // 滚动显示动画
    initRevealAnimation();
    
    // 蜡烛交互
    initCandleInteraction();
    
    // 视差效果
    initParallaxEffect();
});

/**
 * 导航栏效果
 */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // 更新活动链接
        updateActiveLink();
    });
    
    // 更新活动链接
    function updateActiveLink() {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // 可以在这里添加移动端菜单展开逻辑
            menuToggle.classList.toggle('active');
        });
    }
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 数字计数动画
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 2000;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
    
    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用 easeOutQuart 缓动函数
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeProgress * (target - start) + start);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
}

/**
 * 滚动显示动画
 */
function initRevealAnimation() {
    const revealElements = document.querySelectorAll(
        '.about-card, .gallery-item, .msg-card, .stat-item, .quote-block'
    );
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 添加延迟以实现错开动画
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

/**
 * 蜡烛交互效果
 */
function initCandleInteraction() {
    const candle = document.querySelector('.candle');
    const flame = document.querySelector('.flame');
    
    if (!candle || !flame) return;
    
    let isLit = true;
    
    candle.addEventListener('click', () => {
        isLit = !isLit;
        
        if (isLit) {
            // 点燃蜡烛
            flame.style.display = 'block';
            flame.style.animation = 'flicker 3s infinite ease-in-out';
            candle.style.transform = 'scale(1.05)';
            
            // 创建光晕效果
            createGlowEffect();
        } else {
            // 吹灭蜡烛
            flame.style.display = 'none';
            candle.style.transform = 'scale(1)';
        }
    });
    
    // 鼠标悬停效果
    candle.addEventListener('mouseenter', () => {
        if (isLit) {
            flame.style.animation = 'flicker 0.5s infinite ease-in-out';
        }
    });
    
    candle.addEventListener('mouseleave', () => {
        if (isLit) {
            flame.style.animation = 'flicker 3s infinite ease-in-out';
        }
    });
    
    function createGlowEffect() {
        // 可以添加额外的视觉效果
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255, 112, 67, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: pulse 2s infinite;
        `;
        
        candle.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 2000);
    }
}

/**
 * 视差滚动效果
 */
function initParallaxEffect() {
    const heroBg = document.querySelector('.hero-bg');
    const doves = document.querySelectorAll('.dove');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                
                // Hero 背景视差
                if (heroBg && scrollY < window.innerHeight) {
                    heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
                }
                
                // 飞鸟视差
                doves.forEach((dove, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = scrollY * speed;
                    dove.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

/**
 * 打字机效果（可选）
 */
function typewriterEffect(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * 页面加载完成后的入场动画
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 标题动画
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            line.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 300 + (index * 300));
    });
});

/**
 * 鼠标跟随效果（和平符号）
 */
document.addEventListener('mousemove', (e) => {
    const peaceSymbol = document.querySelector('.peace-symbol');
    
    if (peaceSymbol && window.innerWidth > 1024) {
        const rect = peaceSymbol.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;
        
        peaceSymbol.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
});

/**
 * 键盘导航支持
 */
document.addEventListener('keydown', (e) => {
    // ESC 关闭菜单
    if (e.key === 'Escape') {
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    }
    
    // 方向键快速导航
    const sections = ['home', 'about', 'gallery', 'message'];
    const currentIndex = sections.findIndex(id => {
        const section = document.getElementById(id);
        if (section) {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
    });
    
    if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        e.preventDefault();
        document.getElementById(sections[currentIndex + 1])?.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
    
    if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        document.getElementById(sections[currentIndex - 1])?.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
});
