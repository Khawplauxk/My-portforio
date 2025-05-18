const typing = document.querySelector(".typing");
const words = ["Computer Science Student", "Frontend Developer", "UI Designer"];
let i = 0;
let j = 0;
let currentWord = '';
let isDeleting = false;

function type() {
  if (i < words.length) {
    if (!isDeleting && j <= words[i].length) {
      currentWord = words[i].substring(0, j++);
      typing.textContent = currentWord;
      setTimeout(type, 150);
    } else if (isDeleting && j >= 0) {
      currentWord = words[i].substring(0, j--);
      typing.textContent = currentWord;
      setTimeout(type, 100);
    } else if (!isDeleting) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else {
      isDeleting = false;
      i++;
      if (i >= words.length) i = 0;
      setTimeout(type, 500);
    }
  }
}

type();

const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = function() {
  if (window.scrollY > 300) scrollBtn.style.display = "block";
  else scrollBtn.style.display = "none";
};
scrollBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const sectionElements = document.querySelectorAll('section');
function revealSections() {
  sectionElements.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      sec.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

const sections = Array.from(document.querySelectorAll('section'));
let currentSection = 0;
let autoScroll = true;

const intervalId = setInterval(() => {
  if (autoScroll) {
    currentSection = (currentSection + 1) % sections.length;
    sections[currentSection].scrollIntoView({ behavior: 'smooth' });
  }
}, 3000);

function stopAutoScroll() {
  autoScroll = false;
  clearInterval(intervalId);
}

window.addEventListener('wheel', stopAutoScroll, { once: true });
window.addEventListener('touchstart', stopAutoScroll, { once: true });
window.addEventListener('keydown', stopAutoScroll, { once: true });

const navLinks = document.querySelectorAll('.navigation a');

function highlightNav() {
  let scrollPos = window.scrollY || window.pageYOffset;
  sections.forEach((section, idx) => {
    const offset = section.offsetTop - 120;
    const height = section.offsetHeight;
    if (scrollPos >= offset && scrollPos < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[idx].classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);

// ปุ่ม Dark Mode Toggle สวยงาม
const themeToggle = document.getElementById('themeToggle');
function setThemeIcon() {
  if (document.body.classList.contains('dark')) {
    themeToggle.innerHTML = '🌞';
    themeToggle.title = 'Light Mode';
  } else {
    themeToggle.innerHTML = '🌙';
    themeToggle.title = 'Dark Mode';
  }
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  setThemeIcon();
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  setThemeIcon();
});