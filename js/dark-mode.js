(function() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
    toggle.textContent = '\u2600\uFE0F';
  }
  toggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark-mode');
    var isDark = document.body.classList.contains('dark-mode');
    toggle.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
    localStorage.setItem('darkMode', isDark);
  });
})();
