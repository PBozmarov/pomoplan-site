(() => {
  const header = document.querySelector("[data-site-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navigation = document.querySelector("[data-site-nav]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const closeNavigation = () => {
    if (!navToggle || !navigation) return;
    navToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  navToggle?.addEventListener("click", () => {
    if (!navigation) return;
    const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navigation.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("nav-open", willOpen);
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.removeAttribute("data-reveal"));
  } else {
    const settleReveal = (item) => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        item.removeAttribute("data-reveal");
        item.classList.remove("is-visible");
      };

      item.addEventListener("transitionend", finish, { once: true });
      window.setTimeout(finish, 700);
    };

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          settleReveal(entry.target);
          activeObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -7%", threshold: 0.08 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  if (emailLinks.length) {
    const toast = document.createElement("div");
    toast.className = "email-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
    let toastTimer;

    const copyText = async (value) => {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return;
      }

      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    };

    emailLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const rawAddress = link.getAttribute("href")?.slice("mailto:".length) ?? "";
        const emailAddress = rawAddress.split("?")[0];
        if (!emailAddress) return;

        copyText(decodeURIComponent(emailAddress))
          .then(() => {
            toast.textContent = "Email copied. If your mail app did not open, paste support@pomoplan.io into it.";
          })
          .catch(() => {
            toast.textContent = "This link opens your configured mail app. You can also email support@pomoplan.io manually.";
          })
          .finally(() => {
            toast.classList.add("is-visible");
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 5000);
          });
      });
    });
  }
})();
