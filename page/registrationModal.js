document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.close');
    const openButton = document.querySelector('.main__header__wrapper__container-icon__img-acc');
  
    openButton.addEventListener('click', () => {
      modal.style.display = "block";
    });
  
    closeButton.addEventListener('click', () => {
      modal.style.display = "none";
    });
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  
    const registrationForm = document.getElementById('registrationForm');
  
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault(); 
  

      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const userData = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password
      };
  
      localStorage.setItem('userData', JSON.stringify(userData));

      renderUserDataFromLocalStorage();
  

      const successMessage = document.createElement('p');
      successMessage.textContent = 'Вы успешно зарегистрировались.';
      registrationForm.insertAdjacentElement('afterend', successMessage);
  

      setTimeout(function() {
        modal.style.display = "none";
        successMessage.style.display = "none";
      }, 1000);
    });
  

    function renderUserDataFromLocalStorage() {

      const userDataJSON = localStorage.getItem('userData');
  

      if (userDataJSON) {

        const userData = JSON.parse(userDataJSON);
  

        document.getElementById('firstName').value = userData.firstName;
        document.getElementById('lastName').value = userData.lastName;
        document.getElementById('username').value = userData.username;
        document.getElementById('email').value = userData.email;
        document.getElementById('password').value = userData.password;
      }
    }
  
    renderUserDataFromLocalStorage();
  });