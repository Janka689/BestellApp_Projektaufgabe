const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.onsubmit = function (event) {
    event.preventDefault();

    let feldName = document.getElementById("name").value;
    let feldEmail = document.getElementById("email").value;
    let feldMessage = document.getElementById("message").value;

    let alleFelder = [feldName, feldEmail, feldMessage];
    
    if (alleFelder.includes("")) {
      document.getElementById("feedbackMessage").style.color = "red";
      document.getElementById("feedbackMessage").textContent = "Bitte fülle alle Felder aus!";
      return;
    }

    let emailValid = false;
    let emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegEx.test(feldEmail)) {
      emailValid = true;
    }

    if (!emailValid) {
      document.getElementById("feedbackMessage").style.color = "red";
      document.getElementById("feedbackMessage").textContent = "Bitte gib eine gültige E-Mail-Adresse ein!";
      return;
    }

    document.getElementById("feedbackMessage").style.color = "green";
    document.getElementById("feedbackMessage").textContent = "Danke, Ihre Nachricht wurde versendet!";

    contactForm.reset();
  };
}