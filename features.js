/* =====================================================================
   RI81 FEATURES — Peta Interaktif, Twibbon, Wall of Wishes,
   Mini Game, Leaderboard, Musik Latar
   Semua fitur cek dulu apakah elemen terkait ada di halaman (guard
   clause) supaya tidak error walau salah satu section tidak dipakai.
===================================================================== */
(function () {
  "use strict";

  function esc(str) {
    const d = document.createElement("div");
    d.textContent = str == null ? "" : String(str);
    return d.innerHTML;
  }

  /* ================= MODAL GENERIK (dipakai Peta) ================= */
  const mapModal = document.getElementById("mapModal");
  const mapModalContent = document.getElementById("mapModalContent");

  function openMapModal(html) {
    if (!mapModal || !mapModalContent) return;
    mapModalContent.innerHTML = html;
    mapModal.classList.add("open");
    mapModal.setAttribute("aria-hidden", "false");
  }
  function closeMapModal() {
    if (!mapModal) return;
    mapModal.classList.remove("open");
    mapModal.setAttribute("aria-hidden", "true");
  }
  if (mapModal) {
    const closeBtn = document.getElementById("mapModalClose");
    const backdrop = document.getElementById("mapModalBackdrop");
    if (closeBtn) closeBtn.addEventListener("click", closeMapModal);
    if (backdrop) backdrop.addEventListener("click", closeMapModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMapModal();
    });
  }

  /* ========================= 1. PETA INTERAKTIF ========================= */
  (function () {
    const box = document.getElementById("mapContainer");
    if (!box) return;

    const regions = [
      { id: "aceh", nama: "Aceh", emoji: "🪕", x: 60, y: 90, budaya: "Tari Saman dan musik tradisional yang sarat nilai kebersamaan.", makanan: "Mie Aceh", rumah: "Rumoh Aceh", pakaian: "Ulee Balang" },
      { id: "sumbar", nama: "Sumatera Barat", emoji: "🏠", x: 175, y: 195, budaya: "Kekayaan tradisi Minangkabau dengan sistem adat matrilineal.", makanan: "Rendang", rumah: "Rumah Gadang", pakaian: "Bundo Kanduang" },
      { id: "jakarta", nama: "DKI Jakarta", emoji: "🎶", x: 300, y: 250, budaya: "Ondel-ondel dan budaya Betawi yang ikonik.", makanan: "Kerak Telor", rumah: "Rumah Kebaya", pakaian: "Baju Sadariah" },
      { id: "jateng", nama: "Jawa Tengah", emoji: "🧵", x: 415, y: 160, budaya: "Batik, wayang, dan gamelan sebagai warisan tak benda.", makanan: "Gudeg & Lumpia", rumah: "Rumah Joglo", pakaian: "Kebaya Jawa" },
      { id: "bali", nama: "Bali", emoji: "🩰", x: 525, y: 255, budaya: "Tari tradisional, pura megah, dan upacara adat yang khidmat.", makanan: "Ayam Betutu", rumah: "Gapura Candi Bentar", pakaian: "Payas Adat Bali" },
      { id: "sulsel", nama: "Sulawesi Selatan", emoji: "🏝️", x: 640, y: 130, budaya: "Budaya Bugis-Makassar dan kapal Pinisi yang melegenda.", makanan: "Coto Makassar", rumah: "Tongkonan", pakaian: "Baju Bodo" },
      { id: "maluku", nama: "Maluku", emoji: "🎨", x: 790, y: 205, budaya: "Musik dan tarian kepulauan rempah yang kaya sejarah.", makanan: "Papeda & Ikan Kuah Kuning", rumah: "Baileo", pakaian: "Baju Cele" },
      { id: "papua", nama: "Papua", emoji: "🪶", x: 925, y: 140, budaya: "Keragaman suku, seni ukir, dan tradisi tanah Papua.", makanan: "Papeda", rumah: "Honai", pakaian: "Koteka & Rok Rumbai" }
    ];

    const W = 1000, H = 320;
    const points = regions.map(function (r) { return r.x + "," + r.y; }).join(" ");
    let svg = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Peta interaktif Indonesia" xmlns="http://www.w3.org/2000/svg">';
    svg += '<polyline points="' + points + '" class="map-route"></polyline>';
    regions.forEach(function (r) {
      svg +=
        '<g class="map-pin" data-id="' + r.id + '" tabindex="0" role="button" aria-label="' + esc(r.nama) + '">' +
        '<circle cx="' + r.x + '" cy="' + r.y + '" r="26" class="map-circle"></circle>' +
        '<text x="' + r.x + '" y="' + (r.y + 8) + '" class="map-emoji" text-anchor="middle">' + r.emoji + "</text>" +
        '<text x="' + r.x + '" y="' + (r.y + 44) + '" class="map-label" text-anchor="middle">' + esc(r.nama) + "</text>" +
        "</g>";
    });
    svg += "</svg>";
    box.innerHTML = svg;

    function openRegion(id) {
      const r = regions.filter(function (x) { return x.id === id; })[0];
      if (!r) return;
      openMapModal(
        '<div class="map-modal-head">' + r.emoji + " <h3>" + esc(r.nama) + "</h3></div>" +
        "<p>" + esc(r.budaya) + "</p>" +
        '<ul class="map-detail-list">' +
        "<li><b>Makanan Khas:</b> " + esc(r.makanan) + "</li>" +
        "<li><b>Rumah Adat:</b> " + esc(r.rumah) + "</li>" +
        "<li><b>Pakaian Adat:</b> " + esc(r.pakaian) + "</li>" +
        "</ul>"
      );
    }

    Array.prototype.forEach.call(box.querySelectorAll(".map-pin"), function (pin) {
      pin.addEventListener("click", function () { openRegion(pin.dataset.id); });
      pin.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openRegion(pin.dataset.id);
        }
      });
    });
  })();

  /* ========================= 2. TWIBBON GENERATOR ========================= */
  (function () {
    const canvas = document.getElementById("twibbonCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const fileInput = document.getElementById("twibbonUpload");
    const chooseBtn = document.getElementById("twibbonChooseBtn");
    const downloadBtn = document.getElementById("twibbonDownloadBtn");
    let userImg = null;

    function drawFrame() {
      ctx.fillStyle = "#d9081c";
      ctx.fillRect(0, 0, W, 64);
      ctx.fillStyle = "#fff";
      ctx.font = '800 26px "Playfair Display", serif';
      ctx.textAlign = "center";
      ctx.fillText("DIRGAHAYU RI KE-81", W / 2, 42);

      const bandH = 96;
      ctx.fillStyle = "rgba(17,18,23,0.9)";
      ctx.fillRect(0, H - bandH, W, bandH);
      ctx.fillStyle = "#fff";
      ctx.font = '700 22px "DM Sans", sans-serif';
      ctx.fillText("MERDEKA! 🇮🇩", W / 2, H - bandH + 38);
      ctx.font = '600 15px "DM Sans", sans-serif';
      ctx.fillStyle = "#ffb5bc";
      ctx.fillText("SMK NEGERI 1 ADIWERNA", W / 2, H - bandH + 68);

      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, W - 10, H - 10);
      ctx.strokeStyle = "#d9081c";
      ctx.lineWidth = 4;
      ctx.strokeRect(14, 14, W - 28, H - 28);
    }

    function drawPlaceholder() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#fff7f3";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(217,8,28,0.35)";
      ctx.setLineDash([10, 8]);
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, W - 40, H - 40);
      ctx.setLineDash([]);
      ctx.fillStyle = "#d9081c";
      ctx.font = "700 54px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("📸", W / 2, H / 2 - 10);
      ctx.fillStyle = "#68646a";
      ctx.font = '600 18px "DM Sans", sans-serif';
      ctx.fillText('Klik untuk pilih foto', W / 2, H / 2 + 36);
      drawFrame();
    }

    function drawWithImage() {
      ctx.clearRect(0, 0, W, H);
      const iw = userImg.width, ih = userImg.height;
      const scale = Math.max(W / iw, H / ih);
      const dw = iw * scale, dh = ih * scale;
      const dx = (W - dw) / 2, dy = (H - dh) / 2;
      ctx.drawImage(userImg, dx, dy, dw, dh);
      drawFrame();
    }

    if (chooseBtn) chooseBtn.addEventListener("click", function () { fileInput.click(); });
    canvas.addEventListener("click", function () { fileInput.click(); });

    if (fileInput) {
      fileInput.addEventListener("change", function (e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!file.type || file.type.indexOf("image/") !== 0) {
          alert("Mohon pilih file gambar (JPG/PNG).");
          return;
        }
        const reader = new FileReader();
        reader.onload = function (ev) {
          const img = new Image();
          img.onload = function () {
            userImg = img;
            drawWithImage();
            if (downloadBtn) downloadBtn.disabled = false;
          };
          img.onerror = function () { alert("Gagal memuat gambar, coba file lain."); };
          img.src = ev.target.result;
        };
        reader.onerror = function () { alert("Gagal membaca file."); };
        reader.readAsDataURL(file);
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        if (!userImg) return;
        const link = document.createElement("a");
        link.download = "twibbon-hutri81-adiwerna.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }

    drawPlaceholder();
  })();

  /* ========================= 3. WALL OF WISHES ========================= */
  (function () {
    const form = document.getElementById("wishForm");
    if (!form) return;
    const nameInput = document.getElementById("wishName");
    const textInput = document.getElementById("wishText");
    const list = document.getElementById("wishList");
    const KEY = "ri81_wishes";

    function load() {
      try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) { return []; }
    }
    function save(arr) {
      try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {}
    }

    function render() {
      const wishes = load();
      if (wishes.length === 0) {
        list.innerHTML = '<p class="wish-empty">Jadilah yang pertama menuliskan harapan untuk Indonesia! 🇮🇩</p>';
        return;
      }
      list.innerHTML = wishes.map(function (w, i) {
        const tanggal = new Date(w.time).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
        return (
          '<div class="wish-card">' +
          '<button class="wish-del" data-i="' + i + '" aria-label="Hapus harapan">✕</button>' +
          '<p class="wish-text"></p>' +
          '<span class="wish-meta"><b class="wish-name"></b> • ' + tanggal + "</span>" +
          "</div>"
        );
      }).join("");

      const cards = list.querySelectorAll(".wish-card");
      cards.forEach(function (card, i) {
        card.querySelector(".wish-text").textContent = wishes[i].text;
        card.querySelector(".wish-name").textContent = wishes[i].name || "Anonim";
      });
      list.querySelectorAll(".wish-del").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const arr = load();
          arr.splice(Number(btn.dataset.i), 1);
          save(arr);
          render();
        });
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const text = textInput.value.trim();
      if (!text) return;
      const arr = load();
      arr.unshift({ name: nameInput.value.trim().slice(0, 30), text: text.slice(0, 200), time: Date.now() });
      save(arr);
      textInput.value = "";
      nameInput.value = "";
      render();
    });

    render();
  })();

  /* ========================= 4. MINI GAME: TANGKAP BENDERA ========================= */
  (function () {
    const canvas = document.getElementById("gameCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const scoreEl = document.getElementById("gameScore");
    const timeEl = document.getElementById("gameTime");
    const startBtn = document.getElementById("gameStartBtn");
    const overBox = document.getElementById("gameOverBox");

    const basket = { w: 90, h: 20, x: (W - 90) / 2, y: H - 34 };
    let items = [];
    let score = 0;
    let timeLeft = 30;
    let running = false;
    let rafId = null;
    let timerId = null;
    let spawnTimer = 0;

    function resetState() {
      items = [];
      score = 0;
      timeLeft = 30;
      basket.x = (W - basket.w) / 2;
      if (scoreEl) scoreEl.textContent = "0";
      if (timeEl) timeEl.textContent = "30";
      overBox.hidden = true;
      overBox.innerHTML = "";
    }

    function spawnItem() {
      const bad = Math.random() < 0.25;
      items.push({
        x: 20 + Math.random() * (W - 40),
        y: -20,
        speed: 2 + Math.random() * 2.2 + (30 - timeLeft) * 0.03,
        bad: bad,
        emoji: bad ? "🏴" : "🇮🇩"
      });
    }

    function drawBasket() {
      ctx.fillStyle = "#111217";
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(basket.x, basket.y, basket.w, basket.h, 8);
        ctx.fill();
      } else {
        ctx.fillRect(basket.x, basket.y, basket.w, basket.h);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#fff9f5";
      ctx.fillRect(0, 0, W, H);
      drawBasket();
      ctx.font = "28px sans-serif";
      ctx.textAlign = "center";
      items.forEach(function (it) { ctx.fillText(it.emoji, it.x, it.y); });
    }

    function loop() {
      if (!running) return;
      spawnTimer++;
      if (spawnTimer > 40) { spawnTimer = 0; spawnItem(); }

      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        it.y += it.speed;
        const caught = it.y > basket.y - 10 && it.y < basket.y + basket.h && it.x > basket.x - 10 && it.x < basket.x + basket.w + 10;
        if (caught) {
          score += it.bad ? -5 : 10;
          if (score < 0) score = 0;
          if (scoreEl) scoreEl.textContent = String(score);
          items.splice(i, 1);
          continue;
        }
        if (it.y > H + 20) items.splice(i, 1);
      }

      draw();
      rafId = requestAnimationFrame(loop);
    }

    function endGame() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (timerId) clearInterval(timerId);
      overBox.hidden = false;
      overBox.innerHTML =
        "<p>⏱️ Waktu habis! Skor akhir kamu: <b>" + score + "</b></p>" +
        '<div class="score-save">' +
        '<input type="text" maxlength="20" placeholder="Nama kamu" class="score-name">' +
        '<button class="btn primary save-score-btn" data-category="game" data-score="' + score + '">Simpan ke Leaderboard</button>' +
        "</div>";
      startBtn.textContent = "Main Lagi";
      startBtn.disabled = false;
    }

    function startGame() {
      resetState();
      running = true;
      startBtn.disabled = true;
      startBtn.textContent = "Sedang Bermain...";
      draw();
      rafId = requestAnimationFrame(loop);
      timerId = setInterval(function () {
        timeLeft--;
        if (timeEl) timeEl.textContent = String(Math.max(0, timeLeft));
        if (timeLeft <= 0) endGame();
      }, 1000);
    }

    function moveBasketTo(clientX) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      let x = (clientX - rect.left) * scaleX - basket.w / 2;
      x = Math.max(0, Math.min(W - basket.w, x));
      basket.x = x;
      if (!running) draw();
    }

    canvas.addEventListener("mousemove", function (e) { if (running) moveBasketTo(e.clientX); });
    canvas.addEventListener("touchmove", function (e) {
      if (!running) return;
      e.preventDefault();
      moveBasketTo(e.touches[0].clientX);
    }, { passive: false });

    document.addEventListener("keydown", function (e) {
      if (!running) return;
      if (e.key === "ArrowLeft") basket.x = Math.max(0, basket.x - 24);
      if (e.key === "ArrowRight") basket.x = Math.min(W - basket.w, basket.x + 24);
    });

    startBtn.addEventListener("click", startGame);
    resetState();
    draw();
  })();

  /* ========================= 5. LEADERBOARD ========================= */
  (function () {
    const list = document.getElementById("leaderboardList");
    if (!list) return;
    const tabs = document.querySelectorAll(".lb-tab");
    const KEY = "ri81_leaderboard";
    let activeCat = "quiz";

    function loadAll() {
      try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : { quiz: [], game: [] };
      } catch (e) { return { quiz: [], game: [] }; }
    }
    function saveAll(data) {
      try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    }

    window.RI81SaveScore = function (category, name, score) {
      const data = loadAll();
      if (!data[category]) data[category] = [];
      data[category].push({ name: (name || "Anonim").slice(0, 20), score: score, time: Date.now() });
      data[category].sort(function (a, b) { return b.score - a.score; });
      data[category] = data[category].slice(0, 10);
      saveAll(data);
    };

    function render() {
      const data = loadAll();
      const arr = data[activeCat] || [];
      if (arr.length === 0) {
        list.innerHTML = '<p class="wish-empty">Belum ada skor. Yuk main dulu!</p>';
        return;
      }
      list.innerHTML = arr.map(function (e, i) {
        return '<li><span class="lb-rank">' + (i + 1) + '</span><span class="lb-name"></span><b class="lb-score">' + e.score + "</b></li>";
      }).join("");
      const names = list.querySelectorAll(".lb-name");
      names.forEach(function (el, i) { el.textContent = arr[i].name; });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        activeCat = tab.dataset.lb;
        render();
      });
    });

    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".save-score-btn");
      if (!btn) return;
      const category = btn.dataset.category;
      const score = Number(btn.dataset.score);
      const wrap = btn.closest(".score-save");
      const nameInput = wrap ? wrap.querySelector(".score-name") : null;
      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Anonim";
      window.RI81SaveScore(category, name, score);
      btn.disabled = true;
      btn.textContent = "Tersimpan ✓";
      if (nameInput) nameInput.disabled = true;
      render();
    });

    render();
  })();

  /* ========================= 7. MUSIK LATAR (default OFF) ========================= */
  (function () {
    const btn = document.getElementById("musicBtn");
    if (!btn) return;
    let ctxAudio = null, gainNode = null, noteTimer = null, playing = false;
    const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // pentatonik

    function ensureCtx() {
      if (!ctxAudio) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        ctxAudio = new AC();
        gainNode = ctxAudio.createGain();
        gainNode.gain.value = 0.05;
        gainNode.connect(ctxAudio.destination);
      }
      return true;
    }

    function playNote(freq) {
      if (!ctxAudio) return;
      const osc = ctxAudio.createOscillator();
      const env = ctxAudio.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      env.gain.setValueAtTime(0, ctxAudio.currentTime);
      env.gain.linearRampToValueAtTime(1, ctxAudio.currentTime + 0.05);
      env.gain.linearRampToValueAtTime(0, ctxAudio.currentTime + 0.9);
      osc.connect(env);
      env.connect(gainNode);
      osc.start();
      osc.stop(ctxAudio.currentTime + 0.95);
    }

    function startMusic() {
      if (!ensureCtx()) {
        alert("Browser ini tidak mendukung Web Audio.");
        return;
      }
      if (ctxAudio.state === "suspended") ctxAudio.resume();
      playing = true;
      btn.textContent = "⏸ Suasana Merdeka • Aktif";
      playNote(scale[Math.floor(Math.random() * scale.length)]);
      noteTimer = setInterval(function () {
        playNote(scale[Math.floor(Math.random() * scale.length)]);
      }, 1000);
    }

    function stopMusic() {
      playing = false;
      btn.textContent = "♫ Suasana Merdeka";
      if (noteTimer) clearInterval(noteTimer);
    }

    btn.onclick = function () {
      if (playing) stopMusic();
      else startMusic();
    };
  })();
})();
