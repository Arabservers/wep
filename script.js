document.addEventListener('DOMContentLoaded', function () {


    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    const roles = ['مطور مواقع', 'معلم برمجة', 'مصمم متاجر', 'مبرمج محترف'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const typingEl = document.getElementById('typingText');
    function type() {
        const current = roles[roleIndex];
        if (isDeleting) {
            typingEl.innerHTML = current.substring(0, charIndex - 1) + '<span class="cursor"></span>';
            charIndex--;
        } else {
            typingEl.innerHTML = current.substring(0, charIndex + 1) + '<span class="cursor"></span>';
            charIndex++;
        }
        let speed = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    type();

    const codeLines = [
        '<span class="keyword">const</span> <span class="variable">developer</span> <span class="bracket">=</span> <span class="bracket">{</span>',
        '  <span class="property">name</span>: <span class="string">"محمد فواد"</span>,',
        '  <span class="property">role</span>: <span class="string">"Full Stack Developer"</span>,',
        '  <span class="property">skills</span>: <span class="bracket">[</span>',
        '    <span class="string">"JavaScript"</span>,',
        '    <span class="string">"Python"</span>,',
        '    <span class="string">"React"</span>,',
        '    <span class="string">"Node.js"</span>',
        '  <span class="bracket">]</span>,',
        '  <span class="function">teach</span><span class="bracket">()</span> <span class="bracket">{</span>',
        '    <span class="keyword">return</span> <span class="string">"تعليم البرمجة"</span>;',
        '  <span class="bracket">}</span>',
        '<span class="bracket">}</span>;',
    ];
    const codeEl = document.getElementById('codeAnimation');
    let lineIdx = 0;
    function addCodeLine() {
        if (lineIdx < codeLines.length) {
            const line = document.createElement('div');
            line.innerHTML = codeLines[lineIdx];
            line.style.opacity = '0';
            line.style.transform = 'translateX(-10px)';
            codeEl.appendChild(line);
            requestAnimationFrame(function () {
                line.style.transition = 'all 0.3s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            });
            lineIdx++;
            setTimeout(addCodeLine, 150);
        }
    }
    setTimeout(addCodeLine, 500);

    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 10; i++) {
        const p = document.createElement('div');
        p.style.cssText = 'position:absolute;width:' + Math.random() * 2 + 'px;height:' + Math.random() * 2 + 'px;background:rgba(255,255,255,' + (Math.random() * 0.08) + ');border-radius:50%;top:' + Math.random() * 100 + '%;left:' + Math.random() * 100 + '%;animation:floatParticle ' + (15 + Math.random() * 15) + 's linear infinite;';
        particlesContainer.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = '@keyframes floatParticle{0%{transform:translateY(0);opacity:0}10%{opacity:0.5}90%{opacity:0.5}100%{transform:translateY(-100vh);opacity:0}}';
    document.head.appendChild(style);

    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;
    function countStats() {
        if (statsCounted) return;
        statsCounted = true;
        statNumbers.forEach(function (el) {
            const target = parseInt(el.getAttribute('data-target'));
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(function () {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.ceil(current);
                }
            }, 50);
        });
    }

    const reveals = document.querySelectorAll('.section-header,.service-card,.course-card,.about-grid,.contact-grid,.about-image,.about-content');
    reveals.forEach(function (el) { el.classList.add('reveal') });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.closest('.hero') || entry.target.classList.contains('stat-item')) {
                    countStats();
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(function (el) { observer.observe(el) });

    const heroSection = document.querySelector('.hero');
    const statsObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) countStats();
    }, { threshold: 0.5 });
    statsObserver.observe(heroSection);

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });



    const whatsappFloat = document.getElementById('whatsappFloat');
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 300) {
            whatsappFloat.style.transform = 'scale(0)';
        } else {
            whatsappFloat.style.transform = 'scale(1)';
        }
        lastScroll = currentScroll;
    });
});
