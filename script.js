document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Resume Builder Form
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const summary = document.getElementById('summary').value;
            const experience = document.getElementById('experience').value;
            const education = document.getElementById('education').value;
            const skills = document.getElementById('skills').value;
            
            // Update resume preview
            document.getElementById('resumeName').textContent = name;
            document.getElementById('resumeContact').textContent = `${email} | ${phone}`;
            document.getElementById('resumeSummary').textContent = summary;
            
            // Format experience
            const experienceLines = experience.split('\n');
            let experienceHtml = '';
            experienceLines.forEach(line => {
                if (line.trim()) {
                    experienceHtml += `<p><strong>${line.split(',')[0]}</strong> - ${line.split(',')[1]} (${line.split(',')[2]})</p>`;
                    if (line.split(',').length > 3) {
                        experienceHtml += '<ul>';
                        line.split(',').slice(3).forEach(item => {
                            if (item.trim()) experienceHtml += `<li>${item.trim()}</li>`;
                        });
                        experienceHtml += '</ul>';
                    }
                }
            });
            document.getElementById('resumeExperience').innerHTML = experienceHtml;
            
            // Format education
            const educationLines = education.split('\n');
            let educationHtml = '';
            educationLines.forEach(line => {
                if (line.trim()) {
                    educationHtml += `<p><strong>${line.split(',')[0]}</strong> - ${line.split(',')[1]} (${line.split(',')[2]})</p>`;
                }
            });
            document.getElementById('resumeEducation').innerHTML = educationHtml;
            
            // Format skills
            const skillsArray = skills.split(',').map(skill => skill.trim());
            let skillsHtml = '';
            skillsArray.forEach(skill => {
                if (skill) skillsHtml += `<span class="skill-tag">${skill}</span>`;
            });
            document.getElementById('resumeSkills').innerHTML = skillsHtml;
            
            // Enable download and print buttons
            document.getElementById('downloadResume').disabled = false;
            document.getElementById('printResume').disabled = false;
            
            // Scroll to preview
            document.getElementById('resumeOutput').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Postgrad Profile Form
    const postgradForm = document.getElementById('postgradForm');
    if (postgradForm) {
        postgradForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('pgName').value;
            const undergrad = document.getElementById('pgUndergrad').value;
            const research = document.getElementById('pgResearch').value;
            const publications = document.getElementById('pgPublications').value;
            const projects = document.getElementById('pgProjects').value;
            const goals = document.getElementById('pgGoals').value;
            
            // Update profile preview
            document.getElementById('profileName').textContent = name;
            document.getElementById('profileDegree').textContent = undergrad;
            document.getElementById('profileResearch').textContent = research;
            document.getElementById('profileGoals').textContent = goals;
            
            // Format publications
            const publicationLines = publications.split('\n');
            let publicationsHtml = '';
            publicationLines.forEach(line => {
                if (line.trim()) {
                    publicationsHtml += `<p>${line}</p>`;
                }
            });
            document.getElementById('profilePublications').innerHTML = publicationsHtml || '<p>No publications listed</p>';
            
            // Format projects
            const projectLines = projects.split('\n');
            let projectsHtml = '';
            projectLines.forEach(line => {
                if (line.trim()) {
                    projectsHtml += `<p><strong>${line.split(',')[0]}</strong></p>`;
                    if (line.split(',').length > 1) {
                        projectsHtml += `<p>${line.split(',').slice(1).join(',')}</p>`;
                    }
                }
            });
            document.getElementById('profileProjects').innerHTML = projectsHtml || '<p>No projects listed</p>';
            
            // Enable download button
            document.getElementById('downloadProfile').disabled = false;
            
            // Scroll to preview
            document.getElementById('profileOutput').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Quotes Carousel
    const quoteCards = document.querySelectorAll('.quote-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    
    function showQuote(index) {
        quoteCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        quoteCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = quoteCards.length - 1;
            showQuote(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= quoteCards.length) newIndex = 0;
            showQuote(newIndex);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showQuote(index));
    });
    
    // Auto-rotate quotes
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= quoteCards.length) newIndex = 0;
        showQuote(newIndex);
    }, 5000);
    
    // Project Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Download Resume Button (placeholder functionality)
    document.getElementById('downloadResume')?.addEventListener('click', () => {
        alert('In a full implementation, this would generate a PDF of your resume.');
    });
    
    // Print Resume Button
    document.getElementById('printResume')?.addEventListener('click', () => {
        window.print();
    });
    
    // Download Profile Button (placeholder functionality)
    document.getElementById('downloadProfile')?.addEventListener('click', () => {
        alert('In a full implementation, this would generate a PDF of your postgrad profile.');
    });
    
    // Notify Me Buttons
    document.querySelectorAll('.coming-soon .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const email = prompt('Enter your email to be notified when this feature launches:');
            if (email) {
                alert(`Thank you! We'll notify you at ${email} when this feature is available.`);
            }
        });
    });
});
