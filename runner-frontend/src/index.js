(function () {

  showLoginPage();
  createAccountModal();
  loginModal();
  listenForLoginSubmit();
  listenForCreateSubmit();
  addRunModal();
  newGoalModal();
  listenForGoalClick();
  listenForRunSubmit();
  addEventListenerDeleteAccount();
  editAccountModal();
  listenForEditSubmit()
  editGoalModal();
  listenForGoalEditClick();
  listenForEditGoalSubmission();
  addEventListenerDeleteGoal();
  addEventListenerGoalProgress();
  
  // progressMeter()
  let runnerGoal;
  let runner;
  let runnersRuns;
  
  function showLoginPage() {
    document.getElementById('main-page').style.display = "none"
    document.getElementById('login-page').style.display = ""
  }
  
  //create modal
  function createAccountModal() {

    const modal1 = document.getElementById("modal-create");
    const trigger1 = document.getElementById("trigger-create");
    const closeButton1 = document.getElementById("close-create");
    const submitClose1 = document.getElementById("create-btn");

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
    submitClose1.addEventListener("click", toggleModal1)
  }

//login modal
  function loginModal() {
    const modal2 = document.getElementById("modal-login");
    const trigger2 = document.getElementById("trigger-login");
    const closeButton2 = document.getElementById("close-login");
    const submitClose2 = document.getElementById("login-btn");

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
    submitClose2.addEventListener("click", toggleModal2)
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
      
         
    })
  }

  //fetches runner
  function getRunner(runnerName) {
    
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
          // myFunction();
        } else {
          throw 'No Runner Found';
        }
      })
      .catch(error => alert(error))
  }

  //renders runner to screen   
  function renderRunner(runner) {
    const welcomeHeader = document.getElementById('welcome')
    welcomeHeader.textContent = `Welcome, ${runner.name}`
    renderGoalContainer(runner)
  }

  //function to check if a goal exists
  function renderGoalContainer(runner) {
    const runnerId = runner.id
    
    fetch('http://localhost:3000/goals')
      .then(response => response.json()) 
      .then(allGoals => {

        runnerGoal = allGoals.find(goal => {
          return goal.runner_id === runnerId && goal.active
        })

        if (runnerGoal) {
          showGoalProgressMeter();
          // myFunction();
          } else {
          showAddGoal();
        }

      })
  }

