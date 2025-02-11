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

// Project details toggle
function toggleProject(button) {
    const projectBox = button.closest('.project-box');
    const content = projectBox.querySelector('.project-content');
    const icon = button.querySelector('i');
    
    // Close all other projects
    document.querySelectorAll('.project-content').forEach(otherContent => {
        if (otherContent !== content && otherContent.style.display === 'block') {
            otherContent.style.display = 'none';
            otherContent.previousElementSibling
                .querySelector('i')
                .className = 'fas fa-chevron-down';
        }
    });
    
    // Toggle current project
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.className = 'fas fa-chevron-up';
    } else {
        content.style.display = 'none';
        icon.className = 'fas fa-chevron-down';
    }
}

// Add this function for certification toggles
function toggleCertification(button) {
    const certBox = button.closest('.cert-box');
    const content = certBox.querySelector('.cert-content');
    const icon = button.querySelector('i');
    
    // Close all other certifications
    document.querySelectorAll('.cert-content').forEach(otherContent => {
        if (otherContent !== content && otherContent.style.display === 'block') {
            otherContent.style.display = 'none';
            otherContent.previousElementSibling
                .querySelector('i')
                .className = 'fas fa-chevron-down';
        }
    });
    
    // Toggle current certification
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.className = 'fas fa-chevron-up';
    } else {
        content.style.display = 'none';
        icon.className = 'fas fa-chevron-down';
    }
}

// Add this function for training toggles
function toggleTraining(button) {
    const trainingBox = button.closest('.cert-box');
    const content = trainingBox.querySelector('.cert-content');
    const icon = button.querySelector('i');
    
    // Close all other trainings
    document.querySelectorAll('.cert-content').forEach(otherContent => {
        if (otherContent !== content && otherContent.style.display === 'block') {
            otherContent.style.display = 'none';
            otherContent.previousElementSibling
                .querySelector('i')
                .className = 'fas fa-chevron-down';
        }
    });
    
    // Toggle current training
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.className = 'fas fa-chevron-up';
    } else {
        content.style.display = 'none';
        icon.className = 'fas fa-chevron-down';
    }
}
