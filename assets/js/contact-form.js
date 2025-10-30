document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const webAppUrl = "https://script.google.com/macros/s/AKfycbz9u-iVyuoIQOo1CDku0L3A_9T4iGA8miyvmdaFyaLR-dv5BTj_RbXsUUjcHIld3pfj/exec";

  const loading = form.querySelector('.loading');
  const errorMsg = form.querySelector('.error-message');
  const successMsg = form.querySelector('.sent-message');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // stop page from reloading

    // Show loading spinner
    loading.classList.add('d-block');
    errorMsg.classList.remove('d-block');
    successMsg.classList.remove('d-block');

    // Create the data we’ll send
    const formData = new FormData(form);

    // Send it to Google
    fetch(webAppUrl, {
      method: 'POST',
      mode: 'no-cors',   // <--- This line prevents the CORS error
      body: formData
    })
    .then(() => {
      // Even if the browser can’t read the reply, we show success
      loading.classList.remove('d-block');
      successMsg.classList.add('d-block');
      form.reset();
    })
    .catch(() => {
      loading.classList.remove('d-block');
      errorMsg.innerHTML = "There was a problem sending your message.";
      errorMsg.classList.add('d-block');
    });
  });
});
