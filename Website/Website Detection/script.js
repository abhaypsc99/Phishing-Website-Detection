function analyzeURL() {
  const url = document.getElementById("urlInput").value.trim();
  if (!url) return alert("Enter a URL!");

  let score = 0;
  let reasons = [];

  const suspiciousKeywords = ["login", "verify", "secure", "bank", "update"];
  const urgencyWords = ["urgent", "immediately", "act now", "suspended"];

  // URL length check
  if (url.length > 75) {
    score += 15;
    reasons.push("URL is unusually long");
  }

  // Special characters
  if (/@/.test(url)) {
    score += 10;
    reasons.push("Contains '@' which is suspicious");
  }

  if (/--/.test(url)) {
    score += 10;
    reasons.push("Contains multiple hyphens");
  }

  if ((url.match(/\./g) || []).length > 4) {
    score += 15;
    reasons.push("Contains too many dots (possible fake subdomains)");
  }

  // IP Address detection
  if (/(\d{1,3}\.){3}\d{1,3}/.test(url)) {
    score += 20;
    reasons.push("Uses IP instead of domain (common phishing behavior)");
  }

  // Keyword detection
  suspiciousKeywords.forEach(keyword => {
    if (url.toLowerCase().includes(keyword)) {
      score += 10;
      reasons.push(`Contains suspicious keyword: ${keyword}`);
    }
  });

  // Urgency keywords
  urgencyWords.forEach(word => {
    if (url.toLowerCase().includes(word)) {
      score += 10;
      reasons.push(`Contains urgency word: ${word}`);
    }
  });

  updateUI(score, reasons);
}

// Analyze Website Content
function analyzeContent() {
  const text = document.getElementById("contentInput").value.trim();
  if (!text) return alert("No content provided!");

  let score = 0;
  let reasons = [];

  const sensitivePatterns = [
    "password", "credit card", "ssn", "verify now",
    "account suspended", "click here", "update your info"
  ];

  sensitivePatterns.forEach(word => {
    if (text.toLowerCase().includes(word)) {
      score += 15;
      reasons.push(`Sensitive keyword found: ${word}`);
    }
  });

  updateUI(score, reasons);
}

// UI Update Function
function updateUI(score, reasons) {
  const bar = document.getElementById("risk-bar");
  const label = document.getElementById("risk-label");
  const resultBox = document.getElementById("result-box");

  bar.style.width = Math.min(score, 100) + "%";

  bar.style.background = score < 30 ? "lime" : score < 60 ? "orange" : "red";
  
  label.textContent = `Risk: ${score}%`;

  resultBox.innerHTML = `
    <h3>${score >= 60 ? "🚨 Dangerous / Phishing" : score >= 30 ? "⚠ Suspicious" : "✔ Safe"}</h3>
    <p>${reasons.length ? reasons.join("<br>") : "No major issues detected."}</p>
  `;
}
