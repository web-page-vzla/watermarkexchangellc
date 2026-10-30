document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Menú Hamburguesa para Mobile ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- 2. Indicador de Enlace Activo al hacer Scroll (Scrollspy) ---
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollActive);

    // --- 3. Animaciones con Scroll (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. Galería Dinámica por Categorías (Exactamente 4 imágenes por apartado) ---
    const galleryData = {
        themeparks: [
            { src: 'project-themeparks.jpg', title: 'Estructura Escenográfica Metal', desc: 'Soporte de acero forjado y tratamiento anti-corrosión.' },
            { src: 'project-themeparks-1.jpg', title: 'Fachada Temática en Madera', desc: 'Tallado a mano con detalles arquitectónicos inmersivos.' },
            { src: 'project-themeparks-2.jpg', title: 'Ensamblaje Escénico', desc: 'Herrería pesada ajustada para alto flujo de visitantes.' },
            { src: 'project-themeparks-3.jpg', title: 'Acabados Metálicos Rústicos', desc: 'Patina artesanal y envejecido térmico de precisión.' }
        ],
        residential: [
            { src: 'project-residential.jpg', title: 'Portón de Herrería Artística', desc: 'Hierro forjado con perfiles estructurales reforzados.' },
            { src: 'project-residential-1.jpg', title: 'Escalera Volada & Ebanistería', desc: 'Peldaños en madera maciza noble y barandal de acero.' },
            { src: 'project-residential-2.jpg', title: 'Pérgola Metálica de Exterior', desc: 'Estructura modular resistente a intemperie.' },
            { src: 'project-residential-3.jpg', title: 'Revestimiento de Madera Fina', desc: 'Paneles acústicos y acabados de lujo para interiores.' }
        ],
        hospitality: [
            { src: 'project-hospitality.jpg', title: 'Barra Principal en Acero & Madera', desc: 'Carpintería comercial pesada con remaches expuestos.' },
            { src: 'project-hospitality-1.jpg', title: 'Lobby Metalwork', desc: 'Divisores de ambiente geométricos en herrería fina.' },
            { src: 'project-hospitality-2.jpg', title: 'Mobiliario de Suite a Medida', desc: 'Combinación de roble seleccionado y estructuras metálicas.' },
            { src: 'project-hospitality-3.jpg', title: 'Cielo Raso Industrial', desc: 'Soporte y entramado de acero estructural pulido.' }
        ],
        museums: [
            { src: 'project-museums.jpg', title: 'Vitrinas de Alta Seguridad', desc: 'Estructura de acero micro-soldado y marcos de madera.' },
            { src: 'project-museums-1.jpg', title: 'Soportes de Exhibición', desc: 'Plates metálicos cortados a medida y bases sólidas.' },
            { src: 'project-museums-2.jpg', title: 'Estructura Expositora Aislante', desc: 'Carpintería técnica sin juntas visibles.' },
            { src: 'project-museums-3.jpg', title: 'Paneles de Exposición Modular', desc: 'Marcos de hierro liviano adaptables.' }
        ],
        film: [
            { src: 'project-film.jpg', title: 'Estructura para Set Cinematográfico', desc: 'Armazón metálico de rápido ensamblaje para rodaje.' },
            { src: 'project-film-1.jpg', title: 'Utilería en Madera & Metal', desc: 'Replicas hiperrealistas con acabado escénico.' },
            { src: 'project-film-2.jpg', title: 'Paneles Modulares de Escenario', desc: 'Uniones mecánicas de carpintería técnica.' },
            { src: 'project-film-3.jpg', title: 'Soportes de Efectos Físicos', desc: 'Refuerzos metálicos para carga pesada en set.' }
        ],
        restoration: [
            { src: 'project-restoration.jpg', title: 'Restauración de Herrajes Antiguos', desc: 'Tratamiento de oxidación y forjado de piezas perdidas.' },
            { src: 'project-restoration-1.jpg', title: 'Recuperación de Puerta Histórica', desc: 'Injertos en madera noble y barnizado protector.' },
            { src: 'project-restoration-2.jpg', title: 'Ornamentos de Hierro Fundido', desc: 'Réplicas moldeadas según especificación histórica.' },
            { src: 'project-restoration-3.jpg', title: 'Consolidación Estructural de Vigas', desc: 'Refuerzos de acero ocultos en estructuras antiguas.' }
        ]
    };

    const grid = document.getElementById('galleryGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    const renderGallery = (category) => {
        if (!grid) return;
        const items = galleryData[category] || [];
        grid.innerHTML = '';

        items.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.innerHTML = `
                <img src="${item.src}" alt="${item.title}">
                <div class="gallery-badge"><i class="fa-solid fa-magnifying-glass"></i></div>
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    // Cargar por defecto la primera categoría
    renderGallery('themeparks');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-filter');
            renderGallery(category);
        });
    });

    // --- 5. Manejo del Formulario de Contacto ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por comunicarte con el área técnica de Watermark Exchange LLC! Analizaremos tus requerimientos y te contactaremos en breve.');
            contactForm.reset();
        });
    }

});