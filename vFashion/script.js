// Tooltip functionality for course cards
const courseCards = document.querySelectorAll('.course-card');
const tooltip = document.querySelector('.tooltip');

courseCards.forEach((card) => {
  card.addEventListener('mouseenter', (event) => {
    const courseName = card.querySelector('h3').innerText;
    const content = courseDetails[courseName] || [];
    updateTooltip(courseName, content, event, card);
  });

  card.addEventListener('mouseleave', hideTooltip);
});

function updateTooltip(title, content, event, card) {
  document.getElementById('tooltipTitle').innerText = title;
  const contentList = document.getElementById('tooltipContent');
  contentList.innerHTML = content.map((item) => `<li>${item}</li>`).join('');
  showTooltip(event, card);
}

function showTooltip(event, card) {
  tooltip.classList.add('show');
  const cardRect = card.getBoundingClientRect();
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  const screenWidth = window.innerWidth;

  // Ensure tooltip stays within viewport
  let left = cardRect.right + 10;
  if (left + tooltipWidth > screenWidth) {
    left = cardRect.left - tooltipWidth - 10;
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${cardRect.top + cardRect.height / 2 - tooltipHeight / 2}px`;
}

function hideTooltip() {
  tooltip.classList.remove('show');
}

// Slider functionality
const sliderWrapper = document.querySelector('.slider-wrapper');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
let currentTranslate = 0;

rightBtn?.addEventListener('click', () => {
  const maxTranslate = -(sliderWrapper.scrollWidth - sliderWrapper.parentElement.offsetWidth);
  if (currentTranslate > maxTranslate) {
    currentTranslate = Math.max(currentTranslate - 320, maxTranslate);
    sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
  }
});

leftBtn?.addEventListener('click', () => {
  if (currentTranslate < 0) {
    currentTranslate = Math.min(currentTranslate + 320, 0);
    sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
  }
});

// Modal and form functionality
const buyButtons = document.querySelectorAll('.buy-btn');
const formBox = document.querySelector('.form-box');
const overlay = document.querySelector('.overlay');
let selectedCourse = '';

buyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedCourse = button.getAttribute('data-course');
    formBox.classList.add('show');
    overlay.classList.add('show');
  });
});

function closeModal() {
  formBox.classList.remove('show');
  overlay.classList.remove('show');
}

overlay.addEventListener('click', closeModal);

document.getElementById('courseForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();

  if (!name || !email) {
    alert('Please fill in all fields.');
    return;
  }

  const message = `Course Registration%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ACourse: ${encodeURIComponent(selectedCourse)}`;
  const whatsappLink = `https://wa.me/+917483940874?text=${message}`;

  window.open(whatsappLink, '_blank');
  alert('Our team will connect with you soon.');
  closeModal();
});

// Contact form functionality
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
   console.log("hi ");
    if (!name || !email || !message) {
      alert('Please fill in all required fields: Name, Email, and Message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subject:* ${encodeURIComponent(subject || 'No Subject')}%0A*Message:* ${encodeURIComponent(message)}`;
    const whatsappLink = `https://wa.me/917483940874?text=${whatsappMessage}`;

    window.open(whatsappLink, '_blank');
    document.getElementById('contactForm').reset();
    alert('Your message has been sent successfully!');
  });
});
