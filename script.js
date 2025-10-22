// ---- Live Time ----
function updateTime() {
  const now = new Date();
  const currentTime = now.toLocaleTimeString();
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) timeElement.textContent = currentTime;
}
updateTime();
setInterval(updateTime, 1000);

// ---- Form Logic ----
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop real submission

  // Clear previous errors
  document.querySelectorAll(".error-text").forEach((el) => el.textContent = "");

  let isValid = true;

  // --- Name validation ---
  const name = document.getElementById("name");
  if (!name.value.trim()) {
    showError(name, "Full name is required.");
    isValid = false;
  }

  // --- Email validation ---
  const email = document.getElementById("email");
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.value.trim()) {
    showError(email, "Email is required.");
    isValid = false;
  } else if (!emailPattern.test(email.value)) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  }

  // --- Subject validation ---
  const subject = document.getElementById("subject");
  if (!subject.value.trim()) {
    showError(subject, "Subject is required.");
    isValid = false;
  }

  // --- Message validation ---
  const userMessage = document.getElementById("message");
  if (!userMessage.value.trim()) {
    showError(userMessage, "Message is required.");
    isValid = false;
  } else if (userMessage.value.trim().length < 10) {
    showError(userMessage, "Message must be at least 10 characters.");
    isValid = false;
  }

  // --- If valid, show success message ---
  if (isValid) {
    message.textContent = "✅ Message sent successfully!";
    message.className = "form-message success";
    form.reset();

    setTimeout(() => {
      message.textContent = "";
      message.className = "form-message";
    }, 4000);
  } else {
    message.textContent = "❌ Please fix the highlighted errors.";
    message.className = "form-message error";
  }
});

// ---- Helper to show error messages ----
function showError(input, msg) {
  const errorId = input.id + "-error";
  let errorEl = document.getElementById(errorId);
  if (!errorEl) {
    errorEl = document.createElement("small");
    errorEl.id = errorId;
    errorEl.className = "error-text";
    input.insertAdjacentElement("afterend", errorEl);
  }
  errorEl.textContent = msg;
  input.setAttribute("aria-describedby", errorId);
}
