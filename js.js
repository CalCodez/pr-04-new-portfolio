const getByClass = (className) => document.getElementsByClassName(className);
const getById = (id) => document.getElementById(id);
const createElement = (element) => document.createElement(element);
const appendChild = (parent, child) => parent.appendChild(child);
const removeChild = (parent, child) => parent.removeChild(child);
const addClass = (element, className = '') => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);
const toggleClass = (element, className) => element.classList.toggle(className);
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);
const textContent = (element, text) => (element.textContent = text);

const click = 'click';
const keyup = 'keyup';
const flexActive = 'flex-active';
const flexInactive = 'flex-inactive';

//Toggle Mobile Menu Vars and Function
const mobileToggler = getById('mobile-menu-toggler');
const mobileMenu = getById('mobile-menu');
const activeMenu = 'mobile-menu-active';
const mobileNav = select('.mobile-nav');

const toggleMobileMenu = (toggler, menu) => {
	toggler.addEventListener(click, () => {
		if (!menu.classList.contains(activeMenu)) {
			toggleClass(menu, activeMenu);
			setTimeout(() => {
				toggleClass(mobileNav, flexActive);
			}, 300);
		} else {
			toggleClass(menu, activeMenu);
			toggleClass(mobileNav, flexActive);
		}
	});

	menu.addEventListener(click, () => {
		if (menu.classList.contains(activeMenu)) {
			toggleClass(menu, activeMenu);
			toggleClass(mobileNav, flexActive);
		}
	});

	window.addEventListener(keyup, () => {
		if (event.key === 'Escape' && menu.classList.contains(activeMenu)) {
			toggleClass(menu, activeMenu);
			toggleClass(mobileNav, flexActive);
		}
	});
};
toggleMobileMenu(mobileToggler, mobileMenu);

//Toggle Parent Containers Var and Function

const mainNavToggles = selectAll('.nav-li');
const [homeToggle, aboutToggle, skillsToggle, projectsToggle, contactToggle] = mainNavToggles;
const navIcons = selectAll('.nav-icons');
const [homeIcon, aboutIcon, skillsIcon, projectsIcon, contactIcon] = navIcons;

const mobileNavToggles = selectAll('.mobile-nav-li');
const [
	homeToggleMobile,
	aboutToggleMobile,
	skillsToggleMobile,
	ProjectsToggleMobile,
	contactToggleMobile,
] = mobileNavToggles;

const toggleHome = [mainNavToggles[0], mobileNavToggles[0]];
const toggleAbout = [mainNavToggles[1], mobileNavToggles[1]];
const toggleProjects = [mainNavToggles[3], mobileNavToggles[3]];
const toggleContact = [mainNavToggles[4], mobileNavToggles[4]];

const homeParent = getById('home-parent-wrapper');
const aboutParent = getById('about-parent-wrapper');
const projectsParent = getById('projects-parent-wrapper');
const contactParent = getById('contact-parent-wrapper');

const toggleParentContainers = (arr, targetContainer, cont1, cont2, cont3) => {
	for (let toggler of arr) {
		toggler.addEventListener(click, () => {
			if (
				!targetContainer.classList.contains(flexActive) &&
				cont1.classList.contains(flexActive) &&
				!cont2.classList.contains(flexActive) &&
				!cont3.classList.contains(flexActive)
			) {
				toggleClass(cont1, flexActive);
				toggleClass(targetContainer, flexActive);
			} else if (
				!targetContainer.classList.contains(flexActive) &&
				!cont1.classList.contains(flexActive) &&
				cont2.classList.contains(flexActive) &&
				!cont3.classList.contains(flexActive)
			) {
				toggleClass(cont2, flexActive);
				toggleClass(targetContainer, flexActive);
			} else if (
				!targetContainer.classList.contains(flexActive) &&
				!cont1.classList.contains(flexActive) &&
				!cont2.classList.contains(flexActive) &&
				cont3.classList.contains(flexActive)
			) {
				toggleClass(cont3, flexActive);
				toggleClass(targetContainer, flexActive);
			}
		});
	}
};

toggleParentContainers(
	toggleAbout,
	aboutParent,
	homeParent,
	projectsParent,
	contactParent,
	aboutIcon
);

toggleParentContainers(toggleProjects, projectsParent, contactParent, homeParent, aboutParent);
toggleParentContainers(toggleContact, contactParent, homeParent, aboutParent, projectsParent);
toggleParentContainers(toggleHome, homeParent, aboutParent, projectsParent, contactParent);

//Skills Modal Vars and Function

const skillsObject = {
	html: {
		logos: './assets/logos/html.png',
		details: ['Boiler Plate', 'Styled Elements', 'Buttons', 'Forms', 'And More'],
	},
	css: {
		logos: './assets/logos/css.png',
		details: ['Selectors', 'Animations', 'FlexBox', 'Media Queries', 'And More'],
	},
	git: {
		logos: './assets/logos/github.png',
		details: ['Config', 'Pull', 'Commit', 'Push', 'And More'],
	},
	js: {
		logos: './assets/logos/javascript.png',
		details: ['Data Types', 'Functions', 'Loops', 'Dom', 'And More'],
	},
	parentContainer: getById('skills-parent-wrapper'),
	skillsParentToggles: [mainNavToggles[2], mobileNavToggles[2]],
	skillModalExit: getById('skill-modal-exit'),
	skillPopOverExt: getById('skill-popover-exit'),
	skillsDetailsContainer: getById('skills-details-container'),

	classes: {
		skillsWrapper: 'skills-wrapper',
		skillPan: 'skill-span',
		skillButton: 'skill-button',
	},
};
