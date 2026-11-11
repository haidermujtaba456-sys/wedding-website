/* Hassan Mehdi — Premium Wedding Website | Shared Script */
(function(){
  "use strict";
  var $ = function(s, c){ return (c||document).querySelector(s); };
  var $$ = function(s, c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); };

  /* Hamburger menu */
  var burger = $("#hamburger"), nav = $("#mainNav");
  if (burger && nav) {
    burger.addEventListener("click", function(){
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.textContent = open ? "✕" : "☰";
    });
    $$("a", nav).forEach(function(a){
      a.addEventListener("click", function(){ nav.classList.remove("open"); burger.textContent = "☰"; });
    });
  }

  /* Active nav highlighting by page */
  var page = (location.pathname.split("/").pop() || "index.html").split("?")[0].split("#")[0];
  if (!page) page = "index.html";
  $$(".main-nav a").forEach(function(a){
    var href = a.getAttribute("href");
    if (href === page || (page === "index.html" && href === "index.html")) a.classList.add("active");
  });

  /* Scroll reveal */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else { revealEls.forEach(function(el){ el.classList.add("visible"); }); }

  /* Countdown to Baraat: Sat 19 Dec 2026, 7:00 PM PKT */
  var target = new Date("2026-12-19T19:00:00+05:00").getTime();
  var cd = $("#countdown");
  function pad(n){ return String(n).padStart(2, "0"); }
  function tick(){
    if (!cd) return;
    var diff = target - Date.now();
    if (diff <= 0) {
      var msg = $("#countdownMessage");
      if (msg) msg.textContent = "The celebration has begun — Hassan Mehdi is married!";
      ["cdDays","cdHours","cdMins","cdSecs"].forEach(function(id){ var el=document.getElementById(id); if(el) el.textContent="00"; });
      return;
    }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor(diff % 86400000 / 3600000);
    var m = Math.floor(diff % 3600000 / 60000);
    var s = Math.floor(diff % 60000 / 1000);
    var set = function(id, v){ var el=document.getElementById(id); if(el) el.textContent = pad(v); };
    set("cdDays", d); set("cdHours", h); set("cdMins", m); set("cdSecs", s);
  }
  if (cd) { tick(); setInterval(tick, 1000); }

  /* Back to top */
  var topBtn = $("#backTop");
  if (topBtn) {
    window.addEventListener("scroll", function(){ topBtn.classList.toggle("show", window.scrollY > 600); }, { passive: true });
    topBtn.addEventListener("click", function(){ window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* Gallery filter + lightbox */
  var filterBtns = $$(".filter-btn");
  var figures = $$(".masonry figure");
  filterBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      filterBtns.forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      figures.forEach(function(fig){
        fig.classList.toggle("hidden", !(f === "all" || fig.getAttribute("data-cat") === f));
      });
    });
  });
  var lightbox = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  var visibleFigs = function(){ return figures.filter(function(f){ return !f.classList.contains("hidden"); }); };
  var current = 0;
  function openLb(i){
    if (!lightbox) return;
    var list = visibleFigs(); if (!list.length) return;
    current = (i + list.length) % list.length;
    var img = list[current].querySelector("img");
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = img.alt + "  •  " + (current + 1) + " of " + list.length;
    lightbox.classList.add("open"); document.body.style.overflow = "hidden";
  }
  function closeLb(){ if (lightbox) lightbox.classList.remove("open"); document.body.style.overflow = ""; }
  figures.forEach(function(fig, i){
    fig.addEventListener("click", function(){ openLb(visibleFigs().indexOf(fig)); });
  });
  if (lightbox) {
    $("#lbClose").addEventListener("click", closeLb);
    $("#lbPrev").addEventListener("click", function(){ openLb(current - 1); });
    $("#lbNext").addEventListener("click", function(){ openLb(current + 1); });
    lightbox.addEventListener("click", function(e){ if (e.target === lightbox) closeLb(); });
    document.addEventListener("keydown", function(e){
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") openLb(current + 1);
      if (e.key === "ArrowLeft") openLb(current - 1);
    });
  }

  /* FAQ accordion */
  $$(".faq-q").forEach(function(btn){
    btn.addEventListener("click", function(){
      var item = btn.closest(".faq-item");
      var wasOpen = item.classList.contains("open");
      $$(".faq-item").forEach(function(i){ i.classList.remove("open"); });
      if (!wasOpen) item.classList.add("open");
      btn.setAttribute("aria-expanded", wasOpen ? "false" : "true");
    });
  });

  /* Helpers for forms */
  function markInvalid(field, bad){
    field.classList.toggle("invalid", bad);
    return !bad;
  }
  function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  /* RSVP form */
  var rsvpForm = $("#rsvpForm");
  if (rsvpForm) {
    var savedBox = $("#savedRsvp");
    try {
      var saved = JSON.parse(localStorage.getItem("wedding-rsvp") || "null");
      if (saved && savedBox) {
        savedBox.style.display = "block";
        savedBox.innerHTML = "<strong>Your saved RSVP:</strong> " + saved.name + " — " + (saved.attending === "yes" ? "Attending" : "Unable to attend") + ", " + saved.guests + " guest(s), events: " + (saved.events || []).join(", ");
      }
    } catch (e) {}
    rsvpForm.addEventListener("submit", function(e){
      e.preventDefault();
      var name = $("#rsvpName"), email = $("#rsvpEmail"), phone = $("#rsvpPhone"),
          guests = $("#rsvpGuests"), attending = rsvpForm.querySelector('input[name="attending"]:checked');
      var ok = true;
      ok = markInvalid(name.closest(".field"), !name.value.trim()) && ok;
      ok = markInvalid(email.closest(".field"), !validEmail(email.value.trim())) && ok;
      var digits = phone.value.replace(/\D/g, "");
      ok = markInvalid(phone.closest(".field"), digits.length < 10) && ok;
      if (!attending) { var af = $("#attendingField"); if (af) af.classList.add("invalid"); ok = false; }
      else { var af2 = $("#attendingField"); if (af2) af2.classList.remove("invalid"); }
      if (!ok) return;
      var events = $$('input[name="rsvpEvents"]:checked', rsvpForm).map(function(c){ return c.value; });
      var data = {
        name: name.value.trim(), email: email.value.trim(), phone: phone.value.trim(),
        guests: guests.value, attending: attending.value, events: events,
        meal: ($("#rsvpMeal") || {}).value || "", requests: ($("#rsvpRequests") || {}).value || "",
        submittedAt: new Date().toISOString()
      };
      try { localStorage.setItem("wedding-rsvp", JSON.stringify(data)); } catch (err) {}
      var success = $("#rsvpSuccess"), summary = $("#rsvpSummary");
      if (summary) summary.innerHTML = "<strong>Thank you, " + data.name + "!</strong><br>Attendance: " + (data.attending === "yes" ? "Joyfully accepting" : "Regretfully declining") + "<br>Guests: " + data.guests + "<br>Events: " + (events.length ? events.join(", ") : "—") + "<br>Meal: " + (data.meal || "—");
      if (success) { success.classList.add("show"); success.scrollIntoView({ behavior: "smooth", block: "center" }); }
      if (savedBox) { savedBox.style.display = "block"; savedBox.innerHTML = "<strong>Your saved RSVP:</strong> " + data.name + " — " + (data.attending === "yes" ? "Attending" : "Unable to attend") + ", " + data.guests + " guest(s)."; }
      rsvpForm.reset();
    });
  }

  /* Contact form */
  var contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();
      var name = $("#contactName"), email = $("#contactEmail"), subject = $("#contactSubject"), message = $("#contactMessage");
      var ok = true;
      ok = markInvalid(name.closest(".field"), !name.value.trim()) && ok;
      ok = markInvalid(email.closest(".field"), !validEmail(email.value.trim())) && ok;
      ok = markInvalid(subject.closest(".field"), !subject.value.trim()) && ok;
      ok = markInvalid(message.closest(".field"), message.value.trim().length < 10) && ok;
      if (!ok) return;
      try {
        var list = JSON.parse(localStorage.getItem("wedding-contact") || "[]");
        list.push({ name: name.value.trim(), email: email.value.trim(), subject: subject.value.trim(), message: message.value.trim(), at: new Date().toISOString() });
        localStorage.setItem("wedding-contact", JSON.stringify(list));
      } catch (err) {}
      var s = $("#contactSuccess");
      if (s) { s.classList.add("show"); s.scrollIntoView({ behavior: "smooth", block: "center" }); }
      contactForm.reset();
    });
  }

  /* Invitation: download + share + print */
  var dlBtn = $("#downloadInvite");
  if (dlBtn) {
    dlBtn.addEventListener("click", function(){
      var card = $("#inviteCard");
      var html = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>Hassan Mehdi — Wedding Invitation</title><style>body{font-family:Georgia,serif;text-align:center;padding:48px;color:#3A2E2A;background:#FFF8F0}h1{font-size:42px}h2{font-size:30px;color:#8A6D00}.box{border:3px double #C9A227;padding:40px;max-width:640px;margin:0 auto;background:#fff}</style></head><body><div class=\"box\"><p>With the blessings of our families</p><h1>Hassan Mehdi &amp; The Bride</h1><p>request the honour of your presence</p><h2>Saturday, 19 December 2026 — 7:00 PM</h2><p>Royal Palm Golf &amp; Country Club, Lahore, Pakistan</p><p>Baraat &amp; Nikah • Walima — Sunday, 20 December 2026, 7:00 PM</p><p>#HassanMehdiWedding</p></div></body></html>";
      var blob = new Blob([html], { type: "text/html" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "Hassan-Mehdi-Wedding-Invitation.html";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1000);
    });
  }
  var shareBtn = $("#shareInvite");
  if (shareBtn) {
    shareBtn.addEventListener("click", function(){
      var data = { title: "Hassan Mehdi — Wedding Invitation", text: "You are invited! Hassan Mehdi & The Bride — Saturday, 19 December 2026, 7:00 PM, Royal Palm Golf & Country Club, Lahore. #HassanMehdiWedding", url: location.href };
      if (navigator.share) { navigator.share(data).catch(function(){}); return; }
      var wa = "https://wa.me/?text=" + encodeURIComponent(data.text + " " + data.url);
      window.open(wa, "_blank");
    });
  }
  var copyBtn = $("#copyInviteLink");
  if (copyBtn) {
    copyBtn.addEventListener("click", function(){
      var done = function(){ copyBtn.textContent = "Link Copied ✓"; setTimeout(function(){ copyBtn.textContent = "Copy Invitation Link"; }, 2500); };
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(location.href).then(done).catch(done); }
      else { done(); }
    });
  }
  var printBtn = $("#printInvite");
  if (printBtn) printBtn.addEventListener("click", function(){ window.print(); });
})();
