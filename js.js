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
	parentContainer: getById('skills-modal'),
	skillsParentToggles: [mainNavToggles[2], mobileNavToggles[2]],
	skillModalExit: getById('skill-modal-exit'),
	skillPopOverExt: getById('skill-popover-exit'),
	skillPopOverContainer: getById('skill-details-popover-container'),
	skillsDetailsContainer: getById('skill-detail-container'),

	classes: {
		skillsWrapper: 'skills-wrapper',
		skillSpan: 'skill-span',
		skillButton: 'skill-button',
	},
};

const togglePopOverContainer = (button, popOverContainer, skillDetails, obj) => {
	let skillLi = [];
	button.addEventListener(click, () => {
		if (!popOverContainer.classList.contains(flexActive)) {
			toggleClass(popOverContainer, flexActive);
			for (let i = 0; i < 5; i++) {
				const li = createElement('li');
				skillLi.push(li);
			}
			const [one, two, three, four, five] = skillLi;
			textContent(one, obj[0]);
			textContent(two, obj[1]);
			textContent(three, obj[2]);
			textContent(four, obj[3]);
			textContent(five, obj[4]);
			for (let detail of skillLi) {
				appendChild(skillDetails, detail);
			}
		} else {
			toggleClass(popOverContainer, flexActive);
			skillLi = [];
		}
	});
};

const ToggleSkillsContainer = (obj) => {
	const skillSpans = [];
	const skillImgs = [];
	const skillButtons = [];
	for (let toggler of obj.skillsParentToggles) {
		toggler.addEventListener(click, () => {
			if (!obj.parentContainer.classList.contains(flexActive)) {
				toggleClass(obj.parentContainer, flexActive);
				const skillsWrapperContainer = createElement('div');
				addClass(skillsWrapperContainer, obj.classes.skillsWrapper);
				addClass(skillsWrapperContainer, 'container');
				appendChild(obj.parentContainer, skillsWrapperContainer);

				const skillModalExit = createElement('i');
				addClass(skillModalExit, 'skills-exit');
				addClass(skillModalExit, 'fa-solid');
				addClass(skillModalExit, 'fa-x');
				skillModalExit.id = 'skill-modal-exit';
				appendChild(skillsWrapperContainer, skillModalExit);

				for (let i = 0; i < 4; i++) {
					const span = createElement('span');
					const img = createElement('img');
					const button = createElement('button');
					skillSpans.push(span);
					skillImgs.push(img);
					skillButtons.push(button);
				}

				const [htmlSpan, cssSpan, gitSpan, jsSpan] = skillSpans;
				const [htmlImg, cssImg, gitImg, jsImg] = skillImgs;
				const [htmlButton, cssButton, gitButton, jsButton] = skillButtons;

				togglePopOverContainer(
					htmlButton,
					obj.skillPopOverContainer,
					obj.skillsDetailsContainer,
					obj.html.details
				);

				for (let elem of skillSpans) {
					addClass(elem, obj.classes.skillSpan);
					appendChild(skillsWrapperContainer, elem);
				}

				for (let elem of skillButtons) {
					addClass(elem, obj.classes.skillButton);
					textContent(elem, 'Details');
				}
				htmlImg.src = obj.html.logos;
				cssImg.src = obj.css.logos;
				gitImg.src = obj.git.logos;
				jsImg.src = obj.js.logos;

				appendChild(htmlSpan, htmlImg);
				appendChild(cssSpan, cssImg);
				appendChild(gitSpan, gitImg);
				appendChild(jsSpan, jsImg);

				appendChild(htmlSpan, htmlButton);
				appendChild(cssSpan, cssButton);
				appendChild(gitSpan, gitButton);
				appendChild(jsSpan, jsButton);

				skillModalExit.addEventListener(click, () => {
					if (obj.parentContainer.classList.contains(flexActive)) {
						toggleClass(obj.parentContainer, flexActive);
						removeChild(obj.parentContainer, skillsWrapperContainer);
						for (let elem of skillSpans) {
							skillSpans.length = [];
						}
					}
				});
			}
		});
	}
};

ToggleSkillsContainer(skillsObject);
