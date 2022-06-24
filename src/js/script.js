const btn = document.querySelector(".header__button");
const btnLines = document.querySelector(".header__button-line");
const navigation = document.querySelector(".navigator");
const toggleMenu = () => btnLines.classList.toggle("active");
const toggleNavigator = () => navigation.classList.toggle("active");

btn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
    toggleNavigator();
});

document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target == navigation || navigation.contains(target);
    let its_hamburger = target == btnLines;
    let menu_is_active = navigation.classList.contains('active');

    if (!its_menu && !its_hamburger && menu_is_active) {
        toggleMenu();
        toggleNavigator();
    }
})