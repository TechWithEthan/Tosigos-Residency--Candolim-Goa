    // Year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // IntersectionObserver to reveal elements smoothly
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      const observer = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
      },{threshold:.08});
      document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    }

    // Reservation form handling
    const form = document.getElementById('reservationForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpin = submitBtn.querySelector('.btn-spinner');

    // Set min dates
    const today = new Date().toISOString().split('T')[0];
    const checkin = form.elements['checkin'];
    const checkout = form.elements['checkout'];
    checkin.min = today; checkout.min = today;

    checkin.addEventListener('change', ()=>{ checkout.min = checkin.value || today; if (checkout.value && checkout.value < checkout.min) checkout.value = checkout.min; });

    // Simple Bootstrap validation + demo submission
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if (!form.checkValidity() || new Date(checkout.value) <= new Date(checkin.value)) {
        if (new Date(checkout.value) <= new Date(checkin.value)) {
          checkout.setCustomValidity('Check-out must be after check-in.');
        } else {
          checkout.setCustomValidity('');
        }
        form.classList.add('was-validated');
        return;
      }
      checkout.setCustomValidity('');

      // Simulate sending — replace with your backend/API or Google Forms endpoint
      btnText.classList.add('d-none');
      btnSpin.classList.remove('d-none');

      setTimeout(()=>{
        btnText.classList.remove('d-none');
        btnSpin.classList.add('d-none');

        const toast = new bootstrap.Toast(document.getElementById('successToast'));
        toast.show();
        form.reset();
        form.classList.remove('was-validated');
      }, 800);
    });

    // Optional: create a WhatsApp message when checkbox is checked
    document.getElementById('whatsapp').addEventListener('change', (e)=>{
      if (e.target.checked) {
        // You can pre-fill and open WhatsApp after submit if desired
        // window.open(`https://wa.me/9082330903?text=Hi%20Tosigos%20Residency%2C%20I'd%20like%20to%20book...`, '_blank');
      }
    });
