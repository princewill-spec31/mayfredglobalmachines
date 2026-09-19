const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

const nav = $('.nav');
const menuBtn = $('#menuBtn');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
}

$$('#navLinks a').forEach(a => a.addEventListener('click', () => {
  if (nav) nav.classList.remove('open');
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }
}));

function whatsappUrl(message) {
  return 'https://wa.me/2349013321221?text=' + encodeURIComponent(message);
}

function openWhatsApp(message) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}

// Keep the enquiry dropdown synced with every product shown on the site.
const machineSelect = $('#machineSelect');
if (machineSelect) {
  const products = [...$$('[data-product]')]
    .map(el => (el.dataset.product || '').trim())
    .filter(Boolean);

  [...new Set(products)].forEach(product => {
    const exists = [...machineSelect.options].some(option => option.value === product);
    if (!exists) {
      machineSelect.add(new Option(product, product));
    }
  });
}

function selectMachine(product) {
  if (!machineSelect || !product) return;
  const option = [...machineSelect.options].find(o => o.value === product);
  if (option) {
    machineSelect.value = product;
  } else {
    machineSelect.add(new Option(product, product));
    machineSelect.value = product;
  }
}

$$('.link-btn').forEach(button => {
  button.addEventListener('click', () => {
    selectMachine(button.dataset.product || 'Other');
    const enquiry = $('#enquiry');
    if (enquiry) {
      location.hash = 'enquiry';
      setTimeout(() => enquiry.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
    }
  });
});

// Make every product WhatsApp link work even if JavaScript is slow to initialise.
$$('a[data-product]').forEach(link => {
  const product = (link.dataset.product || '').trim();
  if (!product) return;

  const message = 'Hello MAYFREDGLOBAL MACHINES, I am interested in your ' +
    product +
    '. Please send me the current price and available specifications.';

  link.href = whatsappUrl(message);
  link.addEventListener('click', () => selectMachine(product));
});

const enquiryForm = $('#enquiryForm');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = new FormData(enquiryForm);
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const machine = String(form.get('machine') || 'Other').trim();
    const message = String(form.get('message') || '').trim();

    if (!name || !phone) {
      enquiryForm.reportValidity();
      return;
    }

    const subject = encodeURIComponent('Machine Enquiry - ' + machine);
    const body = encodeURIComponent(
      'Name: ' + name +
      '\nPhone: ' + phone +
      '\nMachine: ' + machine +
      '\nMessage: ' + (message || 'No additional message')
    );

    window.location.href =
      'mailto:fredafam@gmail.com?subject=' + subject + '&body=' + body;
  });
}

const whatsappEnquiry = $('#whatsappEnquiry');
if (whatsappEnquiry && enquiryForm) {
  whatsappEnquiry.addEventListener('click', () => {
    const form = new FormData(enquiryForm);
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const machine = String(form.get('machine') || 'Other').trim();
    const message = String(form.get('message') || '').trim();

    if (!name || !phone) {
      enquiryForm.reportValidity();
      return;
    }

    openWhatsApp(
      'Hello MAYFREDGLOBAL MACHINES, I would like to make an enquiry.\n\n' +
      'Name: ' + name +
      '\nPhone: ' + phone +
      '\nMachine: ' + machine +
      '\nMessage: ' + (message || 'No additional message')
    );
  });
}

// MAYFRED Assistant
const assistant = $('#assistant');
const assistantToggle = $('#assistantToggle');
const assistantClose = $('#assistantClose');

if (assistant && assistantToggle) {
  assistantToggle.addEventListener('click', () => {
    const open = assistant.classList.toggle('open');
    assistantToggle.setAttribute('aria-expanded', String(open));
  });
}

if (assistant && assistantClose) {
  assistantClose.addEventListener('click', () => {
    assistant.classList.remove('open');
    if (assistantToggle) assistantToggle.setAttribute('aria-expanded', 'false');
  });
}

function answer(question) {
  const x = question.toLowerCase();

  if (x.includes('whatsapp')) {
    return 'You can chat with MAYFREDGLOBAL MACHINES directly on WhatsApp using the WhatsApp buttons on this website.';
  }
  if (x.includes('price') || x.includes('cost')) {
    return 'Use the machine enquiry buttons or WhatsApp to ask about a machine. Listed prices are shown on the product cards.';
  }
  if (x.includes('coding')) {
    return 'The DY-8 Date Coding Machine is listed at NGN 90,000.00 and is used for production dates and batch information.';
  }
  if (x.includes('shrink') || x.includes('sleeve') || x.includes('wrapping')) {
    return 'Shrink/Sleeve Wrapping Machines are listed at NGN 7,500,000.00. They are designed for efficient heat-shrink packaging and sealing.';
  }
  if (x.includes('dingli') || x.includes('sachet')) {
    return 'The DINGLI Sachet Water Machine is listed at NGN 2,500,000.00 and is designed for automatic sachet water filling and sealing.';
  }
  if (x.includes('machine')) {
    return 'We showcase water production, coding, sealing and packaging, recycling, blowing and other production equipment. Browse the Machines section for available products.';
  }
  if (x.includes('contact') || x.includes('phone') || x.includes('call')) {
    return 'Call 09013321221, chat on WhatsApp, or email fredafam@gmail.com. Facebook: mayfredglobalmachines. Instagram: @mayfredmachines.';
  }

  return 'I can help you find a machine, check a listed price, request specifications, or contact MAYFREDGLOBAL MACHINES.';
}

function sendChat(question) {
  const chat = $('#chat');
  if (!chat) return;

  const safe = question.replace(/[<>&"']/g, char => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;'
  }[char]));

  chat.insertAdjacentHTML(
    'beforeend',
    '<div class="user">' + safe + '</div><div class="bot">' + answer(question) + '</div>'
  );
  chat.scrollTop = chat.scrollHeight;
}

const chatForm = $('#chatForm');
if (chatForm) {
  chatForm.addEventListener('submit', event => {
    event.preventDefault();
    const input = $('#chatInput');
    const value = input ? input.value.trim() : '';
    if (!value) return;
    sendChat(value);
    input.value = '';
  });
}

$$('.suggestions button').forEach(button => {
  button.addEventListener('click', () => sendChat(button.dataset.q || ''));
});

// Back-to-top button
const backTop = $('#backTop');
if (backTop) {
  const updateBackTop = () => backTop.classList.toggle('show', window.scrollY > 500);
  window.addEventListener('scroll', updateBackTop, { passive: true });
  updateBackTop();
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Reveal animations
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Close the mobile menu with Escape.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav && nav.classList.contains('open')) {
    nav.classList.remove('open');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
    }
  }
});
