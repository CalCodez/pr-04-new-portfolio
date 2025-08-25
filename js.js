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
const closeCodeModal = (
	toggleArr,
	exitElm,
	parentContainer,
	wrapperContainer,
	spanLinkArr,
	arr1,
	arr2,
	arr3
) => {
	for (let togglers of toggleArr) {
		togglers.addEventListener(click, () => {
			if (parentContainer.classList.contains('modal-active')) {
				toggleClass(parentContainer, modalActive);
				exitElm.style.display = 'none';

				removeChild(parentContainer, wrapperContainer);
				//remove appended spans from modalContentWrapper
				for (let elms of spanLinkArr) {
					removeChild(wrapperContainer, elms);
				}

				//Clear arrays from generated elems
				arr1 = [];
				arr2 = [];
				arr3 = [];
			}
		});
	}
};

const toggleCodeModal = (toggles) => {
	const modalParentContainer = getById('modal-parent-container');
	const modalActive = 'modal-active';
	const modalParentExit = getById('modal-parent-exit');
	const modalContentWrapper = createElement('div');
	const closeCodeModalToggles = [modalParentContainer, modalParentExit];

	//Code Toggle Arrays
	let logoSpans = [];
	let nameSpans = [];
	let logoImgs = [];

	//Contact Toggle Arrays
	let contactLinks = [];
	let contactSpans = [];
	let contactIcons = [];

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
					logoSpans.push(createElement('span')); //Spans = create 'a'
					nameSpans.push(createElement('span'));
					logoImgs.push(createElement('img')); // imgs = create 'i'
				}

				//Add Classes to Code and Name Spans
				for (let elms of logoSpans) {
					addClass(elms, 'code-span');
					addClass(elms, 'container');
					appendChild(modalContentWrapper, elms);
				}

				for (let elms of nameSpans) {
					addClass(elms, 'code-name-span');
					addClass(elms, 'container');
				}

				//Destructor And Append Elements
				const [htmlCodeSpan, cssCodeSpan, gitHubCodeSpan, jsCodeSpan] = logoSpans;
				const [htmlNameSpan, cssNameSpan, gitHubNameSpan, jsNameSpan] = nameSpans;
				const [htmlImg, cssImg, gitHubImg, jsImg] = logoImgs;

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

				const closeCodeModal = (toggleArr) => {
					for (let togglers of toggleArr) {
						togglers.addEventListener(click, () => {
							if (modalParentContainer.classList.contains(modalActive)) {
								toggleClass(modalParentContainer, modalActive);
								modalParentExit.style.display = 'none';

								removeChild(modalParentContainer, modalContentWrapper);
								//remove appended spans from modalContentWrapper
								for (let elms of logoSpans) {
									removeChild(modalContentWrapper, elms);
								}

								//Clear arrays from generated elems
								logoSpans = [];
								nameSpans = [];
								logoImgs = [];
							}
						});
					}
				};

				window.addEventListener(keyup, () => {
					if (event.key === 'Escape' && codeModal.classList.contains(modalActive)) {
						toggleClass(modalParentContainer, modalActive);
						codeModalExit.style.display = 'none';

						removeChild(modalParentContainer, modalContentWrapper);
						//remove appended spans from modalContentWrapper
						for (let elms of logoSpans) {
							removeChild(modalContentWrapper, elms);
						}

						//Clear arrays from generated elems
						logoSpans = [];
						nameSpans = [];
						logoImgs = [];
					}
				});
				closeCodeModal(closeCodeModalToggles);
			}
			if (
				toggler.id === modalToggles[2].id ||
				(toggler.id === modalToggles[3].id && !modalParentContainer.classList.contains(modalActive))
			) {
				toggleClass(modalParentContainer, modalActive);
				modalParentExit.style.display = 'block';

				appendChild(modalParentContainer, modalContentWrapper);

				//create Contact link, icons, and spans
				for (let i = 0; i < 4; i++) {
					contactLinks.push(createElement('a'));
					contactSpans.push(createElement('span'));
					contactIcons.push(createElement('i'));
				}

				//Add Element Classes, Text, and href

				for (let i of contactLinks) {
					addClass(i, 'contact-link');
					appendChild(modalContentWrapper, i);

					i.target = '_blank';
				}
				const [fbLink, igLink, threadsLink, googleLink] = contactLinks;

				fbLink.href = '#';
				igLink.href = '#';
				threadsLink.href = '#';
				googleLink.href = 'https://www.google.com';

				for (let i of contactIcons) {
					addClass(i, 'fa-brands');
				}
				const [fbIcon, igIcon, threadsIcon, googleIcon] = contactIcons;

				addClass(fbIcon, 'fa-facebook');
				addClass(igIcon, 'fa-instagram');
				addClass(threadsIcon, 'fa-threads');
				addClass(googleIcon, 'fa-google');

				for (let i of contactSpans) {
					addClass(i, 'contact-span');
					addClass(i, 'container');
				}
				const [fbSpan, igSpan, threadsSpan, googleSpan] = contactSpans;

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
};

toggleCodeModal(modalToggles);
