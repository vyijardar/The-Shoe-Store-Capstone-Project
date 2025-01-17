document.addEventListener('DOMContentLoaded', () => {
    // Dropdown Functionality
    const dropdown = () => {
        const dropdownElements = document.querySelectorAll('.has-dropdown');
        
        dropdownElements.forEach((element) => {
            const dropdownMenu = element.querySelector('.dropdown');
            
            // Show dropdown on hover
            element.addEventListener('mouseenter', () => {
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'block';
                    dropdownMenu.classList.add('animated-fast', 'fadeInUpMenu');
                }
            });

            // Hide dropdown on mouse leave
            element.addEventListener('mouseleave', () => {
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'none';
                    dropdownMenu.classList.remove('animated-fast', 'fadeInUpMenu');
                }
            });
        });
    };

    // Offcanvas Menu Functionality
    const offcanvasMenu = () => {
        const page = document.getElementById('page');
        if (!page) {
            console.error('Error: Element with ID "page" not found.');
            return;
        }

        const offcanvas = document.createElement('div');
        offcanvas.id = 'colorlib-offcanvas';

        const toggleButton = document.createElement('a');
        toggleButton.href = '#';
        toggleButton.className = 'js-colorlib-nav-toggle colorlib-nav-toggle colorlib-nav-white';
        toggleButton.innerHTML = '<i></i>';

        // Prepend elements to the page
        page.prepend(toggleButton);
        page.prepend(offcanvas);

        // Clone and append menus
        ['menu-1', 'menu-2'].forEach((menuClass) => {
            const menu = document.querySelector(`.${menuClass} > ul`);
            if (menu) {
                offcanvas.appendChild(menu.cloneNode(true));
            }
        });

        // Add dropdown functionality
        const dropdownItems = offcanvas.querySelectorAll('.has-dropdown');
        dropdownItems.forEach((item) => {
            item.classList.add('offcanvas-has-dropdown');
            item.classList.remove('has-dropdown');
        });

        const offcanvasDropdowns = document.querySelectorAll('.offcanvas-has-dropdown');
        offcanvasDropdowns.forEach((dropdown) => {
            dropdown.addEventListener('mouseenter', () => {
                const ul = dropdown.querySelector('ul');
                if (ul) {
                    ul.style.display = 'block';
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                const ul = dropdown.querySelector('ul');
                if (ul) {
                    ul.style.display = 'none';
                }
            });
        });

        // Toggle offcanvas menu visibility
        toggleButton.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.toggle('offcanvas');
            toggleButton.classList.toggle('active');
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (document.body.classList.contains('offcanvas')) {
                document.body.classList.remove('offcanvas');
                toggleButton.classList.remove('active');
            }
        });
    };

    // Initialize functions
    dropdown();
    offcanvasMenu();
});
