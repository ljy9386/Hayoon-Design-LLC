// GSAP ScrollTrigger 초기화
gsap.registerPlugin(ScrollTrigger);

// 전역 변수
let currentSection = 0;
let isScrolling = false;
let scrollTimeout;

// 섹션 배열 (DOM 로드 후 초기화)
let sections = [];

// 포트폴리오 데이터
const portfolioData = {
    'moon-glass-chamber': {
        title: 'Moon in Glass Chamber',
        category: 'Sculpture Design',
        image: 'img/portrait-placeholder.jpg',
        description: 'A contemporary sculpture piece that explores the relationship between light, space, and form. This installation creates an ethereal atmosphere through the interplay of glass and illumination, inviting viewers to contemplate the boundaries between reality and perception.',
        client: 'Contemporary Art Gallery',
        year: '2024',
        services: 'Conceptual Design, Material Selection, Installation',
        gallery: [
            'img/Roundabout+Sculpture.jpg',
            'img/Guardians+and+Landscape.jpg',
            'img/Archive_3.jpg',
            'img/Vestibule_Option1.jpg',
        ],
        images: [
            'img/Moon+in+Glass+Chamber.jpg',
        ]
    },
    'roundabout-sculpture': {
        title: 'Roundabout Sculpture',
        category: 'Public Art Installation',
        image: 'img/Roundabout+Sculpture.jpg',
        description: 'A large-scale public art installation designed for urban environments. This sculpture serves as both an aesthetic landmark and a functional element, creating visual interest while maintaining traffic flow considerations.',
        client: 'City Planning Department',
        year: '2024',
        services: 'Public Art Design, Urban Planning, Community Engagement',
        gallery: [
            'img/Moon+in+Glass+Chamber.jpg',
            'img/Guardians+and+Landscape.jpg',
            'img/Archive_3.jpg',
            'img/Vestibule_Option1.jpg',
        ],
        images: [
            'img/Roundabout+Sculpture.jpg',
        ]
    },
    'brand-identity-1': {
        title: 'Brand Identity Collection',
        category: 'Brand Design',
        image: 'img/Guardians+and+Landscape.JPG',
        description: 'A comprehensive brand identity system that captures the essence of modern luxury and sophistication. The design language emphasizes clean lines, premium materials, and timeless aesthetics that resonate with discerning audiences.',
        client: 'Luxury Lifestyle Brand',
        year: '2024',
        services: 'Brand Strategy, Logo Design, Visual Identity, Brand Guidelines',
        gallery: [
            'img/Moon+in+Glass+Chamber.jpg',
            'img/Roundabout+Sculpture.jpg',
            'img/Archive_3.jpg',
            'img/Vestibule_Option1.jpg',
        ],
        images: [
            'img/Guardians+and+Landscape.JPG',
            'img/Guardians+and+Landscape_2.JPG',
        ]
    },
    'brand-identity-2': {
        title: 'Corporate Identity',
        category: 'Brand Design',
        image: 'img/Archive_3.jpg',
        description: 'A complete corporate identity overhaul that modernizes the brand while maintaining its heritage values. The new system provides flexibility across digital and print applications while ensuring consistent brand recognition.',
        client: 'Technology Corporation',
        year: '2024',
        services: 'Brand Refresh, Corporate Identity, Digital Applications, Print Design',
        gallery: [
            'img/Moon+in+Glass+Chamber.jpg',
            'img/Vestibule_Option1.jpg',
            'img/Roundabout+Sculpture.jpg',
            'img/Guardians+and+Landscape.JPG'
           
        ],
        images: [
            'img/Archive_1.jpg',
            'img/Archive_2.jpg',
            'img/Archive_3.jpg',
            'img/Archive_4.jpg'
        ]
    },
    'spectral': {
        title: 'Spectral',
        category: 'Digital Experience',
        image: 'img/spectral-placeholder.jpg',
        description: 'An immersive digital experience that pushes the boundaries of web design and user interaction. This project combines cutting-edge technology with intuitive design to create a memorable and engaging user journey.',
        client: 'Digital Agency',
        year: '2024',
        services: 'Web Design, User Experience, Frontend Development, Motion Graphics',
        gallery: [
            'img/Moon+in+Glass+Chamber.jpg',
            'img/Roundabout+Sculpture.jpg',
            'img/Guardians+and+Landscape.JPG',
            'img/Archive_3.jpg',
        ],
        images: [
            'img/Vestibule_Option1.jpg',
        ]
    },
    'nevora': {
        title: 'Nevora',
        category: 'Brand Identity',
        image: 'img/nevora-placeholder.jpg',
        description: 'A bold and distinctive brand identity that captures the innovative spirit of a forward-thinking company. The design system balances creativity with professionalism, creating a strong visual presence in competitive markets.',
        client: 'Innovation Startup',
        year: '2024',
        services: 'Brand Strategy, Logo Design, Visual Identity, Marketing Materials',
        gallery: [
            'img/nevora-placeholder.jpg',
            'img/spectral-placeholder.jpg',
            'img/luminara-placeholder.jpg'
        ],
        images: [
            'img/nevora-placeholder.jpg',
            'img/spectral-placeholder.jpg'
        ]
    },
    'luminara': {
        title: 'Luminara',
        category: 'Brand Identity',
        image: 'img/luminara-placeholder.jpg',
        description: 'A luminous brand identity that embodies elegance and sophistication. The design philosophy centers around light, clarity, and premium quality, creating a memorable brand experience across all touchpoints.',
        client: 'Premium Lifestyle Brand',
        year: '2024',
        services: 'Brand Development, Visual Identity, Packaging Design, Digital Applications',
        gallery: [
            'img/luminara-placeholder.jpg',
            'img/nevora-placeholder.jpg',
            'img/spectral-placeholder.jpg'
        ],
        images: [
            'img/luminara-placeholder.jpg',
            'img/nevora-placeholder.jpg'
        ]
    },
    'portrait-study': {
        title: 'Portrait Study',
        category: 'Photography',
        image: 'img/portrait-placeholder.jpg',
        description: 'A series of intimate portrait photographs that explore human emotion and character. This collection demonstrates mastery of lighting, composition, and the ability to capture authentic moments of vulnerability and strength.',
        client: 'Portrait Photography',
        year: '2024',
        services: 'Portrait Photography, Lighting Design, Post-Production, Art Direction',
        gallery: [
            'img/portrait-placeholder.jpg',
            'img/Moon+in+Glass+Chamber.jpg',
            'img/Roundabout+Sculpture.jpg'
        ],
        images: [
            'img/portrait-placeholder.jpg',
            'img/Moon+in+Glass+Chamber.jpg'
        ]
    }
};

