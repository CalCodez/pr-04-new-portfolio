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
const toggleSkills = [mainNavToggles[2], mobileNavToggles[2]];
const toggleProjects = [mainNavToggles[3], mobileNavToggles[3]];
const toggleContact = [mainNavToggles[4], mobileNavToggles[4]];

const homeParent = getById('home-parent-wrapper');
const aboutParent = getById('about-parent-wrapper');
const skillsParent = getById('skills-parent-wrapper');
const projectsParent = getById('projects-parent-wrapper');
const contactParent = getById('contact-parent-wrapper');

const toggleParentContainers = (arr, targetContainer, cont1, cont2, cont3, cont4) => {
	for (let toggler of arr) {
		toggler.addEventListener(click, () => {
			if (
				!targetContainer.classList.contains(flexActive) &&
				cont1.classList.contains(flexActive) &&
				!cont2.classList.contains(flexActive) &&
				!cont3.classList.contains(flexActive) &&
				!cont4.classList.contains(flexActive)
			) {
				toggleClass(cont1, flexActive);
				toggleClass(targetContainer, flexActive);
			} else if (
				!targetContainer.classList.contains(flexActive) &&
				!cont1.classList.contains(flexActive) &&
				cont2.classList.contains(flexActive) &&
				!cont3.classList.contains(flexActive) &&
				!cont4.classList.contains(flexActive)
			) {
				toggleClass(cont2, flexActive);
				toggleClass(targetContainer, flexActive);
			} else if (
				!targetContainer.classList.contains(flexActive) &&
				!cont1.classList.contains(flexActive) &&
				!cont2.classList.contains(flexActive) &&
				cont3.classList.contains(flexActive) &&
				!cont4.classList.contains(flexActive)
			) {
				toggleClass(cont3, flexActive);
				toggleClass(targetContainer, flexActive);
			} else if (
				!targetContainer.classList.contains(flexActive) &&
				!cont1.classList.contains(flexActive) &&
				!cont2.classList.contains(flexActive) &&
				!cont3.classList.contains(flexActive) &&
				cont4.classList.contains(flexActive)
			) {
				toggleClass(cont4, flexActive);
				toggleClass(targetContainer, flexActive);
			}
		});
	}
};

toggleParentContainers(
	toggleAbout,
	aboutParent,
	homeParent,
	skillsParent,
	projectsParent,
	contactParent,
	aboutIcon
);
toggleParentContainers(
	toggleSkills,
	skillsParent,
	projectsParent,
	contactParent,
	homeParent,
	aboutParent
);
toggleParentContainers(
	toggleProjects,
	projectsParent,
	contactParent,
	homeParent,
	aboutParent,
	skillsParent
);
toggleParentContainers(
	toggleContact,
	contactParent,
	homeParent,
	aboutParent,
	skillsParent,
	projectsParent
);
toggleParentContainers(
	toggleHome,
	homeParent,
	aboutParent,
	skillsParent,
	projectsParent,
	contactParent
);

//Project Info Container Vars and Functions

//~~NOTE: Deleting This Function don't need for new project card hover detail Idea
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

//Skills details Var and Function

const skillDetailsContainer = selectAll('.skill-details-container');
const skillButtons = selectAll('.skill-button');

const skillDetails = {
	html: { button: skillButtons[0], container: skillDetailsContainer[0] },
	css: { button: skillButtons[1], container: skillDetailsContainer[1] },
	git: { button: skillButtons[2], container: skillDetailsContainer[2] },
	js: { button: skillButtons[3], container: skillDetailsContainer[3] },
};
const { html, css, git, js } = skillDetails;

const toggleSkillDetails = (obj) => {
	const viewDetail = 'View';
	const closeDetailsContainer = 'Close';

	obj.button.addEventListener(click, () => {
		if (!obj.container.classList.contains(flexActive)) {
			toggleClass(obj.container, flexActive);
			textContent(obj.button, closeDetailsContainer);
		} else {
			toggleClass(obj.container, flexActive);
			textContent(obj.button, viewDetail);
		}
	});
};

toggleSkillDetails(html);
toggleSkillDetails(css);
toggleSkillDetails(git);
toggleSkillDetails(js);