// show goal progress if goal is created
  function showGoalProgressMeter() {
    document.getElementById('goal-meter').style.display = ""
    document.getElementById('new-goal').style.display = "none"
    document.getElementById('trigger-edit-goal').style.display = ""
    document.getElementById('trigger-add-run').style.display = ""
    document.getElementById('delete-goal').style.display = ""
  }

  function showAddGoal() {
    document.getElementById('goal-meter').style.display = "none"
    document.getElementById('new-goal').style.display = ""
    document.getElementById('trigger-edit-goal').style.display = "none"
    document.getElementById('trigger-add-run').style.display = "none"
    document.getElementById('delete-goal').style.display = "none"
  }


  //listen for create
  function listenForCreateSubmit() {
    const createSubmitButton = document.getElementById('create');
    createSubmitButton.addEventListener('submit', event => {
      event.preventDefault();
      const runnersName = event.target.name.value;
      createRunner(runnersName)
    })
  }

  function createRunner(runnerName) {
    fetch('http://localhost:3000/runners')
      .then(response => response.json())
      .then(allRunners => {

        if (allRunners.error) {
          throw 'Error. Please try again.'
        } 

        runner = allRunners.find(runnerr => {
          return runnerr.name === runnerName
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
            .then(runnerr => {
              renderRunner(runnerr);
              showMainPage();
              runner = runnerr
            });
        }
      })
      .catch(error => alert(error))
  }

  function addRunModal() {
    const modal3 = document.getElementById("modal-add-run");
    const trigger3 = document.getElementById("trigger-add-run");
    const closeButton3 = document.getElementById("close-add-run");
    const submitClose3 = document.getElementById("run-btn");

    function toggleModal3() {
      modal3.classList.toggle("show-modal");
    }

    function windowOnClick3(event) {
      if (event.target === modal3) {
        toggleModal3();
      }
    }
    trigger3.addEventListener("click", toggleModal3);
    closeButton3.addEventListener("click", toggleModal3);
    window.addEventListener("click", windowOnClick3);
    submitClose3.addEventListener("click", toggleModal3);
  }

  // new goal for modal
  function newGoalModal() {
    initialGoalView();
    const modal4 = document.getElementById("modal-goal");
    const trigger4 = document.getElementById("trigger-goal");
    const closeButton4 = document.getElementById("close-goal");
    const submitClose4 = document.getElementById("add-goal-btn")

    function toggleModal4() {
      modal4.classList.toggle("show-modal");
    }

    function windowOnClick4(event) {
      if (event.target === modal4) {
        toggleModal4();
      }
    }
    trigger4.addEventListener("click", toggleModal4);
    closeButton4.addEventListener("click", toggleModal4);
    window.addEventListener("click", windowOnClick4);
    submitClose4.addEventListener("click", toggleModal4)
  }

  function listenForGoalClick() {
    const goalCategory = document.getElementById('goal-category')
    goalCategory.addEventListener('change', event => {
      const categoryType = event.target.value;

      if (categoryType === 'pace') {
        showPaceEntry();
      } else if (categoryType === 'mileage') {
        showMileageEntry();
      }
      listenForGoalSubmission(categoryType)
    })
  }

  function initialGoalView() {
    document.getElementById('pace-div').style.display = "none"
    document.getElementById('mileage-div').style.display = "none"
  }

  function showPaceEntry() {
    document.getElementById('pace-div').style.display = ""
    document.getElementById('mileage-div').style.display = "none"
  }

  function showMileageEntry() {
    document.getElementById('pace-div').style.display = "none"
    document.getElementById('mileage-div').style.display = ""
  }

  function listenForRunSubmit() {
    const runForm = document.getElementById('run-form')
    runForm.addEventListener('submit', e => {
      e.preventDefault()
      const min = e.target.minutes.value
      const sec = e.target.seconds.value
      const distance = e.target.distance.value
      const rating = e.target.rating.value
      const date = e.target.date.value
      const run = {
        pace: `${min}.${sec}`,
        distance: distance,
        rating: rating,
        date: date
      }
      postRunToDatabase(run)
      progressMeter()
      // const runModal = document.getElementById('modal-add-run')
      // runModal.style.display = 'none'
    })
  }

  function postRunToDatabase(run) {
    fetch('http://localhost:3000/runs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        distance: run.distance,
        pace: run.pace,
        date: run.date,
        rating: run.rating,
        goal_id: runnerGoal.id 
      })
    }).then(resp => resp.json())
      .then(run => {
// need to call on function to update goal status 
      }) 
  }

  


  // function listenForGoalTypeSelection() {
  //   const goalCategory = document.getElementById('goal-category-edit')
  //   goalCategory.addEventListener('change', event => {
  //     const goalType = event.target.value
  //     listenForGoalSubmission(goalType)
  //   })
  // }

  function listenForGoalSubmission(goalType) {
    const goalDiv = document.getElementById('add-goal')
    goalDiv.addEventListener('submit', event => {
      event.preventDefault();

      const category = goalType;
      let value;

      if (goalType === 'pace') {
        const min = event.target.minutes.value
        const sec = event.target.seconds.value
        value = `${min}.${sec}`
      } else if (goalType === 'mileage') {
        value = event.target.distance.value
      }

      const newGoal = {
        category: category,
        value: value
      }
      postGoalToDatabase(newGoal);
      progressMeter();
    })
  }

  function postGoalToDatabase(newGoal) {
    fetch('http://localhost:3000/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        category: newGoal.category,
        value: newGoal.value,
        active: true,
        runner_id: runner.id
      })
    })      
    .then(response => response.json())
    .then(postedGoal => {
      runnerGoal = postedGoal;
      showGoalProgressMeter();
    })
  }

  function editAccountModal() {
    const modal5 = document.getElementById("modal-edit");
    const trigger5 = document.getElementById("trigger-edit");
    const closeButton5 = document.getElementById("close-edit");
    const submitClose5 = document.getElementById("edit-btn")

    function toggleModal5() {
      modal5.classList.toggle("show-modal");
    }

    function windowOnClick5(event) {
      if (event.target === modal5) {
        toggleModal5();
      }
    }

    trigger5.addEventListener("click", toggleModal5);
    closeButton5.addEventListener("click", toggleModal5);
    window.addEventListener("click", windowOnClick5);
    submitClose5.addEventListener("click", toggleModal5)
  }

  function listenForEditSubmit() {
    const editForm = document.getElementById('edit')
    editForm.addEventListener('submit', e => {
      e.preventDefault()
      const newName = e.target.name.value
      patchToDatabase(newName);
    })
  }

  function patchToDatabase(newName) {
    fetch(`http://localhost:3000/runners/${runner.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: newName
      })
    }).then(resp => resp.json())
    .then(runnerr => { 
      renderRunner(runnerr)
      runner = runnerr
    })
  }

  function addEventListenerDeleteAccount() {
    const deleteButton = document.getElementById('delete')
    deleteButton.addEventListener('click', e => {
      fetch(`http://localhost:3000/runners/${runner.id}`, {
        method: 'DELETE'
      }).then(showLoginPage())
    })
    
  }

  function editGoalModal() {
    const modal6 = document.getElementById("modal-goal-edit");
    const trigger6 = document.getElementById("trigger-edit-goal");
    const closeButton6 = document.getElementById("close-goal");
    const submitClose6 = document.getElementById("edit-goal-btn1");

    function toggleModal6() {
      modal6.classList.toggle("show-modal");
      const goalCategoryEdit = document.getElementById('goal-category-edit');
      goalCategoryEdit.value = runnerGoal.category;

      if (goalCategoryEdit.value === 'pace') {
        showPaceGoal();
        const minEle = document.getElementById('edit-mins')
        minEle.value = parseInt(runnerGoal.value)
        const secEle = document.getElementById('edit-secs')
        let secParse;

        if (runnerGoal.value.toString().length === 1) {
          secParse = "0"
        } else if (runnerGoal.value.toString().length > 1) {
          let secParseAgain = runnerGoal.value.toString().split(".")[1]
            if (secParseAgain.length === 1) {
              secParse = secParseAgain + '0'
            } else {
              secParse = secParseAgain
            }
        }
        secEle.value = secParse;
        
      } else if (goalCategoryEdit.value === 'mileage') {
        showMileageGoal();
        const mileage = document.getElementById('miles-edit')
        mileage.value = runnerGoal.value
      }
      listenForEditGoalSubmission(runnerGoal.category)
    }

    function toggleModal6B() {
      modal6.classList.toggle("show-modal");
    }


    function windowOnClick6(event) {
      if (event.target === modal6) {
        toggleModal6();
      }
    }

    trigger6.addEventListener("click", toggleModal6);
    closeButton6.addEventListener("click", toggleModal6);
    window.addEventListener("click", windowOnClick6);
    submitClose6.addEventListener("click", toggleModal6B);
  }

  function listenForGoalEditClick() {
    const goalCategoryEdit = document.getElementById('goal-category-edit')
    goalCategoryEdit.addEventListener('change', event => {
      event.preventDefault();
      const categoryType = event.target.value;
      
      if (categoryType === 'pace') {
        showPaceGoal();
      } else if (categoryType === 'mileage') {
        showMileageGoal();
      }
      listenForEditGoalSubmission(categoryType);
    })
  }

  function showPaceGoal() {
    document.getElementById('pace-div-edit').style.display = ""
    document.getElementById('mileage-div-edit').style.display = "none"

  }

  function showMileageGoal() {
    document.getElementById('pace-div-edit').style.display = "none"
    document.getElementById('mileage-div-edit').style.display = ""

  }

  function listenForEditGoalSubmission(goalType) {
    const goalDiv = document.getElementById('edit-goal')
    goalDiv.addEventListener('submit', event => {
      event.preventDefault();
      
      const category = goalType;
      let value;

      if (goalType === 'pace') {
        const min = event.target.minutes.value
        const sec = event.target.seconds.value
        value = `${min}.${sec}`
      } else if (goalType === 'mileage') { 
        value = event.target.mileage.value
      }

      const newGoal = {
        category: category,
        value: value
      }
      patchGoalToDatabase(newGoal);
      progressMeter();

    })
  }

  function patchGoalToDatabase(newGoal) {
    fetch(`http://localhost:3000/goals/${runnerGoal.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        category: newGoal.category,
        value: newGoal.value,
        active: true,
        runner_id: runner.id
      })
    })
      .then(response => response.json())
      .then(updatedGoal => {
        runnerGoal = updatedGoal;
        
      })
  }

  function addEventListenerDeleteGoal() {
    const deleteButton = document.getElementById('delete-goal')
    deleteButton.addEventListener('click', event => {
      fetch(`http://localhost:3000/goals/${runnerGoal.id}`, {
        method: 'DELETE'
      }).then(showAddGoal())
    })
  }

  function getRunsByRunner() {
    fetch('http://localhost:3000/runs')
    .then(response => response.json())
    .then(allRuns => {
      runnersRuns = allRuns.filter(run => {
        return run.goal_id === runnerGoal.id
      })
      console.log(allRuns)
    })
  }

  function progressMeter() {
    getRunsByRunner()

    let goalValue;

    const goalCat = runnerGoal.category;
    if (goalCat === 'pace') {
      const goalLimit = runnerGoal.value.toString().split()
      const mins = goalLimit[0]
      const secs = goalLimit[1]
      goalValue = `Pace ${mins}:${secs}`
    } else if (goalCat === 'mileage') {
      goalValue = `To Run ${runnerGoal.Value} Miles`
    }

    // let runCount; //total number of runs
    const goalName = document.getElementById('runner-goal-div')

    goalName.textContent = `GOAL: ${goalValue}` 

  }

  function addEventListenerGoalProgress() {
    const button = document.getElementById('goal-increaser')
    button.addEventListener('click', event => {
      myFunction();
    }) 
  }


  function myFunction() {
    var h = 0;

    var x;

    if (x == null) {
      x = setInterval(myFunction1, 160);
    }
    function myFunction1() {

      h++;

      document.getElementById("bar").style.height =
        h + "px";
      document.getElementById("status").innerHTML = Math.floor(h / 2) + "%"
      if (document.getElementById("bar").style.height == 200 + "px") {
        clearInterval(x);
        appendAward();
      }
    }
  }

  function appendAward() {
    const awardContainer = document.getElementById('awards-container')
    const newDiv = document.createElement('div')
    const emojis = ['💯', '👏', '🤩', '🎉' ]
    newDiv.textContent = emojis[Math.floor(Math.random() * emojis.length)]
    awardContainer.appendChild(newDiv)

  }

})();