// 스크롤 하이재킹 구현
class ScrollManager {
    constructor() {
        this.currentIndex = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.animatedSections = new Set(); // 애니메이션을 이미 적용한 섹션 추적
        this.init();
    }

    init() {
        this.initializeElements();
        this.setupScrollTrigger();
        this.setupWheelEvent();
        this.setupKeyboardNavigation();
        this.setupNavigationLinks();
        this.setupScrollListener();
        this.setupInitialAnimations();
        this.setupPortfolioAnimations();
    }

    initializeElements() {
        // 섹션 배열 초기화
        sections = [
            document.querySelector('.hero'),
            document.querySelector('.work-container'),
            document.querySelector('.awards-section')
        ];
        
        console.log('Sections found:', sections.length);
    }

    setupScrollTrigger() {
        // 각 섹션에 ScrollTrigger 설정 (pin 비활성화)
        sections.forEach((section, index) => {
            if (section) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    pin: false,
                    onEnter: () => {
                        this.currentIndex = index;
                        this.updateNavigation();
                        // 첫 진입 시에만 애니메이션 실행
                        const sectionId = section.className;
                        if (!this.animatedSections.has(sectionId)) {
                            this.animateSectionContent(section);
                            this.animatedSections.add(sectionId);
                        }
                    },
                    onLeave: () => {
                        // 섹션 나갈 때 애니메이션 제거하지 않음
                    }
                });
            }
        });
    }

    setupScrollListener() {
        // 일반적인 스크롤 이벤트 리스너
        window.addEventListener('scroll', () => {
            this.updateCurrentSection();
        });
    }

    updateCurrentSection() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        sections.forEach((section, index) => {
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop - windowHeight / 2 && 
                    scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
                    if (this.currentIndex !== index) {
                        this.currentIndex = index;
                        this.updateNavigation();
                        // 첫 진입 시에만 애니메이션 실행
                        const sectionId = section.className;
                        if (!this.animatedSections.has(sectionId)) {
                            this.animateSectionContent(section);
                            this.animatedSections.add(sectionId);
                        }
                    }
                }
            }
        });
    }

    setupWheelEvent() {
        // 기본 스크롤 사용 - 휠 이벤트 하이재킹 비활성화
        // 일반적인 스크롤 동작을 허용
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === ' ') {
                // e.preventDefault();
                this.nextSection();
            } else if (e.key === 'ArrowUp') {
                // e.preventDefault();
                this.previousSection();
            }
        });
    }

    setupNavigationLinks() {
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSection(index);
            });
        });

        // Contact Me 버튼
        const contactBtn = document.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                this.goToSection(sections.length - 1); // Awards 섹션으로 이동
            });
        }
    }

    nextSection() {
        if (this.currentIndex < sections.length - 1) {
            this.currentIndex++;
            this.goToSection(this.currentIndex);
        }
    }

    previousSection() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.goToSection(this.currentIndex);
        }
    }

    goToSection(index) {
        if (index < 0 || index >= sections.length) return;
        
        this.currentIndex = index;
        const targetSection = sections[index];
        
        if (targetSection) {
            // 간단한 스크롤 애니메이션
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // 애니메이션 완료 후 콘텐츠 애니메이션 (첫 진입 시에만)
            setTimeout(() => {
                this.updateNavigation();
                const sectionId = targetSection.className;
                if (!this.animatedSections.has(sectionId)) {
                    this.animateSectionContent(targetSection);
                    this.animatedSections.add(sectionId);
                }
            }, 500);
        }
    }

    handleScrollUpdate(self) {
        // 스크롤 진행률에 따른 추가 애니메이션
        const progress = self.progress;
        
        // 네비게이션 투명도 조절
        const nav = document.querySelector('.nav');
        if (nav) {
            gsap.to(nav, {
                opacity: progress > 0.1 ? 1 : 0.8,
                duration: 0.3
            });
        }
    }

    animateSectionContent(section) {
        // 섹션별 콘텐츠 애니메이션
        if (section.classList.contains('hero')) {
            this.animateHeroContent();
        } else if (section.classList.contains('work-container')) {
            this.animatePortfolioContent();
        } else if (section.classList.contains('awards-section')) {
            this.animateAwardsContent();
        }
    }

    animateHeroContent() {
        const heroTitle = document.querySelector('.hero-title');
        const heroImage = document.querySelector('.hero-image');
        const heroDescription = document.querySelector('.hero-description');
        const heroLogo = document.querySelector('.hero-logo-img');
        
        // 이미 애니메이션된 요소는 건너뛰기
        const elements = [heroTitle, heroImage, heroDescription, heroLogo];
        if (elements.some(el => el && gsap.getProperty(el, "opacity") === 1)) {
            return; // 이미 표시되어 있으면 애니메이션 건너뛰기
        }
        
        if (heroTitle) {
            gsap.to(heroTitle, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
        }
        
        if (heroImage) {
            gsap.to(heroImage, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.3 });
        }
        
        if (heroDescription) {
            gsap.to(heroDescription, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 });
        }
        
        if (heroLogo) {
            gsap.to(heroLogo, { opacity: 1, scale: 1, rotation: 0, duration: 1.5, ease: "power2.out", delay: 0.2 });
        }
    }

    animatePortfolioContent() {
        const workTitle = document.querySelector('.work-title');
        const workSubtitle = document.querySelector('.work-subtitle');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // 이미 애니메이션된 요소는 건너뛰기
        const elements = [workTitle, workSubtitle, ...portfolioItems];
        if (elements.some(el => el && gsap.getProperty(el, "opacity") === 1)) {
            return; // 이미 표시되어 있으면 애니메이션 건너뛰기
        }
        
        if (workTitle) {
            gsap.to(workTitle, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
        }
        
        if (workSubtitle) {
            gsap.to(workSubtitle, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 });
        }
        
        if (portfolioItems.length > 0) {
            gsap.to(portfolioItems, { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power2.out", 
                stagger: 0.1,
                delay: 0.4
            });
        }
    }

    animateAwardsContent() {
        const awardsTitle = document.querySelector('.awards-title');
        const awardItems = document.querySelectorAll('.award-item');
        const copyright = document.querySelector('.copyright span');
        
        // 이미 애니메이션된 요소는 건너뛰기
        const elements = [awardsTitle, ...awardItems, copyright];
        if (elements.some(el => el && gsap.getProperty(el, "opacity") === 1)) {
            return; // 이미 표시되어 있으면 애니메이션 건너뛰기
        }
        
        if (awardsTitle) {
            gsap.to(awardsTitle, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
        }
        
        if (awardItems.length > 0) {
            gsap.to(awardItems, { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                ease: "power2.out", 
                stagger: 0.1,
                delay: 0.3
            });
        }
        
        if (copyright) {
            gsap.to(copyright, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.8 });
        }
    }

    animateSectionOut(section) {
        // 섹션에서 나갈 때의 애니메이션
        const elements = section.querySelectorAll('.project-title, .hero-title, .awards-title, .work-title');
        
        gsap.to(elements, {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.in"
        });
    }

    updateNavigation() {
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === this.currentIndex);
        });
    }

    setupInitialAnimations() {
        // 초기 로드 시 애니메이션
        const nav = document.querySelector('.nav');
        if (nav) {
            gsap.fromTo(nav, 
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 }
            );
        }
        
        // 첫 번째 섹션 애니메이션 - 이미 진행 중이면 중단
        if (sections[0]) {
            const sectionId = sections[0].className;
            if (!this.animatedSections.has(sectionId)) {
                this.animateSectionContent(sections[0]);
                this.animatedSections.add(sectionId);
            }
        }
    }

    setupPortfolioAnimations() {
        // 포트폴리오 아이템 호버 애니메이션
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const image = item.querySelector('img');
            const overlay = item.querySelector('.portfolio-overlay');
            
            item.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    scale: 1.05,
                    duration: 0.6,
                    ease: "power2.out"
                });
                
                gsap.to(overlay, {
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });
                
                gsap.to(overlay, {
                    y: "100%",
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        });
    }
}

