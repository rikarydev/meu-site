'use strict';

(function init() {
  const modal = document.getElementById('age-modal');
  const main = document.getElementById('main-content');
  const btn = document.getElementById('age-confirm-btn');
  const STORAGE_AGE = 'gn_verified_platinum';
  const STORAGE_TIME = 'gn_timer_end_platinum';

  function startSite() {
    modal.classList.add('hidden');
    main.classList.remove('hidden');
    document.body.style.overflow = '';
    runTimer();
    runNotifs();
  }

  // Verifica confirmação de idade
  if (localStorage.getItem(STORAGE_AGE) === 'true') {
    startSite();
  }

  btn.addEventListener('click', () => {
    localStorage.setItem(STORAGE_AGE, 'true');
    startSite();
  });

  /**
   * TEMPORIZADOR (1 HORA)
   */
  function runTimer() {
    const duration = 60 * 60 * 1000;
    let end = localStorage.getItem(STORAGE_TIME);
    if (!end || Date.now() > parseInt(end)) {
      end = Date.now() + duration;
      localStorage.setItem(STORAGE_TIME, end);
    } else {
      end = parseInt(end);
    }

    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-minutes');
    const sEl = document.getElementById('cd-seconds');

    function update() {
      const diff = end - Date.now();
      if (diff <= 0) {
        hEl.innerText = mEl.innerText = sEl.innerText = '00';
        return;
      }
      const sTotal = Math.floor(diff / 1000);
      const h = Math.floor(sTotal / 3600);
      const m = Math.floor((sTotal % 3600) / 60);
      const s = sTotal % 60;
      hEl.innerText = String(h).padStart(2, '0');
      mEl.innerText = String(m).padStart(2, '0');
      sEl.innerText = String(s).padStart(2, '0');
    }
    update();
    setInterval(update, 1000);
  }

  /**
   * NOTIFICAÇÕES FLUTUANTES (SEM ALTERAÇÃO)
   */
  function runNotifs() {
    const notif = document.getElementById('floating-notification');
    const text = document.getElementById('notif-text');
    const msgs = [
      'Pedro acabou de assinar! 🔥',
      'Rafael renovou o acesso VIP! ✅',
      'Lucas entrou no grupo exclusivo! 👑',
      'Mais 1 vaga preenchida! Restam poucas! ⚡'
    ];
    let i = 0;
    function show() {
      text.innerText = msgs[i % msgs.length];
      i++;
      notif.classList.remove('hidden');
      setTimeout(() => notif.classList.add('hidden'), 4000);
    }
    setTimeout(show, 3000);
    setInterval(show, 12000);
  }
})();
