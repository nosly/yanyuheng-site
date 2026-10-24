/* 十九册与一册 — minimal interaction.
   No framework, no build step. */

(function () {
  "use strict";

  /* ── lightbox ─────────────────────────────────────── */
  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "书影放大");
  box.innerHTML =
    '<button class="close" type="button" aria-label="关闭">×</button>' +
    '<img alt="">';
  document.body.appendChild(box);

  var boxImg = box.querySelector("img");
  var boxClose = box.querySelector(".close");

  function openBox(src, alt) {
    boxImg.src = src;
    boxImg.alt = alt || "";
    box.classList.add("on");
    document.body.style.overflow = "hidden";
    boxClose.focus();
  }

  function closeBox() {
    box.classList.remove("on");
    boxImg.removeAttribute("src");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && t.closest("[data-zoom]")) {
      openBox(t.currentSrc || t.src, t.alt);
      return;
    }
    if (t === box || t === boxClose) closeBox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && box.classList.contains("on")) closeBox();
  });

  /* ── reading: keep one open at a time ─────────────── */
  var readings = document.querySelectorAll("details.reading");
  readings.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (!d.open) return;
      readings.forEach(function (o) {
        if (o !== d) o.open = false;
      });
    });
  });

  /* ── 原件 / 转写 toggle ───────────────────────────── */
  var toggle = document.querySelector("[data-toggle]");
  if (toggle) {
    var btns = toggle.querySelectorAll("button");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var target = b.getAttribute("data-view");
        btns.forEach(function (o) {
          o.setAttribute("aria-pressed", o === b ? "true" : "false");
        });
        document.querySelectorAll("[data-panel]").forEach(function (p) {
          p.hidden = p.getAttribute("data-panel") !== target;
        });
      });
    });
  }

  /* ── contact: assemble address at runtime ────────────
     The plain address never appears in the HTML source.
     Parts are stored reversed so a naive scrape finds nothing
     that is actually mailable. */
  function rev(s) {
    return s.split("").reverse().join("");
  }

  document.querySelectorAll("a.mail").forEach(function (a) {
    var user = rev(a.getAttribute("data-a") || "");
    var host = rev(a.getAttribute("data-b") || "");
    if (!user || !host) return;
    var addr = user + "@" + host;
    a.href = "mailto:" + addr;
    a.textContent = addr;
    a.removeAttribute("data-a");
    a.removeAttribute("data-b");
  });

  /* ── nav: mark current section ────────────────────── */
  var links = Array.prototype.slice.call(
    document.querySelectorAll(".masthead nav a[href^='#']")
  );
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) {
      var el = document.querySelector(a.getAttribute("href"));
      if (el) map[el.id] = a;
    });
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          var a = map[en.target.id];
          if (!a) return;
          if (en.isIntersecting) {
            links.forEach(function (o) {
              o.style.color = "";
            });
            a.style.color = "var(--ink)";
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(map).forEach(function (id) {
      obs.observe(document.getElementById(id));
    });
  }
})();
