/* ppc support-request.js - minimal sample

Usage (place on a Squarespace Code Block or any page):

<div class="ppc-support-request"></div>
<script src="https://raw.githubusercontent.com/ppc-dir/ppc-widgets/main/support-request.js"></script>

This script renders a minimal form with:
 - Business name
 - Name
 - Support request (short description)
 - Submit button
 - Simple confirmation message

No external services are called in this sample.
*/

(function () {
  'use strict';

  function esc(s) { return String(s || '').replace(/[&<>"];"'/g, function (m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; }); }

  var containers = document.querySelectorAll('.ppc-support-request');
  if (!containers || containers.length === 0) return;

  Array.prototype.forEach.call(containers, function (container) {
    // minimal styling
    var style = '\n.ppc-support {font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; max-width:420px; padding:12px; border:1px solid #e3e3e3; border-radius:6px;}\n.ppc-support label{display:block;margin-bottom:8px;font-size:14px;}\n.ppc-support input[type=text], .ppc-support textarea, .ppc-support select{width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;}\n.ppc-support button{margin-top:8px;padding:8px 12px;border-radius:4px;border:0;background:#0b69ff;color:#fff;cursor:pointer;}\n.ppc-support .ppc-message{margin-top:10px;font-size:14px;}\n';

    // inject style (only once)
    if (!document.getElementById('ppc-support-style')) {
      var s = document.createElement('style');
      s.id = 'ppc-support-style';
      s.appendChild(document.createTextNode(style));
      document.head.appendChild(s);
    }

    // render form
    container.innerHTML = '\n      <div class="ppc-support" role="form" aria-label="PPC Support Request">\n        <form novalidate>\n          <label>Business name<br><input name="business" type="text" placeholder="Your business" required></label>\n          <label>Your name<br><input name="name" type="text" placeholder="Full name" required></label>\n          <label>Support request<br><textarea name="request" rows="4" placeholder="Brief description" required></textarea></label>\n          <button type="submit">Submit request</button>\n          <div class="ppc-message" aria-live="polite"></div>\n        </form>\n      </div>\n    ';

    var form = container.querySelector('form');
    var msg = container.querySelector('.ppc-message');
    var submit = form.querySelector('button[type=submit]');

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      msg.textContent = '';

      var business = form.elements['business'].value.trim();
      var name = form.elements['name'].value.trim();
      var request = form.elements['request'].value.trim();

      if (!business || !name || !request) {
        msg.style.color = '#b22222';
        msg.textContent = 'Please complete all fields.';
        return;
      }

      // Build a small narrative to display back to the user
      var narrative = 'Request for ' + business + ' from ' + name + ': "' + request + '"';

      // In this sample we do not call any external APIs.
      // Simulate a small delay like a network call.
      submit.disabled = true;
      submit.textContent = 'Submitting...';

      window.setTimeout(function () {
        submit.disabled = false;
        submit.textContent = 'Submit request';
        msg.style.color = '#1a7f37';
        msg.textContent = 'Thank you — your request has been received. ' + narrative;
        // Optionally clear the form
        form.reset();
      }, 600);
    });
  });
})();
