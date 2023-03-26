/******************
 * Menu Behaviour *============================================================
 ******************/

let sideBar = false;
let canToggle = true; // stop double toggling while menu is closing
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
window.addEventListener('resize', function (event) {
    // check the current width of the window
    const width = window.innerWidth;
    // make sure top-menu is reset
    if (width > 768) {
        for (let i = 0; i < dropdown.length; i++) {
            closeDropdowns(i);
        }
        const icon = document.getElementById("menu-icon");
        if (icon.classList.contains("change"))
            icon.classList.toggle("change");
        desktopDropdownListeners();
        menu.style.transitionDuration = "0s";
        menu.style.display = "flex";
        tinter.style.display = "none";
        sideBar = false;
        // if the side menu was open, leave it open
    } else if (width <= 768) {
        mobileDropdownListeners();
        if (sideBar) {
            menu.style.display = "flex";
        } else {
            menu.style.transitionDuration = "0.3s";
            menu.style.display = "none";
            tinter.style.display = "none";
        }
    }
});

/*****************
 * Project Cards *=============================================================
 *****************/

// grab project card text
const descriptions = document.querySelectorAll(".card-text");

// hide project card text by default
descriptions.forEach(element => {
    element.style.display = "none";
});

// toggle project card displays
function showHideDescription(textID, buttonID, ellipsisID) {
    const text = document.querySelector(textID);
    const button = document.querySelector(buttonID);
    const ellipsis = document.querySelector(ellipsisID);

    if (text.style.display === "none") {
        text.style.display = "block";
        button.innerHTML = "Show less";
        ellipsis.style.display = "none";
    } else {
        text.style.display = "none";
        button.innerHTML = "Show more";
        ellipsis.style.display = "inline";
    }
}

const dropdown = document.getElementsByClassName("dropdown");

function toggleDropdown() {
    const dropdownContent = this.querySelector(".dropdown-content");
    dropdownContent.classList.toggle("active");
    const chevron = this.querySelector(".chevron");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
        if (chevron.classList.contains("chevron-rotate"))
            chevron.classList.toggle("chevron-rotate");
    } else {
        for (let i = 0; i < dropdown.length; i++) {
            closeDropdowns(i);
        }
        dropdownContent.style.display = "block";
        if (!chevron.classList.contains("chevron-rotate"))
            chevron.classList.toggle("chevron-rotate");
    }
}

function closeDropdowns(i) {
    const dropdownContent = dropdown[i].querySelector(".dropdown-content");
    if (dropdownContent.classList.contains("active"))
        dropdownContent.classList.toggle("active");
    const chevron = dropdown[i].querySelector(".chevron");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
        if (chevron.classList.contains("chevron-rotate"))
            chevron.classList.toggle("chevron-rotate");
    }
}

function toggleHover() {
    this.querySelector(".dropdown-content").style.display = "block";
}

function closeHover() {
    this.querySelector(".dropdown-content").style.display = "none";
}

function desktopDropdownListeners() {
    for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].removeEventListener("click", toggleDropdown);
        dropdown[i].removeEventListener("mouseenter", toggleHover);
        dropdown[i].removeEventListener("mouseleave", closeHover);
        dropdown[i].addEventListener("mouseenter", toggleHover);
        dropdown[i].addEventListener("mouseleave", closeHover);
    }
}

function mobileDropdownListeners() {
    for (let i = 0; i < dropdown.length; i++) {
        // Add the click event listener for screens larger than 768 pixels
        dropdown[i].removeEventListener("click", toggleDropdown);
        dropdown[i].removeEventListener("mouseenter", toggleHover);
        dropdown[i].removeEventListener("mouseleave", closeHover);
        dropdown[i].addEventListener("click", toggleDropdown);
    }
}

for (let i = 0; i < dropdown.length; i++) {
    // Remove the click event listener for screens smaller than 768 pixels
    if (window.innerWidth < 768) {
        dropdown[i].removeEventListener("click", toggleDropdown);
        dropdown[i].removeEventListener("mouseenter", toggleHover);
        dropdown[i].removeEventListener("mouseleave", closeHover);
        dropdown[i].addEventListener("click", toggleDropdown);
    } else {
        // Add the click event listener for screens larger than 768 pixels
        dropdown[i].removeEventListener("click", toggleDropdown);
        dropdown[i].removeEventListener("mouseenter", toggleHover);
        dropdown[i].removeEventListener("mouseleave", closeHover);
        dropdown[i].addEventListener("mouseenter", toggleHover);
        dropdown[i].addEventListener("mouseleave", closeHover);
    }
}