// 포트폴리오 모달 관리
class PortfolioModal {
    constructor() {
        this.modal = document.getElementById('portfolioModal');
        this.closeBtn = document.getElementById('modalClose');
        this.backdrop = this.modal.querySelector('.modal-backdrop');
        this.container = this.modal.querySelector('.modal-container');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupPortfolioClicks();
    }

    setupEventListeners() {
        // 닫기 버튼
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // 백드롭 클릭
        this.backdrop.addEventListener('click', () => {
            this.closeModal();
        });

        // ESC 키
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    setupPortfolioClicks() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach((item, index) => {
            // 각 아이템에 고유 ID 부여
            const projectKeys = Object.keys(portfolioData);
            const projectKey = projectKeys[index] || 'default';
            
            item.addEventListener('click', () => {
                this.openModal(projectKey);
            });
        });
    }

    openModal(projectKey) {
        const project = portfolioData[projectKey];
        if (!project) return;

        // 모달 내용 업데이트
        this.updateModalContent(project);
        
        // 모달 표시
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // GSAP 애니메이션
        gsap.fromTo(this.modal, 
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        
        gsap.fromTo(this.container,
            { scale: 0.9, y: 50, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 }
        );
    }

    closeModal() {
        // GSAP 애니메이션
        gsap.to(this.container, {
            scale: 0.9,
            y: 50,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });
        
        gsap.to(this.modal, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            delay: 0.1,
            onComplete: () => {
                this.modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    updateModalContent(project) {
        // 제목과 카테고리
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalCategory').textContent = project.category;
        
        // 이미지
        const modalImage = document.getElementById('modalMainImage');
        modalImage.src = project.image;
        modalImage.alt = project.title;
        
        // 설명
        const descriptionElement = document.getElementById('modalDescription');
        descriptionElement.querySelector('p').textContent = project.description;
        
        // 프로젝트 정보
        document.getElementById('modalClient').textContent = project.client;
        document.getElementById('modalYear').textContent = project.year;
        document.getElementById('modalServices').textContent = project.services;
        
        // 이미지 섹션 업데이트
        this.updateImagesSection(project.images);
        
        // 갤러리 업데이트
        this.updateGallery(project.gallery);
    }

    updateImagesSection(images) {
        const imagesGrid = document.getElementById('imagesGrid');
        
        // 기존 이미지 섹션 내용 제거
        imagesGrid.innerHTML = '';
        
        // 이미지들 추가
        images.forEach((imageSrc, index) => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Portfolio image ${index + 1}`;
            img.loading = 'lazy';
            
            imageItem.appendChild(img);
            imagesGrid.appendChild(imageItem);
            
            // 이미지 아이템 클릭 이벤트 (메인 이미지로 교체)
            imageItem.addEventListener('click', () => {
                this.setMainImage(imageSrc);
            });
        });
        
        // 이미지 섹션 애니메이션
        gsap.fromTo(imagesGrid.children, 
            { opacity: 0, y: 40 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power2.out", 
                stagger: 0.15,
                delay: 0.2
            }
        );
    }

    updateGallery(galleryImages) {
        const galleryGrid = document.getElementById('galleryGrid');
        
        // 기존 갤러리 내용 제거
        galleryGrid.innerHTML = '';
        
        // 갤러리 이미지들 추가
        galleryImages.forEach((imageSrc, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Gallery image ${index + 1}`;
            img.loading = 'lazy';
            
            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);
            
            // 갤러리 아이템 클릭 이벤트 (메인 이미지로 교체)
            galleryItem.addEventListener('click', () => {
                this.setMainImage(imageSrc);
            });
        });
        
        // 갤러리 애니메이션
        gsap.fromTo(galleryGrid.children, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                ease: "power2.out", 
                stagger: 0.1,
                delay: 0.3
            }
        );
    }

    setMainImage(imageSrc) {
        const modalImage = document.getElementById('modalMainImage');
        
        // 부드러운 이미지 전환 애니메이션
        gsap.to(modalImage, {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                modalImage.src = imageSrc;
                gsap.to(modalImage, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    }
}

// 커스텀 커서 효과 (선택적 사용)
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        this.init();
    }

    init() {
        // 마우스 이동 시 커스텀 커서 표시
        document.addEventListener('mousemove', (e) => {
            this.cursor.classList.add('visible');
            gsap.to(this.cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        // 호버 효과
        const hoverElements = document.querySelectorAll('a, button, .contact-btn, .award-item, .portfolio-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('visible');
                gsap.to(this.cursor, {
                    scale: 2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(this.cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // 마우스가 페이지를 벗어날 때 커스텀 커서 숨기기
        document.addEventListener('mouseleave', () => {
            this.cursor.classList.remove('visible');
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.classList.add('visible');
        });
    }
}

// 이미지 로딩 최적화
class ImageLoader {
    constructor() {
        this.loadImages();
    }

    loadImages() {
        const images = [
            'img/portrait-placeholder.jpg',
            'img/spectral-placeholder.jpg',
            'img/nevora-placeholder.jpg',
            'img/luminara-placeholder.jpg',
            'img/Moon+in+Glass+Chamber.jpg',
            'img/Roundabout+Sculpture.jpg',
            'img/logo1.jpg',
            'img/logo2.jpg'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                console.log(`이미지 로드 완료: ${src}`);
            };
        });
    }
}

// 초기 요소 숨기기 (DOM 로드 전 실행)
function initializeElements() {
    // Hero 섹션 요소들
    const heroElements = {
        '.hero-title': { opacity: 0, y: 50 },
        '.hero-image': { opacity: 0, scale: 0.8 },
        '.hero-description': { opacity: 0, y: 30 },
        '.hero-logo-img': { opacity: 0, scale: 0.5, rotation: -180 }
    };
    
    // Portfolio 섹션 요소들
    const portfolioElements = {
        '.work-title': { opacity: 0, y: 50 },
        '.work-subtitle': { opacity: 0, y: 30 },
        '.portfolio-item': { opacity: 0, y: 50 }
    };
    
    // Awards 섹션 요소들
    const awardsElements = {
        '.awards-title': { opacity: 0, y: 50 },
        '.award-item': { opacity: 0, y: 30 },
        '.copyright span': { opacity: 0, scale: 0.8 }
    };
    
    // 모든 요소 초기화
    [heroElements, portfolioElements, awardsElements].forEach(elementSet => {
        Object.entries(elementSet).forEach(([selector, props]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element) {
                    gsap.set(element, props);
                }
            });
        });
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // 초기 요소 상태 설정
    initializeElements();
    
    // 스크롤 매니저 초기화
    const scrollManager = new ScrollManager();
    
    // 포트폴리오 모달 초기화
    const portfolioModal = new PortfolioModal();
    
    // 커스텀 커서 초기화 (비활성화)
    // const customCursor = new CustomCursor();
    
    // 이미지 로더 초기화
    const imageLoader = new ImageLoader();
    
    // 리사이즈 이벤트 처리
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
    
    // 페이지 가시성 변경 시 ScrollTrigger 새로고침
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            ScrollTrigger.refresh();
        }
    });
    
    console.log('Initialization complete');
});

// CSS에 기본 커서 스타일 추가
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .nav-list a.active {
        color: #2C3E50;
        font-weight: 500;
    }
    
    /* 기본 커서 사용 */
    body {
        cursor: auto;
    }
    
    /* 호버 가능한 요소들에 포인터 커서 적용 */
    a, button, .contact-btn, .award-item, .portfolio-item {
        cursor: pointer !important;
    }
    
    /* 텍스트 선택 가능한 요소들 */
    p, h1, h2, h3, span {
        cursor: text;
    }
`;
document.head.appendChild(cursorStyle);