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

const toggleParentContainers = (arr, targetContainer, cont2) => {
	for (let toggler of arr) {
		toggler.addEventListener(click, () => {
			if (!targetContainer.classList.contains(flexActive) && cont2.classList.contains(flexActive)) {
				toggleClass(cont2, flexActive);
				toggleClass(targetContainer, flexActive);
			} else if (
				!targetContainer.classList.contains(flexActive) &&
				!cont2.classList.contains(flexActive)
			) {
				toggleClass(cont2, flexActive);
				toggleClass(targetContainer, flexActive);
			}
		});
	}
};

toggleParentContainers(toggleProjects, projectsParent, homeParent);
toggleParentContainers(toggleHome, homeParent, projectsParent);

//Skills Modal Vars and Function

const modalToggles = [
	mainNavToggles[2],
	mobileNavToggles[2],
	mainNavToggles[4],
	mobileNavToggles[4],
];

const codeObj = {
	html: {
		name: 'HTML',
		logos: './assets/logos/html.png',
		details: ['Boiler Plate', 'Styled Elements', 'Buttons', 'Forms', 'And More'],
	},
	css: {
		name: 'CSS',
		logos: './assets/logos/css.png',
		details: ['Selectors', 'Animations', 'FlexBox', 'Media Queries', 'And More'],
	},
	github: {
		name: 'GITHUB',
		logos: './assets/logos/github.png',
		details: ['Config', 'Pull', 'Commit', 'Push', 'And More'],
	},
	js: {
		name: 'JAVASCRIPT',
		logos: './assets/logos/javascript.png',
		details: ['Data Types', 'Functions', 'Loops', 'Dom', 'And More'],
	},
};

const { html, css, github, js } = codeObj;

//CLose Modal Function

const toggleCodeModal = (toggles) => {
	const modalParentContainer = getById('modal-parent-container');
	const modalActive = 'modal-active';
	const modalParentExit = getById('modal-parent-exit');
	const modalContentWrapper = createElement('div');
	const closeCodeModalToggles = [modalParentContainer, modalParentExit];

	//Code Toggle Arrays
	let contentWrappers = [];
	let nameSpans = [];
	let imgsIcons = [];

	for (let toggler of toggles) {
		toggler.addEventListener(click, () => {
			if (
				toggler.id === modalToggles[0].id ||
				(toggler.id === modalToggles[1].id && !modalParentContainer.classList.contains(modalActive))
			) {
				toggleClass(modalParentContainer, modalActive);
				modalParentExit.style.display = 'block';

				//create code span wrapper
				addClass(modalContentWrapper, 'modal-content-wrapper');
				addClass(modalContentWrapper, 'container');
				appendChild(modalParentContainer, modalContentWrapper);

				//create code (logos) spans, code name spans, img spans
				for (let i = 0; i < 4; i++) {
					contentWrappers.push(createElement('span')); //Spans = create 'a'
					nameSpans.push(createElement('span'));
					imgsIcons.push(createElement('img')); // imgs = create 'i'
				}

				//Add Classes to Code and Name Spans
				for (let elms of contentWrappers) {
					addClass(elms, 'code-span');
					addClass(elms, 'container');
					appendChild(modalContentWrapper, elms);
				}

				for (let elms of nameSpans) {
					addClass(elms, 'code-name-span');
					addClass(elms, 'container');
				}

				//Destructor And Append Elements
				const [htmlCodeSpan, cssCodeSpan, gitHubCodeSpan, jsCodeSpan] = contentWrappers;
				const [htmlNameSpan, cssNameSpan, gitHubNameSpan, jsNameSpan] = nameSpans;
				const [htmlImg, cssImg, gitHubImg, jsImg] = imgsIcons;

				//logoImages
				htmlImg.src = html.logos;
				cssImg.src = css.logos;
				gitHubImg.src = github.logos;
				jsImg.src = js.logos;

				//logoNames
				textContent(htmlNameSpan, html.name);
				textContent(cssNameSpan, css.name);
				textContent(gitHubNameSpan, github.name);
				textContent(jsNameSpan, js.name);

				//append Elms to Parent Containers
				appendChild(htmlCodeSpan, htmlImg);
				appendChild(htmlCodeSpan, htmlNameSpan);
				appendChild(cssCodeSpan, cssImg);
				appendChild(cssCodeSpan, cssNameSpan);
				appendChild(gitHubCodeSpan, gitHubImg);
				appendChild(gitHubCodeSpan, gitHubNameSpan);
				appendChild(jsCodeSpan, jsImg);
				appendChild(jsCodeSpan, jsNameSpan);
			}
			if (
				toggler.id === modalToggles[2].id ||
				(toggler.id === modalToggles[3].id && !modalParentContainer.classList.contains(modalActive))
			) {
				toggleClass(modalParentContainer, modalActive);
				modalParentExit.style.display = 'block';

				appendChild(modalParentContainer, modalContentWrapper);
				addClass(modalContentWrapper, 'modal-content-wrapper');
				addClass(modalContentWrapper, 'container');

				//create Contact link, icons, and spans
				for (let i = 0; i < 4; i++) {
					contentWrappers.push(createElement('a'));
					nameSpans.push(createElement('span'));
					imgsIcons.push(createElement('i'));
				}

				//Add Element Classes, Text, and href

				for (let i of contentWrappers) {
					addClass(i, 'contact-link');
					appendChild(modalContentWrapper, i);

					i.target = '_blank';
				}
				const [fbLink, igLink, threadsLink, googleLink] = contentWrappers;

				fbLink.href = '#';
				igLink.href = '#';
				threadsLink.href = '#';
				googleLink.href = 'https://www.google.com';

				for (let i of imgsIcons) {
					addClass(i, 'fa-brands');
				}
				const [fbIcon, igIcon, threadsIcon, googleIcon] = imgsIcons;

				addClass(fbIcon, 'fa-facebook');
				addClass(igIcon, 'fa-instagram');
				addClass(threadsIcon, 'fa-threads');
				addClass(googleIcon, 'fa-google');

				for (let i of nameSpans) {
					addClass(i, 'contact-span');
					addClass(i, 'container');
				}
				const [fbSpan, igSpan, threadsSpan, googleSpan] = nameSpans;

				addClass(fbSpan, 'modal-fb-span');
				addClass(igSpan, 'modal-ig-span');
				addClass(googleSpan, 'modal-google-span');
				textContent(fbSpan, 'Facebook');
				textContent(igSpan, 'Instagram');
				textContent(threadsSpan, 'Threads');
				textContent(googleSpan, 'Gmail');

				//Append Elements

				appendChild(fbLink, fbIcon);
				appendChild(fbLink, fbSpan);
				appendChild(igLink, igIcon);
				appendChild(igLink, igSpan);
				appendChild(threadsLink, threadsIcon);
				appendChild(threadsLink, threadsSpan);
				appendChild(googleLink, googleIcon);
				appendChild(googleLink, googleSpan);
			}
		});
	}

	const closeModalParent = (toggleArr) => {
		for (let togglers of toggleArr) {
			togglers.addEventListener(click, () => {
				if (modalParentContainer.classList.contains(modalActive)) {
					toggleClass(modalParentContainer, modalActive);
					modalParentExit.style.display = 'none';

					removeChild(modalParentContainer, modalContentWrapper);
					//remove appended spans from modalContentWrapper
					for (let elms of contentWrappers) {
						removeChild(modalContentWrapper, elms);
					}

					//Clear arrays from generated elems
					contentWrappers = [];
					nameSpans = [];
					imgsIcons = [];
				}
			});
		}
	};
	closeModalParent(closeCodeModalToggles);
};

