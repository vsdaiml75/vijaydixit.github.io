function generateCV() {
    // Create a new window for the CV
    const cvWindow = window.open('assets/cv/template.html', '_blank');
    
    cvWindow.onload = function() {
        // Get data from main page
        const skills = document.querySelectorAll('.skill-box');
        const certs = document.querySelectorAll('.cert-box');
        const projects = document.querySelectorAll('.project-box');
        
        // Populate CV sections
        populateSkills(cvWindow, skills);
        populateCertifications(cvWindow, certs);
        populateProjects(cvWindow, projects);
        
        // Add print button
        addPrintButton(cvWindow);
        
        // Set the title for PDF filename
        cvWindow.document.title = "Vijay Dixit - CV";
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

function addPrintButton(cvWindow) {
    const printBtn = cvWindow.document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print CV';
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
        // Hide print button before printing
        printBtn.style.display = 'none';
        
        // Set filename for print to PDF
        const style = cvWindow.document.createElement('style');
        style.textContent = `
            @page { 
                size: A4; 
                margin: 1.5cm; 
            }
            @media print {
                button { 
                    display: none !important;
                }
            }
        `;
        cvWindow.document.head.appendChild(style);
        cvWindow.document.title = "Vijay Dixit - CV";
        cvWindow.print();
        
        // Show button again after print dialog closes
        setTimeout(() => {
            printBtn.style.display = 'block';
        }, 1000);
    };
    
    cvWindow.document.body.appendChild(printBtn);
}
