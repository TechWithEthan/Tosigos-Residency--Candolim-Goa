    // --- DOM elements ---
    const root = document.documentElement;
    const galleryEl = document.getElementById('gallery');
    const colorPick = document.getElementById('colorPick');
    const intensityRange = document.getElementById('intensityRange');
    const glowRange = document.getElementById('glowRange');
    const ambientRange = document.getElementById('ambientRange');
    const btnStatic = document.getElementById('btnStatic');
    const btnCycle = document.getElementById('btnCycle');
    const btnPulse = document.getElementById('btnPulse');
    const btnOff = document.getElementById('btnOff');
    const presetCool = document.getElementById('presetCool');
    const presetWarm = document.getElementById('presetWarm');
    const presetParty = document.getElementById('presetParty');

    // init
    function setCSSVar(name, value) {
      root.style.setProperty(name, value);
    }

    // Color picker
    colorPick.addEventListener('input', e => {
      setCSSVar('--accent', e.target.value);
    });

    // Intensity (0 - 1)
    intensityRange.addEventListener('input', e => {
      setCSSVar('--led-intensity', e.target.value);
    });

    // Glow size px
    glowRange.addEventListener('input', e => {
      setCSSVar('--glow-size', e.target.value + 'px');
    });

    // Ambient blur px
    ambientRange.addEventListener('input', e => {
      setCSSVar('--ambient-blur', e.target.value + 'px');
    });

    // Mode management: static, cycle, pulse, off
    function setMode(mode) {
      galleryEl.classList.remove('mode-cycle','mode-pulse','mode-off');
      switch(mode) {
        case 'cycle':
          galleryEl.classList.add('mode-cycle');
          break;
        case 'pulse':
          galleryEl.classList.add('mode-pulse');
          break;
        case 'off':
          galleryEl.classList.add('mode-off');
          break;
        default:
          // static (no extra mode class)
          break;
      }
      // update button styles (simple)
      [btnStatic, btnCycle, btnPulse, btnOff].forEach(b => b.classList.remove('active'));
      if(mode === 'cycle') btnCycle.classList.add('active');
      else if(mode === 'pulse') btnPulse.classList.add('active');
      else if(mode === 'off') btnOff.classList.add('active');
      else btnStatic.classList.add('active');
    }

    btnStatic.addEventListener('click', () => setMode('static'));
    btnCycle.addEventListener('click', () => setMode('cycle'));
    btnPulse.addEventListener('click', () => setMode('pulse'));
    btnOff.addEventListener('click', () => setMode('off'));

    // Presets
    presetCool.addEventListener('click', () => {
      colorPick.value = '#00f0ff'; colorPick.dispatchEvent(new Event('input'));
      intensityRange.value = 0.9; intensityRange.dispatchEvent(new Event('input'));
      glowRange.value = 20; glowRange.dispatchEvent(new Event('input'));
      ambientRange.value = 30; ambientRange.dispatchEvent(new Event('input'));
      setMode('static');
    });

    presetWarm.addEventListener('click', () => {
      colorPick.value = '#ffb86b'; colorPick.dispatchEvent(new Event('input'));
      intensityRange.value = 0.85; intensityRange.dispatchEvent(new Event('input'));
      glowRange.value = 18; glowRange.dispatchEvent(new Event('input'));
      ambientRange.value = 22; ambientRange.dispatchEvent(new Event('input'));
      setMode('static');
    });

    presetParty.addEventListener('click', () => {
      setMode('cycle');
      intensityRange.value = 0.95; intensityRange.dispatchEvent(new Event('input'));
      glowRange.value = 26; glowRange.dispatchEvent(new Event('input'));
      ambientRange.value = 36; ambientRange.dispatchEvent(new Event('input'));
    });

    // keyboard accessibility: press Enter or Space on a focused figure opens the lightbox (first child <a>)
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' '){
          const a = item.querySelector('a');
          if(a) a.click();
        }
      });
    });

    // initial CSS variable sync with inputs
    setCSSVar('--accent', colorPick.value);
    setCSSVar('--led-intensity', intensityRange.value);
    setCSSVar('--glow-size', glowRange.value + 'px');
    setCSSVar('--ambient-blur', ambientRange.value + 'px');

    // Small enhancement: show data-title in caption if missing (progressive enhancement)
    document.querySelectorAll('.gallery-item').forEach(fig => {
      const cap = fig.querySelector('.gallery-caption');
      if(!cap || !cap.textContent.trim()){
        const t = fig.getAttribute('data-title') || fig.querySelector('img')?.alt || 'Image';
        if(cap) cap.textContent = t;
      }
    });

    // Lightbox options (optional tweaks)
    if(window.lightbox) {
      lightbox.option({
        'resizeDuration': 200,
        'disableScrolling': true,
        'wrapAround': true,
        'positionFromTop': 80
      });
    }

    // OPTIONAL: If you want automatic scanning of the images folder on server-side,
    // implement server code to create JSON of images and then dynamically build the <figure> items.
    // (Not done here — this is a static front-end only file.)