toggleCodeModal(modalToggles);

//Project Card Obj

const projectCards = {
	calTube: {
		title: 'CalTube',
		img: '',
		description: `Youtube-inspired clone featuring a collection of some of my favorite artists and their videos. This project showcases female, male, and group artist, along with artist pages that include a sub collection of videos from similar artists.`,
		link: '#',
	},

	saas: {
		title: 'SaaS',
		img: '',
		description: `A fully featured website landing page. This was my first project that tested all my skills in HTML and CSS. I learned to apply elements using advanced HTML, CSS positioning, forms, inputs, and sizing to achieve a professional looking landing page.`,
		link: '#',
	},
	pokemon: {
		title: 'Pokemon',
		img: '',
		description: `A Pokemon card collection project. This project allows users to collect and release Pokemon by adding and removing their favorite cards to a favorites section.`,
		link: '#',
	},

	google: {
		title: 'Google Search',
		img: '',
		description: `Google homepage clone built eyeing Google's homepage. This project involved replicating the layout, styling, to achieve accurate visual match. It's a straightforward demonstration of understanding basic HTML, CSS and link functionality.`,
	},
	dashboard: {
		title: 'Dashboard',
		img: '',
		description: `A simple Javascript driven planner project. Create reminders, notes and the program will sort and store them in a parent category container.`,
		link: '#',
	},

	loginForm: {
		title: 'Login Form',
		img: '',
		description: `A simple Login form design inspired by "Rccodex" on Instagram`,
		link: '#',
	},

	astroZone: {
		title: 'AstroZone',
		img: '',
		description: `An astrology project based around the 12 signs in the zodiac. It featured a zodiac image gallery, a zodiac facts section, and a feature to view five famous people fro each zodiac sign.`,
		link: '#',
	},

	solarGallery: {
		title: 'Solar Gallery',
		img: '',
		description: `A Solar System gallery that includes an image and facts about the 8 official planets in out solar system, as well as our Sun, Moon, Pluto, and Galaxy. Web design inspired by UIUXMaesto from facebook.`,
		link: '#',
	},

	logins: {
		title: 'Logins',
		img: '',
		description: `A social media login page clone project. I cloned the login pages for various platforms, optimized for desktop, tablet, and mobile screens. The displayed login page adapts based on the device used, showcasing mobile responsive design.`,
		link: '',
	},

	favz: {
		title: 'My Favz',
		img: '',
		description: `A beginner project displaying a list of things I favor and don't favor, with each topic providing three key reasons for it's inclusion.`,
		link: '#',
	},

	responsive: {
		title: 'Responsive',
		img: '',
		description: `Simple mobile responsive landing page.`,
		link: '#',
	},

	tribute: {
		title: 'Aaliyah Tribute',
		img: '',
		description: `A tribute dedicated to the late Aaliyah. This project features a detailed biography, a curated collection of her music and videos, and a page highlighting the movies she starred in. Each section ays homage to her impactful career and lasting legacy in entertainment.`,
		link: '#',
	},

	portfolio: {
		title: 'Portfolio One',
		img: '',
		description: `My first portfolio.`,
		link: '#',
	},

	loginProfile: {
		title: 'Login_Profile',
		img: '',
		description: `A profile login project that checks for a valid username and password to access a user's profile. Correct credentials grant access to one of four Teenage Mutant Ninja Turtles `,
	},
};
