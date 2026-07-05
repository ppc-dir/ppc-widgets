/* ============================================================
   PW CALENDAR — resize.js
   Host this file at a permanent public URL (e.g. GitHub Pages,
   or a Squarespace-hosted file). Property hosts include this
   <script> tag ONCE on their page, alongside the iframe.
   It listens for the embed page's height and resizes the
   matching iframe automatically — same approach Bookingmood
   uses for its embeds.
   ============================================================ */
(function () {
  window.addEventListener('message', function (event) {
    if (!event.data || typeof event.data.pwCalendarHeight === 'undefined') return;

    var iframes = document.querySelectorAll('iframe[src*="mode=embed"]');
    iframes.forEach(function (iframe) {
      iframe.style.height = event.data.pwCalendarHeight + 'px';
    });
  });
})();
