/******************
 * Menu Behaviour *============================================================
 ******************/

let sideBar = false; // track whether sidebar menu is open or closed
let canToggle = true; // block toggling while menu is currently closing
const menu = document.getElementById("nav-desktop");
const tinter = document.getElementById("tinter");

// open and close the sidebar on mobile
function toggleMenu() {
    const icon = document.getElementById("menu-icon");
    // if sidebar is closed, open it
    if (!sideBar) {
        if (canToggle === true) {
            menu.style.transitionDuration = "0.3s";
            // make tinter display but set its opacity to 0
            tinter.style.display = "block";
            tinter.style.opacity = 0;
            // fade tinter in underneath sidebar
            setTimeout(() => {
                tinter.style.opacity = 0.7;
            }, this.animationDelay + 20);
            // make sidebar display, and have it slide in from left
            menu.style.display = "flex";
            menu.style.left = "-300px";
            setTimeout(() => {
                menu.style.left = "0px";
            }, this.animationDelay + 20);

            sideBar = true;

            if (!icon.classList.contains("change"))
                icon.classList.toggle("change");
        }
    }
    // if sidebar is open, close it
    else {
        canToggle = false;
        closeMenu();
    }
}

// close the menu
function closeMenu() {
    if (sideBar) {
        setTimeout(() => {
            menu.style.left = "-300px";
        }, this.animationDelay + 20);
        setTimeout(() => {
            tinter.style.opacity = 0;
        }, this.animationDelay + 20);
        setTimeout(() => {
            menu.style.display = "none";
            tinter.style.display = "none";
            menu.style.left = "0px";
            canToggle = true;
        }, 500);
        sideBar = false;
        const icon = document.getElementById("menu-icon");
        if (icon.classList.contains("change"))
            icon.classList.toggle("change");
    }
}

// make sure screen resizes don't break sidebar functionality
const mediaQuery = '(max-width: 768px)';
const mediaQueryList = window.matchMedia(mediaQuery);
mediaQueryList.addEventListener('change', event => {
    // mobile display mode
    if (event.matches) {
        mobileDropdownListeners();
        // hide nav menu if shown
        if (sideBar) {
            menu.style.display = "flex";
        } else {
            menu.style.transitionDuration = "0.3s";
            menu.style.display = "none";
            tinter.style.display = "none";
        }
    // desktop display road
    } else {
        closeDropdowns();
        const icon = document.getElementById("menu-icon");
        if (icon.classList.contains("change"))
            icon.classList.toggle("change");
        desktopDropdownListeners();
        menu.style.transitionDuration = "0s";
        menu.style.display = "flex";
        tinter.style.display = "none";
        sideBar = false;
    }
})

const dropdown = document.getElementsByClassName("dropdown");

// toggle dropdown menu open or closed
function toggleDropdown() {
    const dropdownContent = this.querySelector(".dropdown-content");
    const chevron = this.querySelector(".chevron");
    // if menu is open, close it
    if (dropdownContent.style.maxHeight) {
        // reset heights
        dropdownContent.style.maxHeight = null;
        dropdownContent.parentNode.style.minHeight = null;
        // reset chevron
        if (chevron.classList.contains("chevron-rotate"))
            chevron.classList.toggle("chevron-rotate");
    // if menu is closed, open it
    } else {
        // close all dropdowns (in case any others are open)
        closeDropdowns();
        // increase heights to animate menu opening
        dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
        dropdownContent.parentNode.style.minHeight = 41.5 + dropdownContent.scrollHeight + "px";
        // rotate chevron to show menu is open
        if (!chevron.classList.contains("chevron-rotate"))
            chevron.classList.toggle("chevron-rotate");
    }
}

// closes all open dropdown menus
function closeDropdowns() {
    for (let i = 0; i < dropdown.length; i++) {
        // reset height values
        const dropdownContent = dropdown[i].querySelector(".dropdown-content");
            dropdownContent.style.maxHeight = null;
            dropdownContent.parentNode.style.minHeight = null;
        // reset chevrons
        const chevron = dropdown[i].querySelector(".chevron");
        if (chevron.classList.contains("chevron-rotate"))
            chevron.classList.toggle("chevron-rotate");
    }
}

// opens menu on hover
function toggleHover() {
    const dropdownContent = this.querySelector(".dropdown-content");
    dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
}

// closes menu when mouse leaves menu
function closeHover() {
    this.querySelector(".dropdown-content").style.maxHeight = null;
}

// remove accordion listeners, add hover-dropdown listeners
function desktopDropdownListeners() {
    for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].removeEventListener("click", toggleDropdown);
        dropdown[i].removeEventListener("mouseenter", toggleHover);
        dropdown[i].removeEventListener("mouseleave", closeHover);
        dropdown[i].addEventListener("mouseenter", toggleHover);
        dropdown[i].addEventListener("mouseleave", closeHover);
    }
}

// remove hover-dropdown listeners, add accordion listeners
function mobileDropdownListeners() {
    for (let i = 0; i < dropdown.length; i++) {
        // Add the click event listener for screens larger than 768 pixels
        dropdown[i].removeEventListener("click", toggleDropdown);
        dropdown[i].removeEventListener("mouseenter", toggleHover);
        dropdown[i].removeEventListener("mouseleave", closeHover);
        dropdown[i].addEventListener("click", toggleDropdown);
    }
}

// initialise menu event listeners based on initial screensize
if (window.innerWidth < 768)
    mobileDropdownListeners();
else
    desktopDropdownListeners();