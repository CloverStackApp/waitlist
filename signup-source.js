// Record where each signup came from (?utm_source= or ?ref=) in hidden form fields.
(function () {
  var params = new URLSearchParams(location.search);
  var source = params.get('utm_source') || (document.referrer ? new URL(document.referrer).hostname : '');
  var ref = params.get('ref') || '';
  document.querySelectorAll('form[name="waitlist"]').forEach(function (form) {
    form.elements.source.value = source.slice(0, 100);
    form.elements.ref.value = ref.slice(0, 100);
  });
})();
