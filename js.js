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
const mobileNavToggles = selectAll('.mobile-nav-li');
const [
	homeToggleMobile,
	aboutToggleMobile,
	skillsToggleMobile,
	ProjectsToggleMobile,
	contactToggleMobile,
] = mobileNavToggles;

const homeParent = getById('home-parent-wrapper');
const aboutParent = getById('about-parent-wrapper');
const skillsParent = getById('skills-parent-wrapper');
const projectsParent = getById('projects-parent-wrapper');
const contactParent = getById('contact-parent-wrapper');

const toggleParentContainers = (
	toggler,
	homeCont = homeParent,
	aboutCont = aboutParent,
	skillsCont = skillsParent,
	projectsCont = projectsParent,
	ContactCont = contactParent
) => {
	toggler.addEventListener(click, () => {
		if (
			!aboutCont.classList.contains(flexActive) &&
			homeCont.classList.contains(flexActive) &&
			!skillsCont.classList.contains(flexActive) &&
			!projectsCont.classList.contains(flexActive) &&
			!ContactCont.classList.contains(flexActive)
		) {
			toggleClass(aboutCont, flexActive);
			toggleClass(homeCont, flexActive);
		} else if (
			!skillsCont.classList.contains(flexActive) &&
			!projectsCont.classList.contains(flexActive) &&
			!ContactCont.classList.contains(flexActive) &&
			aboutCont.classList.contains(flexActive) &&
			!homeCont.classList.contains(flexActive)
		) {
			toggleClass(aboutCont, flexActive);
			toggleClass(skillsCont, flexActive);
		} else if (
			!projectsCont.classList.contains(flexActive) &&
			!ContactCont.classList.contains(flexActive) &&
			!aboutCont.classList.contains(flexActive) &&
			!homeCont.classList.contains(flexActive) &&
			skillsCont.classList.contains(flexActive)
		) {
			toggleClass(projectsCont, flexActive);
			toggleClass(skillsCont, flexActive);
		} else if (
			!ContactCont.classList.contains(flexActive) &&
			!aboutCont.classList.contains(flexActive) &&
			!homeCont.classList.contains(flexActive) &&
			projectsCont.classList.contains(flexActive) &&
			!skillsCont.classList.contains(flexActive)
		) {
			toggleClass(ContactCont, flexActive);
			toggleClass(projectsCont, flexActive);
		} else if (
			!homeCont.classList.contains(flexActive) &&
			ContactCont.classList.contains(flexActive) &&
			!aboutCont.classList.contains(flexActive) &&
			!skillsCont.classList.contains(flexActive) &&
			!projectsCont.classList.contains(flexActive)
		) {
			toggleClass(ContactCont, flexActive);
			toggleClass(homeCont, flexActive);
		}
	});
};

toggleParentContainers(homeToggle);
toggleParentContainers(aboutToggle);
toggleParentContainers(skillsToggle);
toggleParentContainers(projectsToggle);
toggleParentContainers(contactToggle);

//Project Info Container Vars and Functions
function triggerProjectInfoContainer() {
	const projectInfoContainer = getById('project-info-container');
	const getProjectInfoButtons = selectAll('.get-project-info-button');
	const activeInfoMenu = 'project-info-container-active';

	for (let togglers of getProjectInfoButtons) {
		togglers.addEventListener(click, () => {
			if (!projectInfoContainer.classList.contains(activeInfoMenu)) {
				toggleClass(projectInfoContainer, activeInfoMenu);
			} else {
				toggleClass(projectInfoContainer, activeInfoMenu);
			}
		});
	}

	projectInfoContainer.addEventListener(click, () => {
		if (projectInfoContainer.classList.contains(activeInfoMenu)) {
			toggleClass(projectInfoContainer, activeInfoMenu);
		}
	});

	window.addEventListener(keyup, () => {
		if (projectInfoContainer.classList.contains(activeInfoMenu)) {
			toggleClass(projectInfoContainer, activeInfoMenu);
		}
	});
}
triggerProjectInfoContainer();
