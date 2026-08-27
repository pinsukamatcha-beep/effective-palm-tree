document.addEventListener('DOMContentLoaded', () => {
  // 1. Loading Screen Hider
  const loading = document.getElementById('loading');
  if (loading) {
    window.addEventListener('load', () => {
      loading.style.opacity = '0';
      setTimeout(() => loading.style.display = 'none', 500);
    });
  }

  // 2. Mobile Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // 3. Countdown Timer (Menuju 17 Agustus 2027)
  const targetDate = new Date('August 17, 2027 00:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      if (daysEl) daysEl.innerText = String(days).padStart(3, '0');
      if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 4. Populate Dynamic Culture Grid
  const cultureData = [
    { emoji: '🎭', title: 'Wayang Kulit', desc: 'Seni pertunjukan seni bayangan khas Jawa yang kaya akan filosofi.' },
    { emoji: '💃', title: 'Tari Saman', desc: 'Tarian asal Aceh yang terkenal dengan ritme dan kekompakan luar biasa.' },
    { emoji: '🎵', title: 'Angklung', desc: 'Alat musik tradisional Sunda berbahan bambu yang mendunia.' },
    { emoji: '🥋', title: 'Pencak Silat', desc: 'Seni bela diri asli Indonesia dengan gerakan yang bernilai seni.' }
  ];

  const cultureGrid = document.getElementById('cultureGrid');
  if (cultureGrid) {
    cultureGrid.innerHTML = cultureData.map(c => `
      <div class="culture">
        <div class="emoji">${c.emoji}</div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
      </div>
    `).join('');
  }

  // 5. Quiz Interactive Engine
  const quizData = [
    {
      q: 'Kota manakah yang dikenal sebagai Kota Pahlawan?',
      a: ['Jakarta', 'Surabaya', 'Bandung', 'Semarang'],
      correct: 1
    },
    {
      q: 'Naskah Proklamasi Kemerdekaan Indonesia diketik oleh...',
      a: ['Sayuti Melik', 'Sukarni', 'B.M. Diah', 'Chaerul Saleh'],
      correct: 0
    },
    {
      q: 'Lagu kebangsaan Indonesia Raya diciptakan oleh...',
      a: ['Ismail Marzuki', 'C. Simanjuntak', 'W.R. Soepratman', 'Kusbini'],
      correct: 2
    }
  ];

  let currentQuiz = 0;
  let score = 0;

  const quizArea = document.getElementById('quizArea');
  const nextQuizBtn = document.getElementById('nextQuiz');

  function renderQuiz() {
    if (!quizArea) return;
    if (currentQuiz >= quizData.length) {
      quizArea.innerHTML = `<div class="quiz-result">Selamat! Anda menyelesaikan Quiz.<br>Skor Akhir: <b>${score}/${quizData.length}</b></div>`;
      if (nextQuizBtn) {
        nextQuizBtn.innerText = 'Ulangi Quiz';
        nextQuizBtn.style.display = 'inline-block';
      }
      return;
    }

    const q = quizData[currentQuiz];
    quizArea.innerHTML = `
      <div class="question">${q.q}</div>
      <div class="answers">
        ${q.a.map((ans, idx) => `<button class="answer" onclick="checkAnswer(${idx})">${ans}</button>`).join('')}
      </div>
    `;
    if (nextQuizBtn) nextQuizBtn.style.display = 'none';
  }

  window.checkAnswer = function(selectedIdx) {
    const q = quizData[currentQuiz];
    const answersEl = document.querySelectorAll('.answer');
    
    answersEl.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) btn.classList.add('correct');
      if (idx === selectedIdx && idx !== q.correct) btn.classList.add('wrong');
    });

    if (selectedIdx === q.correct) score++;

    setTimeout(() => {
      currentQuiz++;
      renderQuiz();
    }, 1200);
  };

  if (nextQuizBtn) {
    nextQuizBtn.addEventListener('click', () => {
      currentQuiz = 0;
      score = 0;
      renderQuiz();
    });
  }

  // 6. Scroll Reveal & Top Button
  const topBtn = document.getElementById('topBtn');
  const revealElements = document.querySelectorAll('.reveal');

  function handleScroll() {
    if (topBtn) {
      if (window.scrollY > 300) {
        topBtn.classList.add('show');
      } else {
        topBtn.classList.remove('show');
      }
    }

    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Ambient Audio Player (Optional Audio Synthesizer / Player)
  const musicBtn = document.getElementById('musicBtn');
  let isPlaying = false;
  let audioContext;

  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (!isPlaying) {
        // Melodi Sederhana Menggunakan Web Audio API (Tanpa file eksternal)
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        playSimpleTone();
        musicBtn.innerText = '🔊 Audio Aktif';
        isPlaying = true;
      } else {
        if (audioContext) audioContext.close();
        musicBtn.innerText = '♫ Suasana Merdeka';
        isPlaying = false;
      }
    });
  }

  function playSimpleTone() {
    if (!audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz (Nada A)
    gain.gain.setValueAtTime(0.05, audioContext.currentTime);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 1.5);
  }
});