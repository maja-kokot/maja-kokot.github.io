//main.js
document.addEventListener('DOMContentLoaded', function() {

    // 1. --- THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            applyTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
        });
    }

    // 2. --- NODE MODAL LOGIC ---
    // (Same as before, but good to keep it all together)
    const modal = document.getElementById('node-modal');
    const overlay = document.getElementById('modal-overlay');
    const closeButton = document.getElementById('modal-close');
    
    if (modal && overlay && closeButton) {
        // ... (Modal logic - already in your file, I'm omitting for brevity) ...
        const titleEl = document.getElementById('modal-title');
        const detailsEl = document.getElementById('modal-details');
        const linksEl = document.getElementById('modal-links');

        window.openNodeModal = function(data) {
            titleEl.textContent = data.title;
            
            if (data.description) {
                detailsEl.innerHTML = marked.parse(data.description);
            } else {
                detailsEl.innerHTML = ''; // Clear if no description
            }

            // let detailsHTML = '<ul>';
            // for (const item of data.details) detailsHTML += `<li>${item}</li>`;
            // detailsEl.innerHTML = detailsHTML + '</ul>';

            let linksHTML = '';
            for (const link of data.links) linksHTML += `<a href="${link.url}">${link.text}</a>`;
            linksEl.innerHTML = linksHTML;
            
            modal.classList.add('is-visible');
            overlay.classList.add('is-visible');
            // if (cursor) cursor.style.display = 'none'; 
        };

        function closeModal() {
            modal.classList.remove('is-visible');
            overlay.classList.remove('is-visible');
            // if (cursor) {
            //     setTimeout(() => {
            //         cursor.style.display = 'block';
            //     }, 300); // 300ms matches the modal fade-out transition
            // }
        }

        closeButton.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
    }

    // 3. --- SCROLL ANIMATIONS (Intersection Observer) ---
    const faders = document.querySelectorAll('.fade-in-section');

    if (faders.length > 0) {
        const appearOptions = {
            threshold: 0,
            rootMargin: "0px 0px -100px 0px" // Start animation a bit before it enters the viewport
        };

        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('is-visible');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

// 4. --- CUSTOM CURSOR ---
const customCursorEnabled = false; // <-- MASTER SWITCH: Set to 'true' for deployment

if (customCursorEnabled) {
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        // Smoothed position variables
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        const speed = 0.2;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-box');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover-active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover-active'));
        });

        // Hide cursor over text elements
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote, code, span');
        textElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (!el.closest('a') && !el.closest('button')) {
                    cursor.classList.add('hidden');
                }
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hidden');
            });
        });

        // Hide/show cursor on window leave/enter
        document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
        document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
    }
} else {
    // If the cursor is disabled, add a class to the body to restore the default cursor
    document.body.classList.add('cursor-disabled');
}


// --- TIMELINE MODAL LOGIC ---
    document.body.addEventListener('click', function(event) {
        const timelineItem = event.target.closest('.timeline-item');
        if (timelineItem) {
            const title = timelineItem.dataset.title;
            const date = timelineItem.dataset.date;
            const description = timelineItem.querySelector('.timeline-description-hidden').innerHTML;

            // Reuse the existing modal function!
            window.openNodeModal({
                title: title,
                description: `<p><em>${date}</em></p>${description}`, // We can add the date here
                links: [] // No links needed for timeline items
            });
        }
    });

});