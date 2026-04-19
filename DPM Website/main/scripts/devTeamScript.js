const teamMembers = [
    {
        name: "Kamohelo Phatsoane",
        role: "Lead Full-Stack Developer",
        bio: "Passionate about building beautiful, performant user interfaces with React and Three.js.",
        image: "assets/Team/Kamohelo.jpeg",
        fullBio: "Kamohelo has over 3 years of experience crafting modern web experiences. Good in C#, Dart, HTML/CSS, JavaScript, Python, mobile app development using Flutter and 3D web animations. ",
        github: "https://github.com/Truce-hash",
        linkedin: "https://www.linkedin.com/in/kamohelo-phatsoane-2650883b6"
    },
    {
        name: "Sibusiso Lukhele",
        role: "Full-Stack Developer",
        bio: "Focused on building excellence and creating opportunities for future generations",
        image: "assets/Team/Sibusiso.jpeg",
        fullBio: "Sibusiso specializes in high-performance backend systems. Good in C#, Dart, HTML/CSS, JavaScript and mobile app development using flutter. Passionate about building scalable and efficient applications that solve real-world problems.",
        github: "https://github.com/blessingmikay19-cyber",
        linkedin: "https://www.linkedin.com/in/sibusiso-lukhele-a96494404/"
    },
    {
        name: "Asinikile Sodlulashe",
        role: "Frontend Developer",
        bio: "Passionate about building responsive and user-friendly web interfaces.",
        image: "assets/Team/Cruz.jpeg",
        fullBio: "Asinikile is a frontend developer focused on creating clean, interactive, and accessible web experiences using modern technologies like HTML, CSS, and JavaScript. Enjoys turning ideas into visually appealing and functional designs.",
        github: "https://github.com/sodlulasheasinikile-debug",
        linkedin: "#"
    },
    {
        name: "Siphosethu Mbasa",
        role: "Frontend Developer",
        bio: "Creating delightful experiences. Obsessed with motion design and developer experience.",
        image: "assets/Team/siphosethu.jpg",
        fullBio: "Say what you're good at here.",
        github: "#",
        linkedin: "#"
    },
    {
        name: "Roman Tshabalala",
        role: "Backend Developer",
        bio: "Say what you're good at here.",
        image: "assets/Team/roman.jpg",
        fullBio: "Casey ensures our systems are reliable, secure, and scalable. Expert in CI/CD pipelines and infrastructure as code.",
        github: "#",
        linkedin: "#"
    },
    {
        name: "Musa Bonga",
        role: "Backend Developer",
        bio: "Say what you're good at here.",
        image: "assets/Team/musa.jpg",
        fullBio: "Riley loves delivering pixel-perfect experiences on every platform. Always exploring new mobile technologies and interaction patterns.",
        github: "#",
        linkedin: "#"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const scene = document.querySelector('.scene');
    
    const numSlides = teamMembers.length;
    const angleStep = 360 / numSlides;
    const radius = 395;

    let currentAngle = 0;
    let autoRotateInterval = null;
    let isPaused = false;
    let currentSlideIndex = 0;

    // Create slides
    teamMembers.forEach((member, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.dataset.index = index;
        
        const rotation = index * angleStep;
        slide.style.transform = `rotateY(${rotation}deg) translateZ(${radius}px)`;
        
        slide.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <div class="profile-overlay">
                <div class="profile-info">
                    <h3 class="name">${member.name}</h3>
                    <p class="role">${member.role}</p>
                </div>
                <div class="profile-bio">${member.bio}</div>
                <button class="view-profile-btn">View Full Profile</button>
            </div>
        `;
        
        // Click anywhere on slide to bring to front
        slide.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-profile-btn')) return;
            
            currentSlideIndex = index;
            rotateToSlide(index);
        });
        
        carousel.appendChild(slide);
    });

    const rotateToSlide = (index) => {
        isPaused = true;
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
        
        currentAngle = -index * angleStep;
        carousel.style.transition = 'transform 1.1s cubic-bezier(0.23, 1, 0.32, 1)';
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
        
        // Resume auto-rotate after a few seconds
        setTimeout(() => {
            if (!isPaused) startAutoRotate();
        }, 4500);
    };

    const startAutoRotate = () => {
        if (autoRotateInterval) clearInterval(autoRotateInterval);
        
        autoRotateInterval = setInterval(() => {
            if (!isPaused) {
                currentSlideIndex = (currentSlideIndex + 1) % numSlides;
                currentAngle = -currentSlideIndex * angleStep;
                carousel.style.transition = 'transform 0.9s cubic-bezier(0.25, 1, 0.35, 1)';
                carousel.style.transform = `rotateY(${currentAngle}deg)`;
            }
        }, 3400);
    };

    // Hover handling
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            isPaused = true;
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        });

        slide.addEventListener('mouseleave', () => {
            isPaused = false;
            setTimeout(() => {
                if (!isPaused) startAutoRotate();
            }, 900);
        });
    });

    // Modal functionality
    function showProfileModal(index) {
        const member = teamMembers[index];
        const modalHTML = `
            <div class="modal-overlay" id="profile-modal">
                <div class="modal-content">
                    <button class="modal-close">×</button>
                    <img src="${member.image}" alt="${member.name}" class="modal-image">
                    <h2>${member.name}</h2>
                    <p class="modal-role">${member.role}</p>
                    <p class="modal-bio">${member.fullBio}</p>
                    
                    <div class="social-links">
                        <a href="${member.github}" target="_blank" class="social-btn">GitHub</a>
                        <a href="${member.linkedin}" target="_blank" class="social-btn">LinkedIn</a>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('profile-modal');
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // Attach View Profile button listeners
    setTimeout(() => {
        document.querySelectorAll('.view-profile-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const slide = e.target.closest('.slide');
                const index = parseInt(slide.dataset.index);
                showProfileModal(index);
            });
        });
    }, 100);

    // Start everything
    startAutoRotate();

    console.log('%c✅ Phase 3 Complete: Clickable Team Showcase with Modal Profiles!', 'color:#0ff; font-weight:bold');
});