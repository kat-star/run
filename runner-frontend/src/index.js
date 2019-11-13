(function () {

  createAccountModal();
  loginModal();
  
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

  

})();