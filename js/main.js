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

// State persistence
function saveState(type, id, isExpanded) {
    const states = JSON.parse(localStorage.getItem('portfolio-states') || '{}');
    states[`${type}-${id}`] = isExpanded;
    localStorage.setItem('portfolio-states', JSON.stringify(states));
}

function loadState(type, id) {
    const states = JSON.parse(localStorage.getItem('portfolio-states') || '{}');
    return states[`${type}-${id}`] || false;
}

// Modify toggleContent function
function toggleContent(button, contentClass) {
    const content = button.closest('.project-box, .cert-box').querySelector(contentClass);
    const id = content.id;
    const type = contentClass.replace('.', '');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Update ARIA states and save state
    button.setAttribute('aria-expanded', !isExpanded);
    saveState(type, id, !isExpanded);
    
    const icon = button.querySelector('i');
    button.classList.toggle('active');
    
    // Close all other open content in the same section
    const section = content.closest('section');
    section.querySelectorAll(contentClass).forEach(otherContent => {
        if (otherContent !== content && otherContent.classList.contains('show')) {
            otherContent.style.maxHeight = '0';
            otherContent.classList.remove('show');
            const otherButton = otherContent.closest('.project-box, .cert-box').querySelector('.toggle-btn');
            otherButton.classList.remove('active');
            otherButton.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
    
    if (content.classList.contains('show')) {
        content.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
        setTimeout(() => content.classList.remove('show'), 300);
    } else {
        content.classList.add('show');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
}

function toggleProject(button) {
    toggleContent(button, '.project-content');
}

function toggleCertification(button) {
    toggleContent(button, '.cert-content');
}

function toggleTraining(button) {
    toggleContent(button, '.cert-content');
}

// Add keyboard navigation for boxes
document.querySelectorAll('.project-box, .cert-box, .skill-box, .contact-box').forEach(box => {
    box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const button = box.querySelector('.toggle-btn');
            if (button) button.click();
        }
    });
});

// Back to top functionality
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add state restoration on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-content, .cert-content').forEach(content => {
        const id = content.id;
        const type = content.classList.contains('project-content') ? 'project-content' : 'cert-content';
        const isExpanded = loadState(type, id);
        
        if (isExpanded) {
            const button = content.closest('.project-box, .cert-box').querySelector('.toggle-btn');
            toggleContent(button, `.${type}`);
        }
    });
});

// Add clipboard functionality for section anchors
document.querySelectorAll('.section-anchor').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.href.split('#')[0] + anchor.getAttribute('href');
        
        // Copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            // Show feedback
            const originalIcon = anchor.innerHTML;
            anchor.innerHTML = '<i class="fas fa-check"></i>';
            anchor.style.color = 'var(--primary-blue)';
            
            // Reset after 2 seconds
            setTimeout(() => {
                anchor.innerHTML = originalIcon;
                anchor.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });
});

function toggleExperience(button) {
    const content = button.closest('.timeline-content').querySelector('.timeline-body');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    button.setAttribute('aria-expanded', !isExpanded);
    button.querySelector('i').style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    
    if (isExpanded) {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}
