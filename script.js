document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.btn-mobile');
    const navList = document.querySelector('.nav-list');
    const mobileIcon = document.querySelector('.btn-mobile i');
    const header = document.getElementById('header');
    const reveals = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = header.offsetHeight;

    const navLinksMap = new Map();
    sections.forEach(section => {
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-list a[href*="${id}"]`);
        if (link) {
            navLinksMap.set(id, link);
        }
    });

    // ---------= MENU MOBILE =---------
    const toggleMenu = () => {
        navList.classList.toggle('show');
        mobileIcon.classList.toggle('fa-bars');
        mobileIcon.classList.toggle('fa-xmark');
    };

    mobileBtn.addEventListener('click', toggleMenu);

    navList.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
            navList.classList.remove('show');
            mobileIcon.classList.add('fa-bars');
            mobileIcon.classList.remove('fa-xmark');
        })
    );

    // ---------= SCROLL =---------
    const handleHeaderState = (scrollY) => {
        if (scrollY > 0) { 
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // ---------= REVEAL =---------
    const handleReveal = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    const handleActiveLink = (scrollDown) => {
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 450;
            const sectionId = current.getAttribute('id');
            
            const link = navLinksMap.get(sectionId);

            if (link) {
                if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    };

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        handleHeaderState(currentScrollY);
        handleReveal(); 
        handleActiveLink(currentScrollY);
    });
});