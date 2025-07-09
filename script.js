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
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animate stats on hero section
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start + (id === 'success-rate' ? '%' : '+');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Start animation when hero section is in view
    const heroSection = document.querySelector('.hero');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateValue('members-count', 0, 25000, 2000);
            animateValue('jobs-count', 0, 1200, 2000);
            animateValue('success-rate', 0, 92, 2000);
            observer.unobserve(heroSection);
        }
    }, { threshold: 0.5 });
    
    observer.observe(heroSection);
    
    // Filter blog posts
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter blog cards
            blogCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Resume Builder Form
    const resumeFormSteps = document.querySelectorAll('.step-form');
    const resumeSteps = document.querySelectorAll('.step');
    
    // Show step 1 by default
    showStep(1);
    
    // Next/previous buttons
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));
            showStep(nextStep);
        });
    });
    
    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            showStep(prevStep);
        });
    });
    
    function showStep(stepNumber) {
        // Update form steps
        resumeFormSteps.forEach(form => {
            form.classList.remove('active');
            if (parseInt(form.getAttribute('data-step')) === stepNumber) {
                form.classList.add('active');
            }
        });
        
        // Update progress steps
        resumeSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) <= stepNumber) {
                step.classList.add('active');
            }
        });
    }
    
    // Experience form handling
    const experienceEntries = document.getElementById('experienceEntries');
    const addExperienceBtn = document.getElementById('addExperience');
    
    addExperienceBtn.addEventListener('click', function() {
        const entryCount = experienceEntries.children.length;
        const entryHtml = `
            <div class="experience-entry">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="experienceTitle${entryCount}">Job Title *</label>
                        <input type="text" id="experienceTitle${entryCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="experienceCompany${entryCount}">Company *</label>
                        <input type="text" id="experienceCompany${entryCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="experienceStart${entryCount}">Start Date *</label>
                        <input type="month" id="experienceStart${entryCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="experienceEnd${entryCount}">End Date (or Present)</label>
                        <input type="month" id="experienceEnd${entryCount}">
                    </div>
                    <div class="form-group full-width">
                        <label for="experienceDescription${entryCount}">Responsibilities & Achievements *</label>
                        <textarea id="experienceDescription${entryCount}" rows="4" required placeholder="Bullet points work best. Start each with a strong action verb (e.g., Developed, Led, Implemented)"></textarea>
                    </div>
                </div>
                <button type="button" class="remove-entry">
                    <i class="fas fa-times"></i> Remove
                </button>
            </div>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = entryHtml;
        experienceEntries.appendChild(div);
        
        // Add event listener to remove button
        div.querySelector('.remove-entry').addEventListener('click', function() {
            div.remove();
        });
    });
    
    // Education form handling
    const educationEntries = document.getElementById('educationEntries');
    const addEducationBtn = document.getElementById('addEducation');
    
    addEducationBtn.addEventListener('click', function() {
        const entryCount = educationEntries.children.length;
        const entryHtml = `
            <div class="education-entry">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="educationDegree${entryCount}">Degree *</label>
                        <input type="text" id="educationDegree${entryCount}" required placeholder="e.g., Bachelor of Science in Computer Science">
                    </div>
                    <div class="form-group">
                        <label for="educationInstitution${entryCount}">Institution *</label>
                        <input type="text" id="educationInstitution${entryCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="educationYear${entryCount}">Graduation Year *</label>
                        <input type="month" id="educationYear${entryCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="educationGPA${entryCount}">GPA (optional)</label>
                        <input type="text" id="educationGPA${entryCount}" placeholder="e.g., 3.8/4.0">
                    </div>
                    <div class="form-group full-width">
                        <label for="educationHonors${entryCount}">Honors/Awards (optional)</label>
                        <input type="text" id="educationHonors${entryCount}" placeholder="e.g., Summa Cum Laude, Dean's List">
                    </div>
                </div>
                <button type="button" class="remove-entry">
                    <i class="fas fa-times"></i> Remove
                </button>
            </div>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = entryHtml;
        educationEntries.appendChild(div);
        
        // Add event listener to remove button
        div.querySelector('.remove-entry').addEventListener('click', function() {
            div.remove();
        });
    });
    
    // Skills tags input
    const skillsInputs = ['technicalSkills', 'softSkills', 'languages'];
    
    skillsInputs.forEach(skill => {
        const input = document.getElementById(skill);
        const inputContainer = document.getElementById(`${skill}Input`);
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const value = this.value.trim();
                if (value) {
                    addTag(value, skill);
                    this.value = '';
                }
            }
        });
        
        // Add suggestion click handler
        const suggestions = document.getElementById(`${skill}Suggestions`);
        if (suggestions) {
            suggestions.querySelectorAll('span').forEach(suggestion => {
                suggestion.addEventListener('click', function() {
                    addTag(this.textContent, skill);
                });
            });
        }
    });
    
    function addTag(value, skill) {
        const inputContainer = document.getElementById(`${skill}Input`);
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerHTML = `${value} <i class="fas fa-times"></i>`;
        
        // Insert before input
        inputContainer.insertBefore(tag, inputContainer.querySelector('.tags-input-field'));
        
        // Add remove handler
        tag.querySelector('i').addEventListener('click', function() {
            tag.remove();
        });
    }
    
    // Resume template selector
    const templateSelect = document.getElementById('templateSelect');
    const resumeOutput = document.getElementById('resumeOutput');
    
    templateSelect.addEventListener('change', function() {
        resumeOutput.className = 'resume-template ' + this.value;
    });
    
    // Generate resume
    document.getElementById('skillsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic info
        document.getElementById('resumeName').textContent = document.getElementById('name').value;
        document.getElementById('resumeHeadline').textContent = document.getElementById('headline').value;
        
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const location = document.getElementById('location').value;
        const linkedin = document.getElementById('linkedin').value;
        const portfolio = document.getElementById('portfolio').value;
        
        const contactInfo = [];
        if (email) contactInfo.push(email);
        if (phone) contactInfo.push(phone);
        if (location) contactInfo.push(location);
        
        document.getElementById('resumeContact').innerHTML = contactInfo.map(info => `<span>${info}</span>`).join('<span>•</span>');
        
        const socialLinks = [];
        if (linkedin) socialLinks.push(`<a href="${linkedin}">LinkedIn</a>`);
        if (portfolio) socialLinks.push(`<a href="${portfolio}">Portfolio</a>`);
        
        document.getElementById('resumeSocial').innerHTML = socialLinks.join('<span>•</span>');
        
        // Summary
        document.getElementById('resumeSummary').textContent = document.getElementById('summary').value;
        
        // Experience
        const experienceItems = [];
        const experienceEntries = document.querySelectorAll('.experience-entry');
        
        experienceEntries.forEach((entry, index) => {
            const title = entry.querySelector(`#experienceTitle${index}`).value;
            const company = entry.querySelector(`#experienceCompany${index}`).value;
            const start = entry.querySelector(`#experienceStart${index}`).value;
            const end = entry.querySelector(`#experienceEnd${index}`).value || 'Present';
            const description = entry.querySelector(`#experienceDescription${index}`).value;
            
            const bullets = description.split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('');
            
            experienceItems.push(`
                <div class="experience-item">
                    <div class="experience-header">
                        <h3>${title}</h3>
                        <span class="experience-date">${formatDate(start)} - ${end === 'Present' ? 'Present' : formatDate(end)}</span>
                    </div>
                    <div class="experience-company">${company}</div>
                    <ul class="experience-details">${bullets}</ul>
                </div>
            `);
        });
        
        document.getElementById('resumeExperience').innerHTML = experienceItems.join('') || '<p>No experience listed</p>';
        
        // Education
        const educationItems = [];
        const educationEntries = document.querySelectorAll('.education-entry');
        
        educationEntries.forEach((entry, index) => {
            const degree = entry.querySelector(`#educationDegree${index}`).value;
            const institution = entry.querySelector(`#educationInstitution${index}`).value;
            const year = entry.querySelector(`#educationYear${index}`).value;
            const gpa = entry.querySelector(`#educationGPA${index}`).value;
            const honors = entry.querySelector(`#educationHonors${index}`).value;
            
            let educationHtml = `<h3>${degree}</h3><div class="education-institution">${institution}, ${year ? new Date(year).getFullYear() : ''}`;
            
            if (gpa) educationHtml += ` | GPA: ${gpa}`;
            if (honors) educationHtml += ` | ${honors}`;
            
            educationHtml += '</div>';
            
            educationItems.push(`<div class="education-item">${educationHtml}</div>`);
        });
        
        document.getElementById('resumeEducation').innerHTML = educationItems.join('') || '<p>No education listed</p>';
        
        // Skills
        const technicalSkills = Array.from(document.querySelectorAll('#technicalSkillsInput .tag')).map(tag => tag.textContent.trim().replace('×', ''));
        const softSkills = Array.from(document.querySelectorAll('#softSkillsInput .tag')).map(tag => tag.textContent.trim().replace('×', ''));
        
        document.getElementById('resumeTechnicalSkills').innerHTML = technicalSkills.map(skill => `<span>${skill}</span>`).join('');
        document.getElementById('resumeSoftSkills').innerHTML = softSkills.map(skill => `<span>${skill}</span>`).join('');
        
        // Enable download and print buttons
        document.getElementById('downloadResume').disabled = false;
        document.getElementById('printResume').disabled = false;
        
        // Scroll to preview
        document.getElementById('resumePreview').scrollIntoView({ behavior: 'smooth' });
    });
    
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    
    // Postgrad Profile Builder
    const researchEntries = document.getElementById('researchEntries');
    const addResearchBtn = document.getElementById('addResearch');
    
    addResearchBtn.addEventListener('click', function() {
        const entryCount = researchEntries.children.length;
        const entryHtml = `
            <div class="research-entry">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="researchTitle${entryCount}">Position/Title *</label>
                        <input type="text" id="researchTitle${entryCount}" required placeholder="e.g., Undergraduate Research Assistant">
                    </div>
                    <div class="form-group">
                        <label for="researchInstitution${entryCount}">Institution/Lab *</label>
                        <input type="text" id="researchInstitution${entryCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="researchStart${entryCount}">Start Date *</label>
                        <input type="month" id="researchStart${entryCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="researchEnd${entryCount}">End Date (or Present)</label>
                        <input type="month" id="researchEnd${entryCount}">
                    </div>
                    <div class="form-group">
                        <label for="researchAdvisor${entryCount}">Advisor/Mentor</label>
                        <input type="text" id="researchAdvisor${entryCount}" placeholder="Professor Name">
                    </div>
                    <div class="form-group full-width">
                        <label for="researchDescription${entryCount}">Description *</label>
                        <textarea id="researchDescription${entryCount}" rows="4" required placeholder="Describe your research focus, methodologies used, and any significant findings or contributions"></textarea>
                    </div>
                </div>
                <button type="button" class="remove-entry">
                    <i class="fas fa-times"></i> Remove
                </button>
            </div>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = entryHtml;
        researchEntries.appendChild(div);
        
        // Add event listener to remove button
        div.querySelector('.remove-entry').addEventListener('click', function() {
            div.remove();
        });
    });
    
    const projectEntries = document.getElementById('projectEntries');
    const addProjectBtn = document.getElementById('addProject');
    
    addProjectBtn.addEventListener('click', function() {
        const entryCount = projectEntries.children.length;
        const entryHtml = `
            <div class="project-entry">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="projectTitle${entryCount}">Project Title *</label>
                        <input type="text" id="projectTitle${entryCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="projectCourse${entryCount}">Course (if applicable)</label>
                        <input type="text" id="projectCourse${entryCount}" placeholder="e.g., Advanced Machine Learning">
                    </div>
                    <div class="form-group">
                        <label for="projectDate${entryCount}">Date Completed *</label>
                        <input type="month" id="projectDate${entryCount}" required>
                    </div>
                    <div class="form-group full-width">
                        <label for="projectDescription${entryCount}">Description *</label>
                        <textarea id="projectDescription${entryCount}" rows="4" required placeholder="Describe the project objectives, your contributions, technologies used, and outcomes"></textarea>
                    </div>
                </div>
                <button type="button" class="remove-entry">
                    <i class="fas fa-times"></i> Remove
                </button>
            </div>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = entryHtml;
        projectEntries.appendChild(div);
        
        // Add event listener to remove button
        div.querySelector('.remove-entry').addEventListener('click', function() {
            div.remove();
        });
    });
    
    // Generate postgrad profile
    document.getElementById('postgradForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic info
        document.getElementById('profileName').textContent = document.getElementById('pgName').value;
        
        const email = document.getElementById('pgEmail').value;
        document.getElementById('profileContact').innerHTML = `<span>${email}</span>`;
        
        // Education
        const undergrad = document.getElementById('pgUndergrad').value;
        const major = document.getElementById('pgMajor').value;
        const gpa = document.getElementById('pgGPA').value;
        const graduation = document.getElementById('pgGraduation').value;
        
        let educationHtml = `<h3>${major}</h3><div class="education-institution">${undergrad}`;
        
        if (graduation) educationHtml += `, Expected ${new Date(graduation).getFullYear()}`;
        if (gpa) educationHtml += ` | GPA: ${gpa}`;
        
        educationHtml += '</div>';
        
        document.getElementById('profileEducation').innerHTML = educationHtml;
        
        // Research Interests
        document.getElementById('profileInterests').textContent = document.getElementById('pgInterests').value;
        
        // Research Experience
        const researchItems = [];
        const researchEntries = document.querySelectorAll('.research-entry');
        
        researchEntries.forEach((entry, index) => {
            const title = entry.querySelector(`#researchTitle${index}`).value;
            const institution = entry.querySelector(`#researchInstitution${index}`).value;
            const start = entry.querySelector(`#researchStart${index}`).value;
            const end = entry.querySelector(`#researchEnd${index}`).value || 'Present';
            const advisor = entry.querySelector(`#researchAdvisor${index}`).value;
            const description = entry.querySelector(`#researchDescription${index}`).value;
            
            const bullets = description.split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('');
            
            let researchHtml = `<h3>${title}</h3><div class="research-details"><span class="institution">${institution}</span><span class="date">${formatDate(start)} - ${end === 'Present' ? 'Present' : formatDate(end)}</span></div>`;
            
            if (advisor) researchHtml += `<div class="advisor">Advisor: ${advisor}</div>`;
            if (bullets) researchHtml += `<ul class="research-description">${bullets}</ul>`;
            
            researchItems.push(`<div class="research-item">${researchHtml}</div>`);
        });
        
        document.getElementById('profileResearch').innerHTML = researchItems.join('') || '<p>No research experience listed</p>';
        
        // Academic Projects
        const projectItems = [];
        const projectEntries = document.querySelectorAll('.project-entry');
        
        projectEntries.forEach((entry, index) => {
            const title = entry.querySelector(`#projectTitle${index}`).value;
            const course = entry.querySelector(`#projectCourse${index}`).value;
            const date = entry.querySelector(`#projectDate${index}`).value;
            const description = entry.querySelector(`#projectDescription${index}`).value;
            
            const bullets = description.split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('');
            
            let projectHtml = `<h3>${title}</h3><div class="project-details">`;
            
            if (course) projectHtml += `<span class="course">${course}</span>`;
            if (date) projectHtml += `<span class="date">${formatDate(date)}</span>`;
            
            projectHtml += `</div><ul class="project-description">${bullets}</ul>`;
            
            projectItems.push(`<div class="project-item">${projectHtml}</div>`);
        });
        
        document.getElementById('profileProjects').innerHTML = projectItems.join('') || '<p>No academic projects listed</p>';
        
        // Publications
        const publications = document.getElementById('pgPublications').value;
        document.getElementById('profilePublications').innerHTML = publications.split('\n').filter(line => line.trim()).map(line => `<p>${line.trim()}</p>`).join('') || '<p>No publications listed</p>';
        
        // Awards
        const awards = document.getElementById('pgAwards').value;
        document.getElementById('profileAwards').innerHTML = awards.split('\n').filter(line => line.trim()).map(line => `<p>${line.trim()}</p>`).join('') || '<p>No honors or awards listed</p>';
        
        // Career Goals
        document.getElementById('profileGoals').textContent = document.getElementById('pgGoals').value;
        
        // Enable download button
        document.getElementById('downloadProfile').disabled = false;
        
        // Scroll to preview
        document.getElementById('profileOutput').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Quotes Carousel
    const quoteCards = document.querySelectorAll('.quote-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    let autoSlideInterval;
    
    function showQuote(index) {
        // Wrap around if at beginning or end
        if (index >= quoteCards.length) index = 0;
        if (index < 0) index = quoteCards.length - 1;
        
        // Hide all quotes
        quoteCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected quote
        quoteCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function nextQuote() {
        showQuote(currentIndex + 1);
    }
    
    function prevQuote() {
        showQuote(currentIndex - 1);
    }
    
    // Button event listeners
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextQuote);
        prevBtn.addEventListener('click', prevQuote);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showQuote(index));
    });
    
    // Auto-advance quotes
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextQuote, 8000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto slide when carousel is in view
    const carouselObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startAutoSlide();
        } else {
            stopAutoSlide();
        }
    }, { threshold: 0.5 });
    
    if (document.querySelector('.quotes-carousel')) {
        carouselObserver.observe(document.querySelector('.quotes-carousel'));
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextQuote();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowLeft') {
            prevQuote();
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
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
    
    // HR Contacts Filter
    const industryFilter = document.getElementById('industryFilter');
    const locationFilter = document.getElementById('locationFilter');
    const contactCards = document.querySelectorAll('.contact-card');
    
    function filterContacts() {
        const industryValue = industryFilter.value;
        const locationValue = locationFilter.value;
        
        contactCards.forEach(card => {
            const cardIndustry = card.getAttribute('data-industry');
            const cardLocation = card.getAttribute('data-location');
            
            const industryMatch = !industryValue || cardIndustry === industryValue;
            const locationMatch = !locationValue || cardLocation === locationValue;
            
            if (industryMatch && locationMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    if (industryFilter && locationFilter) {
        industryFilter.addEventListener('change', filterContacts);
        locationFilter.addEventListener('change', filterContacts);
    }
    
    // Search functionality for HR contacts
    const searchBox = document.querySelector('.search-box input');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            contactCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Launch countdown timer
    function updateCountdown() {
        const launchDate = new Date();
        launchDate.setDate(launchDate.getDate() + 45); // 45 days from now
        
        const now = new Date();
        const diff = launchDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
    }
    
    if (document.getElementById('launchCountdown')) {
        updateCountdown();
        setInterval(updateCountdown, 60000); // Update every minute
    }
    
    // Download buttons (placeholder functionality)
    document.getElementById('downloadResume')?.addEventListener('click', () => {
        alert('In a full implementation, this would generate a PDF of your resume.');
    });
    
    document.getElementById('printResume')?.addEventListener('click', () => {
        window.print();
    });
    
    document.getElementById('downloadProfile')?.addEventListener('click', () => {
        alert('In a full implementation, this would generate a PDF of your academic profile.');
    });
    
    // Analyze resume button
    document.getElementById('analyzeResume')?.addEventListener('click', () => {
        alert('This feature would analyze your resume against job descriptions and provide improvement suggestions.');
    });
    
    // SOP generator button
    document.getElementById('sopGenerator')?.addEventListener('click', () => {
        alert('This feature would help you generate a statement of purpose based on your academic profile.');
    });
    
    // Notify me buttons
    document.querySelectorAll('.notify-form button').forEach(btn => {
        btn.addEventListener('click', function() {
            const email = this.parentElement.querySelector('input').value;
            if (email && email.includes('@')) {
                alert(`Thank you! We'll notify you at ${email} when this feature is available.`);
                this.parentElement.querySelector('input').value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });
    
    // Save buttons
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-check"></i> Saved';
            setTimeout(() => {
                this.innerHTML = '<i class="far fa-bookmark"></i> Save';
            }, 2000);
        });
    });
    
    // Contact buttons
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.contact-card');
            const name = card.querySelector('h4').textContent;
            alert(`This would open a message form to contact ${name}.`);
        });
    });
});
