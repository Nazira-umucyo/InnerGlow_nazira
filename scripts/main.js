if (window.location.pathname.includes("dashboard.html")) {
  let isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
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

window.addEventListener("DOMContentLoaded", function () {

  function showMotivationalQuotes(mood) {
    const quoteSection = document.getElementById("quote-section");
    const quoteList = document.getElementById("quote-text");

    if (!quoteSection || !quoteList) return;

    const quotes = moodQuotes[mood] || ["Take care of your mental health today 💚"];

    quoteList.innerHTML = "";

    quotes.forEach(q => {
      const p = document.createElement("p");
      p.textContent = q;
      quoteList.appendChild(p);
    });

    quoteSection.style.display = "block";
  }

  function showRandomQuote() {
    const moodSelect = document.getElementById("mood-select");
    const quoteList = document.getElementById("quote-text");
    const quoteSection = document.getElementById("quote-section");

    if (!moodSelect || !quoteList || !quoteSection) return;

    const mood = moodSelect.value;
    const quotes = moodQuotes[mood] || [];

    if (quotes.length === 0) {
      quoteList.innerHTML = "<p>No quotes available.</p>";
    } else {
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      quoteList.innerHTML = `<p>${random}</p>`;
    }

    quoteSection.style.display = "block";
  }

  // TIP
  const tipBtn = document.getElementById("get-tip-btn");

  if (tipBtn) {
    tipBtn.addEventListener("click", function () {
      const mood = document.getElementById("mood-select")?.value;
      const tipSection = document.getElementById("tip-section");
      const tipText = document.getElementById("tip-text");

      if (!mood) {
        if (tipText) tipText.textContent = "Please select a mood first.";
        if (tipSection) tipSection.style.display = "block";
        return;
      }

      let tip = "";

      switch (mood) {
        case "happy":
          tip = "Celebrate your happiness and write it down! 💛";
          break;
        case "sad":
          tip = "Talk to someone you trust. 🫂";
          break;
        case "anxious":
          tip = "Take deep breaths. 🌬️";
          break;
        case "angry":
          tip = "Pause before reacting. 🚶‍♀️";
          break;
        case "tired":
          tip = "Rest and recharge. 😴";
          break;
        default:
          tip = "Take care of your mental health 💚";
      }

      if (tipText) tipText.textContent = tip;
      if (tipSection) tipSection.style.display = "block";

      showMotivationalQuotes(mood);
    });
  }

  // NEW QUOTE (FIXED)
  const newQuoteBtn = document.getElementById("new-quote-btn");

  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", showRandomQuote);
  }

  // NOTES
  const saveNotesBtn = document.getElementById("save-notes-btn");

  if (saveNotesBtn) {
    saveNotesBtn.addEventListener("click", () => {
      const notes = document.getElementById("user-notes")?.value;
      if (notes) {
        localStorage.setItem("mindtrackUserNotes", notes);
      }
    });
  }

  const notesField = document.getElementById("user-notes");

  if (notesField) {
    const savedNotes = localStorage.getItem("mindtrackUserNotes");
    if (savedNotes) {
      notesField.value = savedNotes;
    }
  }

  // AFFIRMATION (SAFE FIX)
  const getAffirmationBtn = document.getElementById("get-affirmation-btn");
  const affirmationText = document.getElementById("affirmation-text");

  if (getAffirmationBtn && affirmationText) {
    getAffirmationBtn.addEventListener("click", () => {
      affirmationText.textContent = "Loading affirmation...";

      fetch("https://www.affirmations.dev/")
        .then(res => res.json())
        .then(data => {
          affirmationText.textContent = data.affirmation;
        })
        .catch(() => {
          affirmationText.textContent = "Couldn't fetch affirmation.";
        });
    });
  }

  // FUN FACT
  const getFunFactBtn = document.getElementById("get-fun-fact-btn");
  const funFactText = document.getElementById("fun-fact-text");

  if (getFunFactBtn && funFactText) {
    getFunFactBtn.addEventListener("click", () => {
      fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
        .then(res => res.json())
        .then(data => {
          funFactText.textContent = data.text;
        })
        .catch(() => {
          funFactText.textContent = "Couldn't fetch fun fact.";
        });
    });
  }

  // JOKE
  const getJokeBtn = document.getElementById("get-joke-btn");
  const jokeText = document.getElementById("joke-text");

  function fetchJoke() {
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then(res => res.json())
      .then(data => {
        if (jokeText) {
          jokeText.textContent = `${data.setup} — ${data.punchline}`;
        }
      })
      .catch(() => {
        if (jokeText) jokeText.textContent = "Couldn't fetch joke.";
      });
  }

  if (getJokeBtn) {
    getJokeBtn.addEventListener("click", fetchJoke);
  }

  fetchJoke();

});

// AUTH
function signup() {
  const email = document.getElementById("newEmail")?.value;
  const password = document.getElementById("newPassword")?.value;

  if (!email || !password) return alert("Fill all fields");

  localStorage.setItem("user", JSON.stringify({ email, password }));

  alert("Signup successful!");
}

function login() {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && email === storedUser.email && password === storedUser.password) {
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
