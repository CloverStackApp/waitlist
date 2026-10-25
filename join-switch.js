// Switch the top box between the waitlist form and the invite code form.
// Without this script both forms simply show, one under the other.
(function () {
  var box = document.querySelector('.joinbox');
  if (!box) return;
  var tabs = box.querySelector('.switch');
  var fine = box.querySelector('[data-fine]');
  var waitText = fine.textContent;
  var inviteText = 'Your code is in your invite email. Already joined? Use Sign in at the top.';

  function show(mode) {
    var invite = mode === 'invite';
    tabs.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-selected', String(b.dataset.mode === mode));
    });
    box.querySelector('[data-form="wait"]').hidden = invite;
    box.querySelector('[data-form="invite"]').hidden = !invite;
    fine.textContent = invite ? inviteText : waitText;
  }

  tabs.hidden = false;
  tabs.querySelectorAll('button').forEach(function (b) {
    b.addEventListener('click', function () { show(b.dataset.mode); });
  });
  show('wait');

  // "Use it at the top" in the bottom section opens the invite side.
  document.querySelectorAll('a[href="#top"]').forEach(function (a) {
    a.addEventListener('click', function () {
      show('invite');
      setTimeout(function () { document.getElementById('invite-top').focus(); }, 0);
    });
  });
})();
