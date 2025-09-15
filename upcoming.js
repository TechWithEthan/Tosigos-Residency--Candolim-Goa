
// Countdown Timer
const countdown = () => {
  const launchDate = new Date("Sep 15, 2025 09:17:00").getTime();
  const now = new Date().getTime();
  const timeLeft = launchDate - now;

  if (timeLeft <= 0) {
    document.getElementById("countdown").innerHTML = "We Are Live!";
    
    // Redirect to homepage.html after 2 seconds
    setTimeout(() => {
      window.location.href = "homepage.html";
    }, 2000);

    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
};

setInterval(countdown, 1000);
countdown();

// Notify Form
document.getElementById("notifyForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  alert("Thank you! We’ll notify you at: " + email);
  document.getElementById("notifyForm").reset();
});
