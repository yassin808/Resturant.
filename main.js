// main.js - site interactivity enhancements


    // 2) Smooth scroll for nav links
    (function smoothScroll() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(a => {
            a.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const el = document.querySelector(href);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    })();

    // 3) Lightbox for gallery images
    (function galleryLightbox() {
        const gallerySelectors = ['.img-gallery', '.all-images-gallery'];
        const imgs = [];
        gallerySelectors.forEach(sel => {
            document.querySelectorAll(sel + ' img').forEach(img => imgs.push(img));
        });
        if (imgs.length === 0) return;

        let currentIndex = 0;
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);z-index:10000;visibility:hidden;opacity:0;transition:opacity .2s';
        const imgWrap = document.createElement('div');
        imgWrap.style.cssText = 'max-width:90%;max-height:90%;display:flex;align-items:center;justify-content:center;position:relative';
        const bigImg = document.createElement('img');
        bigImg.style.cssText = 'max-width:100%;max-height:100%;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,.6)';
        imgWrap.appendChild(bigImg);
        overlay.appendChild(imgWrap);
        document.body.appendChild(overlay);

        function show(index) {
            currentIndex = (index + imgs.length) % imgs.length;
            bigImg.src = imgs[currentIndex].src;
            overlay.style.visibility = 'visible';
            overlay.style.opacity = '1';
        }
        function hide() {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.visibility = 'hidden', 200);
        }

        imgs.forEach((img, i) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => show(i));
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === bigImg) hide();
        });
        document.addEventListener('keydown', (e) => {
            if (overlay.style.visibility !== 'visible') return;
            if (e.key === 'Escape') hide();
            if (e.key === 'ArrowRight') show(currentIndex + 1);
            if (e.key === 'ArrowLeft') show(currentIndex - 1);
        });
    })();

    // 4) Back to top button
    (function backToTop() {
        const btn = document.createElement('button');
        btn.id = 'backToTop';
        btn.title = 'Back to top';
        btn.innerHTML = '\u2191';
        btn.style.cssText = 'position:fixed;right:18px;bottom:18px;width:44px;height:44px;border-radius:50%;border:none;background:#ffb300;color:#111;font-size:20px;display:none;align-items:center;justify-content:center;z-index:9999;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,0.2)';
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) btn.style.display = 'flex';
            else btn.style.display = 'none';
        });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    })();

    // 5) Lazy load images (add attribute) - skip hero large ones by opt-out with data-lazy="false"
    (function lazyLoad() {
        document.querySelectorAll('img').forEach(img => {
            if (img.hasAttribute('loading')) return;
            if (img.dataset.lazy === 'false') return;
            img.setAttribute('loading', 'lazy');
        });
    })();

    // 6) Basic contact form validation
    (function formValidation() {
        const form = document.querySelector('section.section7 form') || document.querySelector('form');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = Array.from(form.querySelectorAll('input[placeholder], textarea'));
            let ok = true;
            inputs.forEach(i => i.classList.remove('fv-error'));
            const name = form.querySelector('input[type="text"]');
            const email = form.querySelector('input[type="email"]');
            if (name && name.value.trim().length < 2) {
                name.classList.add('fv-error'); ok = false;
            }
            if (email) {
                const re = /^\S+@\S+\.\S+$/;
                if (!re.test(email.value.trim())) { email.classList.add('fv-error'); ok = false; }
            }
            if (!ok) {
                alert('Please complete the form correctly.');
                return;
            }
            // For demo: show success and reset
            alert('شكراً! تم إرسال رسالتك (محاكاة).');
            form.reset();
        });
    })();


/* End of main.js */
