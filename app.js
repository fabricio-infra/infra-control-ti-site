"use strict";

/* ================================================================
   CONFIGURAÇÃO DO WHATSAPP
   Informe país + DDD + número, somente dígitos, sem +, espaços ou ():
   Brasil = 55; Maringá = 44; acrescente o número real da empresa.
   Exemplo de formato: 55 + 44 + número com 9 dígitos.
   Número comercial informado pelo responsável pela Infra Control TI.
   ================================================================ */
const WHATSAPP_NUMBER = "5544991017018";
const WHATSAPP_INITIAL_MESSAGE = "Olá! Gostaria de conversar com a Infra Control TI sobre suporte e infraestrutura para minha empresa.";
const INSTAGRAM_URL = "https://www.instagram.com/infracontrolti/";

function getWhatsAppNumber() {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  return /^[1-9]\d{9,14}$/.test(number) ? number : "";
}

function buildWhatsAppUrl(message) {
  const number = getWhatsAppNumber();
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : "";
}

function buildContactMessage(values) {
  return [
    "Olá, Infra Control TI! Gostaria de conversar sobre a TI da minha empresa.",
    "",
    `Nome: ${values.name.trim()}`,
    `Empresa: ${values.company.trim() || "Não informada"}`,
    `Telefone: ${values.phone.trim()}`,
    `E-mail: ${values.email.trim()}`,
    `Assunto: ${values.subject.trim()}`,
    "",
    "Mensagem:",
    values.message.trim()
  ].join("\n");
}

// Mensagens são inseridas como texto; o conteúdo digitado nunca vira HTML.
function showContactFallback(target) {
  const link = document.createElement("a");
  link.href = INSTAGRAM_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Instagram @infracontrolti";
  target.replaceChildren(
    document.createTextNode("O WhatsApp está indisponível no momento. Fale com a gente pelo "),
    link,
    document.createTextNode(" para continuar o atendimento.")
  );
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
}

function setupNavigation() {
  const header = document.getElementById("site-header");
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("main-navigation");
  const mobile = window.matchMedia("(max-width: 1060px)");

  function closeMenu(returnFocus = false) {
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  header.querySelector(".brand").addEventListener("click", () => closeMenu());

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      const wasOpen = navigation.classList.contains("is-open");
      closeMenu();
      // O foco acompanha a navegação, inclusive para quem usa teclado.
      if (wasOpen && link.hash) {
        const target = document.getElementById(link.hash.slice(1));
        if (target) {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
        }
      }
    });
  });

  document.addEventListener("keydown", event => {
    if (!mobile.matches || toggle.getAttribute("aria-expanded") !== "true") return;
    if (event.key === "Escape") { closeMenu(true); return; }
    if (event.key !== "Tab") return;
    const focusable = [toggle, ...navigation.querySelectorAll("a[href]")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });

  document.addEventListener("click", event => {
    if (!header.contains(event.target) && navigation.classList.contains("is-open")) closeMenu();
  });
  const handleViewportChange = () => { if (!mobile.matches) closeMenu(); };
  if (mobile.addEventListener) mobile.addEventListener("change", handleViewportChange);
  else mobile.addListener(handleViewportChange);

  const links = [...navigation.querySelectorAll(".nav-link")];
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  let scheduled = false;
  function updateScrollState() {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
    const offset = header.offsetHeight + 130;
    let currentId = "inicio";
    sections.forEach(section => {
      if (section && section.getBoundingClientRect().top <= offset) currentId = section.id;
    });
    links.forEach(link => {
      const active = link.hash === `#${currentId}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scheduled = false;
  }
  window.addEventListener("scroll", () => {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateScrollState); }
  }, { passive: true });
  updateScrollState();
  document.documentElement.classList.add("js-ready");
}

function setupWhatsAppLinks() {
  const url = buildWhatsAppUrl(WHATSAPP_INITIAL_MESSAGE);
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else if (link.hasAttribute("data-contact-whatsapp")) {
      link.addEventListener("click", event => {
        event.preventDefault();
        showContactFallback(document.getElementById("contact-status"));
      });
    }
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const phone = document.getElementById("phone");
  const name = document.getElementById("name");
  const message = document.getElementById("message");
  const subject = document.getElementById("subject");

  function validatePhone() {
    const digits = phone.value.replace(/\D/g, "");
    const isValid = /^[+\d\s().-]+$/.test(phone.value) && digits.length >= 10 && digits.length <= 15;
    phone.setCustomValidity(phone.value && !isValid ? "Informe um telefone válido com DDD (de 10 a 15 dígitos, incluindo o país, se houver)." : "");
  }
  function validateTrimmed(input, minimum, prompt) {
    input.setCustomValidity(input.value && input.value.trim().length < minimum ? prompt : "");
  }
  phone.addEventListener("input", validatePhone);
  name.addEventListener("input", () => validateTrimmed(name, 2, "Informe seu nome com pelo menos 2 caracteres."));
  message.addEventListener("input", () => validateTrimmed(message, 10, "Descreva sua necessidade com pelo menos 10 caracteres."));
  form.addEventListener("input", () => status.replaceChildren());

  document.querySelectorAll("[data-service]").forEach(link => {
    link.addEventListener("click", () => {
      subject.value = link.dataset.service;
      status.replaceChildren();
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    validatePhone();
    validateTrimmed(name, 2, "Informe seu nome com pelo menos 2 caracteres.");
    validateTrimmed(message, 10, "Descreva sua necessidade com pelo menos 10 caracteres.");
    if (!form.reportValidity()) return;

    const values = Object.fromEntries(new FormData(form).entries());
    const url = buildWhatsAppUrl(buildContactMessage(values));
    if (!url) { showContactFallback(status); return; }

    // Uma navegação direta evita bloqueadores de pop-up. Nenhum dado é salvo
    // em servidor, cookie ou localStorage. O usuário confirma o envio no WhatsApp.
    window.location.assign(url);
  });

  // Sem JavaScript, campos desativados evitam o envio acidental via GET.
  document.getElementById("form-fields").disabled = false;
}

function setupRevealAnimations() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;
  const elements = [...document.querySelectorAll("[data-reveal]")];
  let observer;
  try {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-pending");
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: "0px 0px -20px 0px" });
    elements.forEach(element => {
      // Conteúdo da primeira tela nunca espera a animação.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    });
    // Ir por Tab a um card ou campo deve torná-lo imediatamente visível.
    document.addEventListener("focusin", event => {
      const target = event.target.closest(".reveal-pending");
      if (target) { target.classList.remove("reveal-pending"); observer.unobserve(target); }
    });
    const disableMotion = () => {
      if (reducedMotion.matches) {
        observer.disconnect();
        elements.forEach(element => element.classList.remove("reveal-pending"));
      }
    };
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", disableMotion);
  } catch (error) {
    if (observer) observer.disconnect();
    elements.forEach(element => element.classList.remove("reveal-pending"));
  }
}

setupNavigation();
setupWhatsAppLinks();
setupContactForm();
setupRevealAnimations();

