(function () {

  showLoginPage();
  createAccountModal();
  loginModal();
  listenForLoginSubmit();
  listenForCreateSubmit();
  

  function showLoginPage() {
    document.getElementById('main-page').style.display = "none"
    document.getElementById('login-page').style.display = ""
  }
  
  //create modal
  function createAccountModal() {

    var modal1 = document.getElementById("modal-create");
    var trigger1 = document.getElementById("trigger-create");
    var closeButton1 = document.getElementById("close-create");

    function toggleModal1() {
      modal1.classList.toggle("show-modal");
    }

    function windowOnClick1(event) {
      if (event.target === modal1) {
        toggleModal1();
      }
    }
    trigger1.addEventListener("click", toggleModal1);
    closeButton1.addEventListener("click", toggleModal1);
    window.addEventListener("click", windowOnClick1);
  
  }

//login modal
  function loginModal() {
    var modal2 = document.getElementById("modal-login");
    var trigger2 = document.getElementById("trigger-login");
    var closeButton2 = document.getElementById("close-login");

    function toggleModal2() {
      modal2.classList.toggle("show-modal");
    }

    function windowOnClick2(event) {
      if (event.target === modal2) {
        toggleModal2();
      }
    }

    trigger2.addEventListener("click", toggleModal2);
    closeButton2.addEventListener("click", toggleModal2);
    window.addEventListener("click", windowOnClick2);
  }

  function showMainPage() {
    document.getElementById('main-page').style.display = ""
    document.getElementById('login-page').style.display = "none"
  }

  //listen for login 
  function listenForLoginSubmit() {
    const loginSubmit = document.getElementById('login')

    loginSubmit.addEventListener('submit', event => {
      event.preventDefault();
      const runnerName = event.target.name.value;
      getRunner(runnerName);   
      // showMainPage();
         
    })
  }

  //fetches runner
  function getRunner(runnerName) {
    let runner;
    fetch('http://localhost:3000/runners')
      .then(response => response.json())
      .then(allRunners => {

        if (allRunners.error) {
          throw 'Error. Please try again.'
        } 

        runner = allRunners.find(runner => {
          return runner.name === runnerName
        })
        if (runner) {
          renderRunner(runner);
          showMainPage();
        } else {
          throw 'No Runner Found';
        }
      })
      .catch(error => alert(error))
  }

  //renders runner to screen
  function renderRunner(runner) {
    // const mainHeader = document.getElementById('main-page').querySelector('header')
    const welcomeHeader = document.getElementById('welcome')
    welcomeHeader.textContent = `Welcome, ${runner.name}`
  }


  //listen for create
  function listenForCreateSubmit() {
    const createSubmitButton = document.getElementById('create');
    createSubmitButton.addEventListener('submit', event => {
      event.preventDefault();
      const runnersName = event.target.name.value;
      createRunner(runnersName)
      // showMainPage();
      
    })
  }

  function createRunner(runnerName) {
    let runner;
    fetch('http://localhost:3000/runners')
      .then(response => response.json())
      .then(allRunners => {

        if (allRunners.error) {
          throw 'Error. Please try again.'
        } 

        runner = allRunners.find(runner => {
          return runner.name === runnerName
        })
        if (runner) {
          renderRunner(runner);
          showMainPage();
          throw 'You already have an account.'
        } else {
          fetch('http://localhost:3000/runners', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
              name: runnerName
            })
          }).then(resp => resp.json())
            .then(runner => {
              renderRunner(runner);
              showMainPage();
            });
        }
      })
      .catch(error => alert(error))
    


  }


})();