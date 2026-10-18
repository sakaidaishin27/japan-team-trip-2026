(() => {
  const photos = [...document.querySelectorAll('.photo')];
  const dialog = document.getElementById('lightbox');
  const large = document.getElementById('large-photo');
  const caption = document.getElementById('photo-caption');
  const source = document.getElementById('photo-source');
  const count = document.getElementById('photo-count');
  let current = 0;
  function show(index) {
    current = (index + photos.length) % photos.length;
    const button = photos[current];
    const image = button.querySelector('img');
    large.src = image.src;
    large.alt = image.alt;
    caption.textContent = image.alt;
    source.href = button.dataset.source;
    source.textContent = 'Photo: ' + button.dataset.credit + ' ↗';
    count.textContent = `${current + 1} / ${photos.length}`;
  }
  photos.forEach((button, index) => {
    const image = button.querySelector('img');
    button.setAttribute('aria-label', 'Enlarge photo: ' + image.alt);
    button.addEventListener('click', () => {
      show(index);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  document.getElementById('close-photo').addEventListener('click', () => dialog.close());
  document.getElementById('previous-photo').addEventListener('click', () => show(current - 1));
  document.getElementById('next-photo').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
  });
  document.getElementById('top-link').addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
})();
