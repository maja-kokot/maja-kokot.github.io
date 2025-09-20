// Get the button element and the body
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Function to apply a theme
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme); // Save the choice
}

// --- On Page Load ---
// Check for a saved theme in localStorage, or check the user's OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    applyTheme(savedTheme); // Use saved theme if it exists
} else {
    applyTheme(prefersDark ? 'dark' : 'light'); // Otherwise, use OS preference
}

// --- Button Click Event ---
themeToggle.addEventListener('click', () => {
    // If the body currently has 'dark-mode', switch to light. Otherwise, switch to dark.
    const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);
});