  const guests = [
    { name: "Sophia Martinez", country: "USA", flag: "us", city: "California" },
    { name: "Hiro Tanaka", country: "Japan", flag: "jp", city: "Tokyo" },
    { name: "Amélie Dupont", country: "France", flag: "fr", city: "Paris" },
    { name: "Carlos Rivera", country: "Mexico", flag: "mx", city: "Cancun" },
    { name: "Liu Wei", country: "China", flag: "cn", city: "Beijing" },
    { name: "Aarav Patel", country: "India", flag: "in", city: "Mumbai" },
    { name: "Emma Wilson", country: "UK", flag: "gb", city: "London" },
    { name: "Julia Rossi", country: "Italy", flag: "it", city: "Rome" }
  ];

  const reviews = [
    "The hotel was absolutely stunning! Beautiful views and world-class service.",
    "Great hospitality and peaceful vibes. We loved every moment.",
    "Perfect for family trips. Very secure and staff were lovely.",
    "Amazing food and clean rooms. Would definitely return!",
    "Service was excellent, and the ambience was calming.",
    "One of the best experiences I’ve had while traveling!",
    "The rooms were spotless, and the ocean view was breathtaking.",
    "Highly recommended for couples and honeymooners!"
  ];

  const stars = ["★★★★★", "★★★★☆", "★★★★★", "★★★★☆", "★★★☆☆"];

  const container = document.getElementById("review-container");

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  for (let i = 0; i < 100; i++) {
    const guest = getRandom(guests);
    const review = getRandom(reviews);
    const star = getRandom(stars);
    const img = `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 90)}.jpg`;

    const card = document.createElement("div");
    card.className = "review-card";
    card.style.animationDelay = `${i * 0.05}s`;

    card.innerHTML = `
      <div class="review-header">
        <img src="${img}" alt="Guest Photo">
        <div>
          <div class="review-name">${guest.name}
            <img class="flag" src="https://flagcdn.com/${guest.flag}.svg" alt="${guest.country} Flag">
          </div>
          <div class="review-location">From ${guest.city}, ${guest.country}</div>
        </div>
      </div>
      <div class="review-text">${review}</div>
      <div class="stars">${star}</div>
    `;

    container.appendChild(card);
  }
