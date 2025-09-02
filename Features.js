    // Simple accordion
    document.querySelectorAll('.acc-item').forEach(item => {
      const head = item.querySelector('.acc-head')
      const body = item.querySelector('.acc-body')
      head.addEventListener('click', () => {
        const open = body.style.maxHeight && body.style.maxHeight !== '0px'
        document.querySelectorAll('.acc-body').forEach(b => { b.style.maxHeight = '0'; b.classList.remove('open') })
        if(!open){ body.style.maxHeight = body.scrollHeight + 'px'; body.classList.add('open') }
      })
    })

    // Simple interactive buttons - example handlers
    document.getElementById('bookNow').addEventListener('click', () => alert('Redirecting to booking page...'))
    document.getElementById('featuresMore').addEventListener('click', () => alert('Opening full amenities list...'))
    document.getElementById('contactBtn').addEventListener('click', () => alert('Contacting concierge...'))
    document.getElementById('reserveBtn').addEventListener('click', () => alert('Reserve flow starting...'))
    document.getElementById('tourBtn').addEventListener('click', () => alert('Starting virtual tour...'))
    document.getElementById('helpBtn').addEventListener('click', () => alert('Connecting you to live chat...'))

    // Small progressive improvement: lazy load image fallback
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy'
      })
    })
