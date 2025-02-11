// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Project filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectCategories = document.querySelectorAll('.project-category');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const selectedCategory = button.getAttribute('data-category');
        
        if (selectedCategory === 'all') {
            projectCategories.forEach(category => category.style.display = 'block');
        } else {
            projectCategories.forEach(category => {
                const hasMatchingProjects = category.querySelector(`.project-card[data-category="${selectedCategory}"]`);
                category.style.display = hasMatchingProjects ? 'block' : 'none';
            });
        }
    });
});

// Update the toggleProject function
function toggleProject(header) {
    const projectContent = header.nextElementSibling;
    const toggleIcon = header.querySelector('.toggle-icon');
    
    // Close all other open projects
    document.querySelectorAll('.project-content').forEach(content => {
        if (content !== projectContent) {
            content.style.display = 'none';
            content.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
        }
    });
    
    // Toggle current project
    if (projectContent.style.display === 'block') {
        projectContent.style.display = 'none';
        toggleIcon.textContent = '+';
    } else {
        projectContent.style.display = 'block';
        toggleIcon.textContent = '×';
    }
}
