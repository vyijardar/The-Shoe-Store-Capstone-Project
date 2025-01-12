const dropdown = () => {
    // Select all elements with the 'has-dropdown' class
    const dropdownElements = document.querySelectorAll('.has-dropdown');

    // Add event listeners for mouseenter and mouseleave
    dropdownElements.forEach((element) => {
        const dropdownMenu = element.querySelector('.dropdown');

        // Show the dropdown on mouseenter
        element.addEventListener('mouseenter', () => {
            if (dropdownMenu) {
                dropdownMenu.style.display = 'block';
                dropdownMenu.classList.add('animated-fast', 'fadeInUpMenu');
            }
        });

        // Hide the dropdown on mouseleave
        element.addEventListener('mouseleave', () => {
            if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
                dropdownMenu.classList.remove('animated-fast', 'fadeInUpMenu');
            }
        });
    });
};

// Call the function
dropdown();

const offcanvasMenu = () => {
    // Create the offcanvas menu container and toggle button
    const page = document.getElementById('page');
    const offcanvas = document.createElement('div');
    offcanvas.id = 'colorlib-offcanvas';

    const toggleButton = document.createElement('a');
    toggleButton.href = '#';
    toggleButton.className = 'js-colorlib-nav-toggle colorlib-nav-toggle colorlib-nav-white';
    toggleButton.innerHTML = '<i></i>';

    // Add the offcanvas menu and toggle button to the page
    page.prepend(toggleButton);
    page.prepend(offcanvas);

    // Clone menu-1 and menu-2 content and append to the offcanvas menu
    const menu1 = document.querySelector('.menu-1 > ul');
    const menu2 = document.querySelector('.menu-2 > ul');

    if (menu1) {
        offcanvas.appendChild(menu1.cloneNode(true));
    }
    if (menu2) {
        offcanvas.appendChild(menu2.cloneNode(true));
    }

    // Add necessary classes for dropdown functionality
    const dropdownItems = offcanvas.querySelectorAll('.has-dropdown');
    dropdownItems.forEach((item) => {
        item.classList.add('offcanvas-has-dropdown');
        item.classList.remove('has-dropdown');
    });

    // Handle hover dropdown for mobile
    const offcanvasDropdowns = document.querySelectorAll('.offcanvas-has-dropdown');
    offcanvasDropdowns.forEach((dropdown) => {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.classList.add('active');
            const ul = dropdown.querySelector('ul');
            if (ul) {
                ul.style.display = 'block';
                ul.style.transition = 'max-height 0.5s ease-out';
                ul.style.maxHeight = `${ul.scrollHeight}px`;
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('active');
            const ul = dropdown.querySelector('ul');
            if (ul) {
                ul.style.maxHeight = '0';
                ul.style.transition = 'max-height 0.5s ease-out';
            }
        });
    });

    // Handle window resize to reset offcanvas state
    window.addEventListener('resize', () => {
        if (document.body.classList.contains('offcanvas')) {
            document.body.classList.remove('offcanvas');
            toggleButton.classList.remove('active');
        }
    });

    // Optional: Add functionality to toggle the offcanvas menu visibility
    toggleButton.addEventListener('click', (event) => {
        event.preventDefault();
        document.body.classList.toggle('offcanvas');
        toggleButton.classList.toggle('active');
    });
};

// Initialize the offcanvas menu
offcanvasMenu();
