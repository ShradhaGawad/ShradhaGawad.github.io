document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const webAppUrl = "https://script.google.com/macros/s/AKfycbz9u-iVyuoIQOo1CDku0L3A_9T4iGA8miyvmdaFyaLR-dv5BTj_RbXsUUjcHIld3pfj/exec";

  const loading = form.querySelector('.loading');
  const errorMsg = form.querySelector('.error-message');
  const successMsg = form.querySelector('.sent-message');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // important: stop page reload

    // Show loading, hide messages
    loading.classList.add('d-block');
    errorMsg.classList.remove('d-block');
    successMsg.classList.remove('d-block');

    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };

    fetch(webAppUrl, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.text())
    .then(result => {
      loading.classList.remove('d-block');
      if (result.trim() === "OK") {
        successMsg.classList.add('d-block');
        form.reset();
      } else {
        errorMsg.innerHTML = result;
        errorMsg.classList.add('d-block');
      }
    })
    .catch(error => {
      loading.classList.remove('d-block');
      errorMsg.innerHTML = error;
      errorMsg.classList.add('d-block');
    });
  });
});
