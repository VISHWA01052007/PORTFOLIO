'use strict';

const toggleActive = (element) => element?.classList.toggle('active');

const sidebar = document.querySelector('[data-sidebar]');
document.querySelector('[data-sidebar-btn]')?.addEventListener('click', () => toggleActive(sidebar));

const select = document.querySelector('[data-select]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterItems = document.querySelectorAll('[data-filter-item]');
const filterButtons = document.querySelectorAll('[data-filter-btn]');

function filterProjects(category) {
  const selectedCategory = category.toLowerCase();
  filterItems.forEach((item) => {
    item.classList.toggle('active', selectedCategory === 'all' || item.dataset.category.toLowerCase() === selectedCategory);
  });
}

select?.addEventListener('click', () => toggleActive(select));
document.querySelectorAll('[data-select-item]').forEach((item) => {
  item.addEventListener('click', () => {
    const category = item.textContent.trim();
    if (selectValue) selectValue.textContent = category;
    select?.classList.remove('active');
    filterProjects(category);
    filterButtons.forEach((button) => button.classList.toggle('active', button.textContent.trim().toLowerCase() === category.toLowerCase()));
  });
});
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.textContent.trim();
    if (selectValue) selectValue.textContent = category;
    filterProjects(category);
    filterButtons.forEach((otherButton) => otherButton.classList.toggle('active', otherButton === button));
  });
});

const projectModal = document.querySelector('[data-project-modal]');
const projectModalImage = document.querySelector('[data-project-modal-image]');
const projectModalTitle = document.querySelector('[data-project-modal-title]');
const projectModalCategory = document.querySelector('[data-project-modal-category]');
const projectModalDescription = document.querySelector('[data-project-modal-description]');
const projectModalTools = document.querySelector('[data-project-modal-tools]');
const amrVideos = document.querySelector('[data-project-amr-videos]');
const machineXVideos = document.querySelector('[data-project-machinex-videos]');
const perceptionVideos = document.querySelector('[data-project-perception-videos]');
let lastProjectTrigger;

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.hidden = true;
  document.body.style.overflow = '';
  lastProjectTrigger?.focus();
}

document.querySelectorAll('[data-project-details]').forEach((project) => {
  project.addEventListener('click', () => {
    lastProjectTrigger = project;
    projectModalImage.src = project.dataset.image;
    projectModalImage.alt = project.dataset.title;
    projectModalTitle.textContent = project.dataset.title;
    projectModalCategory.textContent = project.dataset.category;
    projectModalDescription.textContent = project.dataset.description;
    projectModalTools.textContent = project.dataset.tools;
    const videoSet = project.dataset.videoSet;
    amrVideos.hidden = videoSet !== 'amr';
    machineXVideos.hidden = videoSet !== 'machinex';
    perceptionVideos.hidden = videoSet !== 'perception';
    projectModal.hidden = false;
    document.body.style.overflow = 'hidden';
    projectModal.querySelector('.project-modal-close').focus();
  });
});

document.querySelectorAll('[data-project-modal-close]').forEach((button) => button.addEventListener('click', closeProjectModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && projectModal && !projectModal.hidden) closeProjectModal();
});

const form = document.querySelector('[data-form]');
const formButton = document.querySelector('[data-form-btn]');
const formStatus = document.querySelector('[data-form-status]');
const formInputs = document.querySelectorAll('[data-form-input]');

function updateFormButton() {
  if (form && formButton) formButton.disabled = !form.checkValidity();
}

formInputs.forEach((input) => input.addEventListener('input', updateFormButton));
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const subject = `Portfolio enquiry from ${data.get('fullname')}`;
  const body = `Name: ${data.get('fullname')}\nEmail: ${data.get('email')}\n\nMessage:\n${data.get('message')}`;
  if (formStatus) formStatus.textContent = 'Opening your email app...';
  window.location.href = `mailto:vishwags26@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const pageName = link.dataset.pageTarget;
    pages.forEach((page) => page.classList.toggle('active', page.dataset.page === pageName));
    navigationLinks.forEach((navLink) => navLink.classList.toggle('active', navLink === link));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
