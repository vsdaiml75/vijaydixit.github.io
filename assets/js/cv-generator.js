function generateCV() {
    // Create a new window for the CV
    const cvWindow = window.open('assets/cv/template.html', '_blank');
    
    cvWindow.onload = function() {
        // Get data from main page
        const skills = document.querySelectorAll('.skill-box');
        const certs = document.querySelectorAll('.cert-box');
        const projects = document.querySelectorAll('.project-box');
        const experiences = document.querySelectorAll('.timeline-item');
        
        // Debug logging
        console.log('Found skills:', skills.length);
        console.log('Found certs:', certs.length);
        console.log('Found projects:', projects.length);
        
        // Wait for CV window to be ready
        setTimeout(() => {
            // Verify CV containers exist
            const skillsGrid = cvWindow.document.querySelector('.skills-grid');
            const certGrid = cvWindow.document.querySelector('.cert-grid');
            const projectsList = cvWindow.document.querySelector('.projects-list');
            
            console.log('CV containers:', {
                skillsGrid: !!skillsGrid,
                certGrid: !!certGrid,
                projectsList: !!projectsList
            });
            
            // Populate CV sections
            if (skills.length) populateSkills(cvWindow, skills);
            if (certs.length) populateCertifications(cvWindow, certs);
            if (projects.length) populateProjects(cvWindow, projects);
            if (experiences.length) populateExperience(cvWindow, experiences);
            
            // Add print button
            addPrintButton(cvWindow);
            
            // Set the title for PDF filename
            cvWindow.document.title = "Vijay Dixit - CV";
        }, 500); // Give the CV window time to load
    };
}

function populateSkills(cvWindow, skills) {
    const skillsGrid = cvWindow.document.querySelector('.skills-grid');
    skills.forEach(skill => {
        const skillTitle = skill.querySelector('.skill-title').textContent;
        const skillBadges = Array.from(skill.querySelectorAll('.skill-badge'))
            .map(badge => badge.textContent);
        
        const skillDiv = cvWindow.document.createElement('div');
        skillDiv.innerHTML = `
            <h3>${skillTitle}</h3>
            <ul>
                ${skillBadges.map(badge => `<li>${badge}</li>`).join('')}
            </ul>
        `;
        skillsGrid.appendChild(skillDiv);
    });
}

function populateCertifications(cvWindow, certs) {
    const certGrid = cvWindow.document.querySelector('.cert-grid');
    certs.forEach(cert => {
        const certTitle = cert.querySelector('.cert-title').textContent;
        const certIssuer = cert.querySelector('.cert-issuer')?.textContent || '';
        const certDate = cert.querySelector('.cert-date')?.textContent || '';
        
        const certDiv = cvWindow.document.createElement('div');
        certDiv.innerHTML = `
            <h3>${certTitle}</h3>
            <p>${certIssuer}</p>
            <p>${certDate}</p>
        `;
        certGrid.appendChild(certDiv);
    });
}

function populateProjects(cvWindow, projects) {
    const projectsList = cvWindow.document.querySelector('.projects-list');
    projects.forEach(project => {
        const projectTitle = project.querySelector('.project-title').textContent;
        const projectOverview = project.querySelector('.project-content p')?.textContent || '';
        const technologies = Array.from(project.querySelectorAll('.badge'))
            .map(badge => badge.textContent);
        
        const projectDiv = cvWindow.document.createElement('div');
        projectDiv.innerHTML = `
            <h3>${projectTitle}</h3>
            <p>${projectOverview}</p>
            <p><strong>Technologies:</strong> ${technologies.join(', ')}</p>
        `;
        projectsList.appendChild(projectDiv);
    });
}

function populateExperience(cvWindow, experiences) {
    const experienceTimeline = cvWindow.document.querySelector('.experience-timeline');
    
    experiences.forEach(exp => {
        // Get data from timeline item
        const date = exp.querySelector('.timeline-date').textContent;
        const title = exp.querySelector('.timeline-title').textContent;
        const company = exp.querySelector('.timeline-company').textContent;
        const description = exp.querySelector('.timeline-body p')?.textContent || '';
        const achievements = Array.from(exp.querySelectorAll('.timeline-achievements li'))
            .map(item => item.textContent);
        const technologies = Array.from(exp.querySelectorAll('.tech-badge'))
            .map(tech => tech.textContent);
        
        // Create experience item
        const expItem = cvWindow.document.createElement('div');
        expItem.className = 'experience-item';
        expItem.innerHTML = `
            <div class="experience-header">
                <h3 class="experience-title">${title}</h3>
                <p class="experience-company">${company}</p>
                <p class="experience-date">${date}</p>
            </div>
            <div class="experience-content">
                <p>${description}</p>
                ${achievements.length ? `
                    <ul class="experience-achievements">
                        ${achievements.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
                ${technologies.length ? `
                    <div class="experience-tech">
                        ${technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        experienceTimeline.appendChild(expItem);
    });
}

function addPrintButton(cvWindow) {
    const printBtn = cvWindow.document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print CV';
    printBtn.className = 'print-button';  // Add class for better targeting
    printBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        background: #2b7de9;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
    `;
    
    printBtn.onclick = () => {
        cvWindow.document.title = "Vijay Dixit - CV";
        cvWindow.print();
    };
    
    cvWindow.document.body.appendChild(printBtn);
}
