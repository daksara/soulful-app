/* ═══════════════════════════════════════════════
   SOULFUL — donate.js  (Saweria)
   ═══════════════════════════════════════════════ */

const SAWERIA_USERNAME = 'daksarasoulful';
let selectedAmount = 5000;

function goSaweria() {
  const url = `https://saweria.co/${SAWERIA_USERNAME}`;
  if (window.Telegram?.WebApp?.openLink) window.Telegram.WebApp.openLink(url);
  else window.open(url, '_blank');
  closeModal();
}

function openModal()  { document.getElementById('modalOverlay').classList.add('open'); }
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}
