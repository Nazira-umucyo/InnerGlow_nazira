
window.addEventListener("DOMContentLoaded", function () {
  
  if (window.location.pathname.includes("dashboard.html")) {
    let isLoggedIn = localStorage.getItem("loggedIn");

    if (!isLoggedIn || isLoggedIn !== "true") {
      window.location.href = "index.html";
    }
  }

  // ===============================
  // MOOD QUOTES
  // ===============================
  const moodQuotes = {
    happy: ["Happiness is not something ready-made. — Dalai Lama"],
    sad: ["It’s okay to feel sad. This will pass."],
    anxious: ["Breathe. You are going to be okay."],
    angry: ["Take a deep breath before reacting."],
    tired: ["Rest is productive. Take care of yourself."]
  };

  function showMotivationalQuotes(mood) {
    const quoteSection = document.getElementById("quote-section");
    const quoteList = document.getElementById("quote-text");

    if (!quoteSection || !quoteList) return;

    const quotes = moodQuotes[mood] || ["Take care of your mental health 💚"];

    quoteList.innerHTML = "";

    quotes.forEach(q => {
      const p = document.createElement("p");
      p.textContent = q;
      quoteList.appendChild(p);
    });

    quoteSection.style.display = "block";
  }

  // ===============================
  // TIP BUTTON
  // ===============================
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
          tip = "Celebrate your happiness and write it down!";
          break;
        case "sad":
          tip = "Talk to someone you trust.";
          break;
        case "anxious":
          tip = "Try deep breathing.";
          break;
        case "angry":
          tip = "Pause before reacting.";
          break;
        case "tired":
          tip = "Rest and recharge.";
          break;
        default:
          tip = "Take care of yourself 💚";
      }

      if (tipText) tipText.textContent = tip;
      if (tipSection) tipSection.style.display = "block";

      showMotivationalQuotes(mood);
    });
  }

  // ===============================
  // RANDOM QUOTE
  // ===============================
  const newQuoteBtn = document.getElementById("new-quote-btn");

  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", function () {
      const mood = document.getElementById("mood-select")?.value;
      const quoteList = document.getElementById("quote-text");

      if (!quoteList) return;

      const quotes = moodQuotes[mood] || [];

      if (quotes.length === 0) {
        quoteList.innerHTML = "<p>No quotes available.</p>";
      } else {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        quoteList.innerHTML = `<p>${random}</p>`;
      }
    });
  }

  // ===============================
  // SAVE NOTES
  // ===============================
  const saveNotesBtn = document.getElementById("save-notes-btn");

  if (saveNotesBtn) {
    saveNotesBtn.addEventListener("click", () => {
      const notes = document.getElementById("user-notes")?.value.trim();
      const confirmation = document.getElementById("save-confirmation");

      if (notes) {
        localStorage.setItem("mindtrackUserNotes", notes);

        if (confirmation) {
          confirmation.style.display = "block";

          setTimeout(() => {
            confirmation.style.display = "none";
          }, 3000);
        }
      }
    });
  }

  // Load saved notes
  const notesField = document.getElementById("user-notes");

  if (notesField) {
    const savedNotes = localStorage.getItem("mindtrackUserNotes");
    if (savedNotes) {
      notesField.value = savedNotes;
    }
  }

  // ===============================
  // AFFIRMATION
  // ===============================
  const getAffirmationBtn = document.getElementById("get-affirmation-btn");
  const affirmationText = document.getElementById("affirmation-text");

  if (getAffirmationBtn && affirmationText) {
    getAffirmationBtn.addEventListener("click", () => {
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

  // ===============================
  // FUN FACT
  // ===============================
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
          funFactText.textContent = "Could not load fun fact.";
        });
    });
  }

  // ===============================
  // JOKE
  // ===============================
  const getJokeBtn = document.getElementById("get-joke-btn");
  const jokeText = document.getElementById("joke-text");
  const jokeSection = document.getElementById("joke-section");

  function fetchJoke() {
    if (!jokeText || !jokeSection) return;

    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then(res => res.json())
      .then(data => {
        jokeText.textContent = `${data.setup} — ${data.punchline}`;
        jokeSection.style.display = "block";
      })
      .catch(() => {
        jokeText.textContent = "Could not load joke.";
        jokeSection.style.display = "block";
      });
  }

  if (getJokeBtn) {
    getJokeBtn.addEventListener("click", fetchJoke);
  }

  // Load one joke on page load (safe)
  if (jokeText) {
    fetchJoke();
  }

});

// ===============================
// AUTH FUNCTIONS (GLOBAL)
// ===============================
function signup() {
  const email = document.getElementById("newEmail")?.value;
  const password = document.getElementById("newPassword")?.value;

  if (!email || !password) {
    alert("Fill in all fields");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ email, password }));

  alert("Signup successful!");
}

function login() {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (
    storedUser &&
    email === storedUser.email &&
    password === storedUser.password
  ) {
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
