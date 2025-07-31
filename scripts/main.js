// Quotes mapped by mood
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

// Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function () {
  // Show motivational quotes based on mood
  function showMotivationalQuotes(mood) {
    const quoteSection = document.getElementById("quote-section");
    const quoteList = document.getElementById("quote-text");
    const quotes = moodQuotes[mood] || ["Take care of your mental health today. 💚"];

    quoteList.innerHTML = "";
    quotes.forEach(q => {
      const p = document.createElement("p");
      p.textContent = q;
      quoteList.appendChild(p);
    });

    quoteSection.style.display = "block";
  }

  // Show one random quote
  function showRandomQuote() {
    const mood = document.getElementById("mood-select").value;
    const quoteSection = document.getElementById("quote-section");
    const quoteList = document.getElementById("quote-text");

    const quotes = moodQuotes[mood] || [];
    if (quotes.length === 0) {
      quoteList.innerHTML = "<p>No quote available.</p>";
    } else {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      quoteList.innerHTML = `<p>${randomQuote}</p>`;
    }

    quoteSection.style.display = "block";
  }

  // Tip button logic
  const tipBtn = document.getElementById("get-tip-btn");
  if (tipBtn) {
    tipBtn.addEventListener("click", function () {
      const mood = document.getElementById("mood-select").value;
      const tipSection = document.getElementById("tip-section");
      const tipText = document.getElementById("tip-text");

      if (!mood) {
        tipText.textContent = "Please select a mood before getting a tip.";
        tipSection.style.display = "block";
        document.getElementById("quote-section").style.display = "none";
        return;
      }

      let tip = "";
      switch (mood) {
        case "happy":
          tip = "That’s great! Celebrate the good moment and consider writing it in a gratitude journal. 💛";
          break;
        case "sad":
          tip = "It’s okay to feel sad. Try talking to someone you trust or journaling your thoughts. 🫂";
          break;
        case "anxious":
          tip = "Pause and take a few deep breaths. Try the 4-7-8 breathing technique. 🌬️";
          break;
        case "angry":
          tip = "Take a short walk or count to ten. Let your body release the tension first. 🚶‍♀️";
          break;
        case "tired":
          tip = "Your body needs rest. Try a short nap, reduce screen time, or stretch. 😴";
          break;
        default:
          tip = "Take care of your mental health today 💚";
      }

      tipText.textContent = tip;
      tipSection.style.display = "block";

      // Show all quotes
      showMotivationalQuotes(mood);
    });
  }

  // Random quote button
  const newQuoteBtn = document.getElementById("new-quote-btn");
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", showRandomQuote);
  }

  // Save notes button
  const saveNotesBtn = document.getElementById("save-notes-btn");
  if (saveNotesBtn) {
    saveNotesBtn.addEventListener("click", () => {
      const notes = document.getElementById("user-notes").value.trim();
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

  // Load saved notes on page load
  const savedNotes = localStorage.getItem("mindtrackUserNotes");
  if (savedNotes) {
    const notesField = document.getElementById("user-notes");
    if (notesField) {
      notesField.value = savedNotes;
    }
  }

  // Show affirmation section
  const affirmationSection = document.getElementById("affirmation-section");
  if (affirmationSection) {
    affirmationSection.style.display = "block";
  }

  // Affirmation API logic with CORS proxy
  const getAffirmationBtn = document.getElementById("get-affirmation-btn");
  const affirmationText = document.getElementById("affirmation-text");

  if (getAffirmationBtn && affirmationText) {
    getAffirmationBtn.addEventListener("click", () => {
      affirmationText.textContent = "Loading affirmation...";

      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const apiUrl = "https://www.affirmations.dev/";

      fetch(proxyUrl + apiUrl)
        .then(res => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then(data => {
          affirmationText.textContent = data.affirmation;
        })
        .catch(err => {
          affirmationText.textContent = "Couldn't fetch affirmation. Try again later.";
          console.error("Affirmation API error:", err);
        });
    });
  }
});
  // Fun Fact logic
  const funFactSection = document.getElementById("fun-fact-section");
  const funFactText = document.getElementById("fun-fact-text");
  const getFunFactBtn = document.getElementById("get-fun-fact-btn");

  if (funFactSection) {
    funFactSection.style.display = "block";
  }

  if (getFunFactBtn && funFactText) {
    getFunFactBtn.addEventListener("click", () => {
      fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
        .then(response => response.json())
        .then(data => {
          funFactText.textContent = data.text;
        })
        .catch(error => {
          funFactText.textContent = "Couldn't fetch a fun fact. Please try again later.";
          console.error("Fun Fact API error:", error);
        });
    });
  }
// Joke feature using API
const jokeSection = document.getElementById("joke-section");
const jokeText = document.getElementById("joke-text");
const getJokeBtn = document.getElementById("get-joke-btn");

function fetchJoke() {
  fetch("https://official-joke-api.appspot.com/jokes/random")
    .then(response => response.json())
    .then(data => {
      jokeText.textContent = `${data.setup} — ${data.punchline}`;
      jokeSection.style.display = "block";
    })
    .catch(error => {
      jokeText.textContent = "Couldn't fetch a joke right now. Try again later.";
      console.error("Joke API error:", error);
      jokeSection.style.display = "block";
    });
}

// Load first joke on page load (optional)
fetchJoke();

// Reload joke when button is clicked
if (getJokeBtn) {
  getJokeBtn.addEventListener("click", fetchJoke);
}
