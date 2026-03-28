
if (window.location.pathname.includes("dashboard.html")) {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  }
}

const moodQuotes = {
  happy: [
    "Happiness is not something ready-made. It comes from your own actions. — Dalai Lama",
    "Enjoy the little things in life, for one day you’ll look back and realize they were the big things. — Robert Brault",
    "The purpose of our lives is to be happy. — Dalai Lama"
  ],
  sad: [
    "Sadness flies away on the wings of time. — Jean de La Fontaine",
    "You don’t have to control your emotions; just don’t let them control you. — Unknown",
    "It’s okay to feel sad. Just remember you won’t feel this way forever. — Unknown"
  ],
  anxious: [
    "You don’t have to control your thoughts. You just have to stop letting them control you. — Dan Millman",
    "Breathe. You’re going to be okay. You’ve gotten through this before. — Unknown",
    "Nothing diminishes anxiety faster than action. — Walter Anderson"
  ],
  angry: [
    "For every minute you are angry you lose sixty seconds of happiness. — Ralph Waldo Emerson",
    "Speak when you are angry and you’ll make the best speech you’ll ever regret. — Ambrose Bierce",
    "Anger is one letter short of danger. — Eleanor Roosevelt"
  ],
  tired: [
    "Almost everything will work again if you unplug it for a few minutes… including you. — Anne Lamott",
    "Sometimes the most productive thing you can do is rest. — Mark Black",
    "Rest is not idleness. It’s recovery. — Seneca"
  ]
};


let currentMoodQuotes = [];
let quoteIndex = 0;

window.addEventListener("DOMContentLoaded", () => {

  const tipBtn = document.getElementById("get-tip-btn");

  if (tipBtn) {
    tipBtn.addEventListener("click", () => {

      const mood = document.getElementById("mood-select")?.value;

      const tipText = document.getElementById("tip-text");
      const tipSection = document.getElementById("tip-section");

      const quoteSection = document.getElementById("quote-section");
      const affirmationSection = document.getElementById("affirmation-section");
      const funFactSection = document.getElementById("fun-fact-section");
      const jokeSection = document.getElementById("joke-section");

      if (!mood) {
        alert("Please select a mood");
        return;
      }

      // SHOW ALL SECTIONS
      if (tipSection) tipSection.style.display = "block";
      if (quoteSection) quoteSection.style.display = "block";
      if (affirmationSection) affirmationSection.style.display = "block";
      if (funFactSection) funFactSection.style.display = "block";
      if (jokeSection) jokeSection.style.display = "block";

      // TIP
      let tip = "Take care of yourself 💚";

      if (mood === "happy") tip = "Celebrate your happiness 💛";
      if (mood === "sad") tip = "Talk to someone 🫂";
      if (mood === "anxious") tip = "Take deep breaths 🌬️";
      if (mood === "angry") tip = "Pause before reacting ⚠️";
      if (mood === "tired") tip = "Rest well 😴";

      if (tipText) tipText.textContent = tip;

      // LOAD QUOTES
      currentMoodQuotes = moodQuotes[mood] || [];
      quoteIndex = 0;

      showQuote();
    });
  }

  // =======================
  // SHOW QUOTE FUNCTION
  // =======================
  function showQuote() {
    const quoteText = document.getElementById("quote-text");

    if (!quoteText || currentMoodQuotes.length === 0) return;

    quoteText.textContent = currentMoodQuotes[quoteIndex];
  }

  // =======================
  // NEW QUOTE BUTTON
  // =======================
  const newQuoteBtn = document.getElementById("new-quote-btn");

  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", () => {
      if (currentMoodQuotes.length === 0) return;

      quoteIndex = (quoteIndex + 1) % currentMoodQuotes.length;
      showQuote();
    });
  }

  // =======================
  // AFFIRMATION
  // =======================
  const affirmationBtn = document.getElementById("get-affirmation-btn");
  const affirmationText = document.getElementById("affirmation-text");

  if (affirmationBtn && affirmationText) {
    affirmationBtn.addEventListener("click", () => {
      affirmationText.textContent = "Loading...";

      fetch("https://www.affirmations.dev/")
        .then(res => res.json())
        .then(data => {
          affirmationText.textContent = data.affirmation;
        })
        .catch(() => {
          affirmationText.textContent = "Error loading affirmation.";
        });
    });
  }

  // =======================
  // FUN FACT
  // =======================
  const funBtn = document.getElementById("get-fun-fact-btn");
  const funText = document.getElementById("fun-fact-text");

  if (funBtn && funText) {
    funBtn.addEventListener("click", () => {

      fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
        .then(res => res.json())
        .then(data => {
          funText.textContent = data.text;
        })
        .catch(() => {
          funText.textContent = "Error loading fun fact.";
        });
    });
  }

  // =======================
  // JOKE
  // =======================
  const jokeBtn = document.getElementById("get-joke-btn");
  const jokeText = document.getElementById("joke-text");

  function loadJoke() {
    if (!jokeText) return;

    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then(res => res.json())
      .then(data => {
        jokeText.textContent = `${data.setup} — ${data.punchline}`;
      })
      .catch(() => {
        jokeText.textContent = "Error loading joke.";
      });
  }

  if (jokeBtn) {
    jokeBtn.addEventListener("click", loadJoke);
  }

  loadJoke();

  // =======================
  // NOTES
  // =======================
  const saveBtn = document.getElementById("save-notes-btn");
  const notes = document.getElementById("user-notes");

  if (notes) {
    notes.value = localStorage.getItem("notes") || "";
  }

  if (saveBtn && notes) {
    saveBtn.addEventListener("click", () => {
      localStorage.setItem("notes", notes.value);
      alert("Notes saved!");
    });
  }

});

// =======================
// AUTH FUNCTIONS
// =======================
function signup() {
  const email = document.getElementById("newEmail")?.value;
  const password = document.getElementById("newPassword")?.value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ email, password }));
  alert("Signup successful!");
}

function login() {
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && email === user.email && password === user.password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}
