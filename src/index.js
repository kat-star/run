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
  addQuotesToStatsDiv()
  addEventListenerDeleteGoal();
  addRaceModal();
  addRaceSubmit();
  listenForGoalComplete(); 
  
  let runnersRuns;
  let runnerGoal;
  let runner;
  let currentMiles;
  let streak;
  const BACKEND_URL = 'https://running-goals.herokuapp.com'

  
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
    
    fetch(`${BACKEND_URL}/runners`)
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

          currentMiles = runner.miles;
          streak = runner.streak;
          currentMilesStats();
          currentStreaksStats();
          fetchRaces();
          renderAwardContainer(); 

        } else {
          throw 'No Runner Found';
        }
      })
      .catch(error => alert(error))
  }

  //renders runner to screen   
  function renderRunner(runner) {
    const welcomeHeader = document.getElementById('welcome')
    welcomeHeader.textContent = `${runner.name}'s Progress Report`
    renderGoalContainer(runner)
  }

  //function to check if a goal exists
  function renderGoalContainer(runner) {
    const runnerId = runner.id
    
    fetch(`${BACKEND_URL}/goals`)
      .then(response => response.json()) 
      .then(allGoals => {
        runnerGoal = allGoals.find(goal => {
          return goal.runner_id === runnerId && goal.active
        })

        if (runnerGoal) {
          updateGoalDiv();
          showGoalProgressMeter();
          getRunnerRuns(function () {
            progressMeter();
          });
          } else {
          showAddGoal();
        }

      })
  }

  function updateGoalDiv() {
    let goalValue;
    const goalCat = runnerGoal.category;

    if (goalCat === 'pace') {
      let minValue;
      let secValue;

      if (/\./.test(runnerGoal.value)) {
        let secParse = runnerGoal.value.toString().split(".")
        let secParseValue = secParse[1]
        minValue = secParse[0]

        if (secParseValue.length === 1) {
          secValue = secParseValue + '0'
        } else {
          secValue = secParseValue
        }

      } else {
        minValue = runnerGoal.value.toString();
        secValue = "00";
      }
    goalValue= `Pace ${minValue}:${secValue}`

    } else if (goalCat === 'mileage') {
      goalValue = `To Run ${runnerGoal.value} Miles`
    }

    const goalName = document.getElementById('runner-goal-div')
    goalName.textContent = `GOAL ~ ${goalValue}` 
  }

// show goal progress if goal is created
  function showGoalProgressMeter() {
    document.getElementById('goal-meter').style.display = ""
    document.getElementById('new-goal').style.display = "none"
    document.getElementById('trigger-edit-goal').style.display = ""
    document.getElementById('trigger-add-run').style.display = ""
    document.getElementById('delete-goal').style.display = ""
    document.getElementById('runner-goal-div').style.display = ""
    document.getElementById('complete-goal').style.display = "none"
  }


  function showAddGoal() {
    document.getElementById('goal-meter').style.display = "none"
    document.getElementById('new-goal').style.display = ""
    document.getElementById('trigger-edit-goal').style.display = "none"
    document.getElementById('trigger-add-run').style.display = "none"
    document.getElementById('delete-goal').style.display = "none"
    document.getElementById('runner-goal-div').style.display = "none"
    document.getElementById('complete-goal').style.display = "none"
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
    fetch(`${BACKEND_URL}/runners`)
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
          currentMiles = runner.miles;
          streak = runner.streak;
          currentMilesStats();
          fetchRaces();
          throw 'You already have an account.'
        } else {
          fetch(`${BACKEND_URL}/runners`, {
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
              currentMiles = runnerr.miles
              streak = runnerr.streak
              currentMilesStats()
              currentStreaksStats();
              fetchRaces();
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
    listenForGoalSubmission()
    goalCategory.addEventListener('change', event => {
      const categoryType = event.target.value;

      if (categoryType === 'pace') {
        showPaceEntry();
      } else if (categoryType === 'mileage') {
        showMileageEntry();
      }
      
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

    })
  }

  function postRunToDatabase(run) {
    fetch(`${BACKEND_URL}/runs`, {
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
        goal_id: runnerGoal.id, 
        runner_id: runner.id
      })
    }).then(resp => resp.json())
      .then(run => {
        
        updateMilesAfterNewRun(run);
        streak = run.runner_streak;
        currentStreaksStats();
        getRunnerRuns(function () {
          progressMeter();
        });

// need to call on function to update goal status 
      }) 
  }

  function getRunnerRuns(callback) {
    fetch(`${BACKEND_URL}/runs`)
    .then(response => response.json())
    .then(allRuns => {

      runnersRuns = allRuns.filter(run => {
         return run.runner_id === runner.id && run.goal_id === runnerGoal.id;
      })
      if (callback) {
        callback();
      }
    })
  }

  function listenForGoalSubmission() {
    const goalDiv = document.getElementById('add-goal');
    goalDiv.addEventListener('submit', event => {
      event.preventDefault();
      const category = document.getElementById('goal-category').value;

      let value;
      if (category === 'pace') {
        const min = event.target.minutes.value
        const sec = event.target.seconds.value
        value = `${min}.${sec}`
      } else if (category === 'mileage') {
        value = event.target.distance.value
      }

      const newGoal = {
        category: category,
        value: value
      }
      postGoalToDatabase(newGoal);
      // resetGoalFormValues();
      document.getElementById('goal-category').value = 'base'
      document.querySelector('#pace-div #mins').value = '00'
      document.querySelector('#pace-div #secs').value = '0'
      document.querySelector('#mileage-div #miles').value = '1'
    })
  }

  // function resetGoalFormValues() {
    
  // }


  function postGoalToDatabase(newGoal) {
    fetch(`${BACKEND_URL}/goals`, {
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
      
      updateGoalDiv();
      showGoalProgressMeter();
      getRunnerRuns(function () {
        progressMeter();
      });
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
    fetch(`${BACKEND_URL}/runners/${runner.id}`, {
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
      fetch(`${BACKEND_URL}/runners/${runner.id}`, {
        method: 'DELETE'
      })
      showLoginPage()
    })
  }

  function editGoalModal() {
    const modal6 = document.getElementById("modal-goal-edit");
    const trigger6 = document.getElementById("trigger-edit-goal");
    const closeButton6 = document.getElementById("close-goal");
    
    function toggleModal6() {
      modal6.classList.toggle("show-modal");
      const goalCategoryEdit = document.getElementById('goal-category-edit');
      goalCategoryEdit.value = runnerGoal.category;

      if (goalCategoryEdit.value === 'pace') {
        showPaceGoal();
        const minEle = document.getElementById('edit-mins')
        const secEle = document.getElementById('edit-secs')
        let minValue;
        let secValue;

        if (/\./.test(runnerGoal.value)) {
          let secParse = runnerGoal.value.toString().split(".")
          let secParseValue = secParse[1]
          minValue = secParse[0]

          if (secParseValue.length === 1) {
            secValue = secParseValue + '0'
          } else {
            secValue = secParseValue
          }

        } else {
          minValue = runnerGoal.value.toString();
          secValue = "00";
        }
        minEle.value = parseInt(minValue);
        secEle.value = secValue

      } else if (goalCat === 'mileage') {
        showMileageGoal();
        const mileage = document.getElementById('miles-edit');
        mileage.value = runnerGoal.value;
      }
    }

    function windowOnClick6(event) {
      if (event.target === modal6) {
        toggleModal6();
      }
    }

    trigger6.addEventListener("click", toggleModal6);
    closeButton6.addEventListener("click", toggleModal6);
    window.addEventListener("click", windowOnClick6);
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

    });
  }

  function showPaceGoal() {
    document.getElementById('pace-div-edit').style.display = ""
    document.getElementById('mileage-div-edit').style.display = "none"
  }

  function showMileageGoal() {
    document.getElementById('pace-div-edit').style.display = "none"
    document.getElementById('mileage-div-edit').style.display = ""

  }

  function listenForEditGoalSubmission() {
    const goalDiv = document.getElementById('edit-goal')
    goalDiv.addEventListener('submit', event => {
      event.preventDefault();

      const category = document.getElementById('goal-category-edit').value;
      let value;

      if (category === 'pace') {
        const min = event.target.minutes.value
        const sec = event.target.seconds.value
        value = `${min}.${sec}`
      } else if (category === 'mileage') { 
        value = event.target.mileage.value
      }

      const newGoal = {
        category: category,
        value: value
      }
      patchGoalToDatabase(newGoal);

      // hide edit goal modal
      const modal6 = document.getElementById("modal-goal-edit");
      modal6.classList.toggle("show-modal");
    })
  }

  function patchGoalToDatabase(newGoal) {
    fetch(`${BACKEND_URL}/goals/${runnerGoal.id}`, {
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
        updateGoalDiv();
        showGoalProgressMeter();
        getRunnerRuns(function () {
          progressMeter();
        });
      })
  }

  function addEventListenerDeleteGoal() {
    const deleteButton = document.getElementById('delete-goal')
    deleteButton.addEventListener('click', event => {
      fetch(`${BACKEND_URL}/goals/${runnerGoal.id}`, {
        method: 'DELETE'
      }).then(showAddGoal())
    })
  }

  function progressMeter() {
    const goalCategory = runnerGoal.category;
    const goalValue = runnerGoal.value;
    const numberOfRuns = runnersRuns.length;

    let totalSoFar;
    let progress;
    
    if (goalCategory === 'pace') {
      totalSoFar = runnersRuns.reduce(
        (accumulator, run) => accumulator + run.pace, 0
      );
      
      if (totalSoFar === 0 && numberOfRuns === 0) {
        progress = 0
      } else {
        progress = goalValue / (totalSoFar / numberOfRuns)
      }

    } else if (goalCategory === 'mileage') {
      totalSoFar = runnersRuns.reduce(
        (accumulator, run) => accumulator + run.distance, 0
      )
      
      if (totalSoFar === 0 && numberOfRuns === 0) {
        progress = 0
      } else {
        progress = totalSoFar / goalValue
      }
    }

    progress = parseInt(progress * 100)

    let h = progress * 2;
    var x;

    if (x == null) {
      x = setTimeout(myFunction1, 160);
    }

    function myFunction1() {
      document.getElementById("bar").style.height =
        Math.min(h, 200) + "px";
      document.getElementById("status").innerHTML = `${progress}%`
      if (progress >= 100) {
        // appendAward();
        showGoalCompleteBtn();
        progress = 0;
      }
    }
  }

  function showGoalCompleteBtn() {
    document.getElementById('complete-goal').style.display = ""
  }

  function hideGoalCompleteBtn() {
    document.getElementById('complete-goal').style.display = "none"
  }

    //function to show goal complete button (hidden unless progress >= 100)
  function listenForGoalComplete() {
    const completeButton = document.getElementById('complete-goal')
    completeButton.addEventListener('click', event => {
      fetch(`${BACKEND_URL}/goals/${runnerGoal.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          active: false
        })
      })
        .then(response => response.json())
        .then(updatedGoal => {
          runnerGoal = updatedGoal;
          showAddGoal();
          hideGoalCompleteBtn();
          initialGoalView();
          getAwardAfterCompleteGoal();
        })
      })
  }

  function getAwardAfterCompleteGoal() {
    const emojis = ['💯', '👏', '🤩', '🎉', '🏆', '🥇']
    fetch(`${BACKEND_URL}/awards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        name: emojis[Math.floor(Math.random() * emojis.length)],
        goal_id: runnerGoal.id,
        runner_id: runner.id
      })
    })
    .then(response => response.json())
    .then(newAward => {
      renderAwardContainer()
    })
  }

  function renderAwardContainer() {
    fetch(`${BACKEND_URL}/awards?runner_id=${runner.id}`)
    .then(response => response.json())
    .then(runnerAwards => {
      const awardsList = document.getElementById('awards-list')
      awardsList.innerHTML = ""

      runnerAwards.forEach(award => {
        newDiv = document.createElement('div')
        newDiv.textContent = `${award.name} Completed Goal`
        awardsList.appendChild(newDiv)
      })
    })
  }

  function currentMilesStats() {
    const milesDiv = document.getElementById('miles-ran');
    milesDiv.textContent = currentMiles
  }

  function updateMilesAfterNewRun(run) {
    currentMiles += run.run.distance
    currentMilesStats()
    updateMilesDatabase(currentMiles)
  }

  function updateMilesDatabase(miles) {
    fetch(`${BACKEND_URL}/runners/${runner.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'miles': miles
      })
    })
  }

  function currentStreaksStats() {
    const streakDiv = document.getElementById('run-streak')
    streakDiv.textContent = streak
  }

  setInterval(function(){addQuotesToStatsDiv()}, 10000)

  function addQuotesToStatsDiv() {
    quotes = ["'Just do it.' Nike", "'Run when you can, walk if you have to, crawl if you must; just never give up.' Dean Karnazes", "'I don’t run to add days to my life, I run to add life to my days.' Ronald Rook","'Running is about finding your inner peace, and so is a life well lived.' Dean Karnazes", "'Pain is inevitable. Suffering is optional.' Haruki Murakami", "'Pain is temporary. Quitting lasts forever.' Lance Armstrong"]
    const quotesDiv = document.getElementById('quotes')
    quotesDiv.innerText = quotes[Math.floor ( Math.random() * quotes.length )]
    
  }

  function addRaceModal() {
    const modal7 = document.getElementById("modal-race");
    const trigger7 = document.getElementById("trigger-race");
    const closeButton7 = document.getElementById("close-race");
    const submitClose7 = document.getElementById("add-race-btn");

    function toggleModal7() {
      modal7.classList.toggle("show-modal");
    }

    function windowOnClick7(event) {
      if (event.target === modal7) {
        toggleModal7();
      }
    }

    trigger7.addEventListener("click", toggleModal7);
    closeButton7.addEventListener("click", toggleModal7);
    window.addEventListener("click", windowOnClick7);
    submitClose7.addEventListener("click", toggleModal7)
  }

  function addRaceSubmit() {
    const raceForm = document.getElementById('race')
    raceForm.addEventListener('submit', e => {
      e.preventDefault()
      const cat = e.target.category.value
      const date = e.target.date.value

      const race = {
        category: cat,
        date: date,
        active: true
      }
      postRaceToDatabase(race)
     
    })
  }

  function fetchRaces() {
    fetch(`${BACKEND_URL}/races`)
      .then(resp => resp.json())
      .then(races => {
        races.forEach(race => {
          if (race.runner_id === runner.id) {
              showRace(race)
          }
        });
      })
  }

  function showRace(race) {
    const formattedDate = race.date.st
    const raceList = document.getElementById('races-ran')
    const newLi = document.createElement('li')
    newLi.id = race.id
    newLi.textContent = `${race.category}, ${race.date}`
    raceList.appendChild(newLi)
    if (race.active === true){
      addCompleteBtn(newLi)
    }
  }

  function addCompleteBtn(newLi) {
    const completeBtn = document.createElement('button')
    completeBtn.id = 'complete=race'
    completeBtn.textContent = 'Complete'
    newLi.appendChild(completeBtn)
    completeRaceEventListener(completeBtn)
  }

  function postRaceToDatabase(race) {
    fetch(`${BACKEND_URL}/races`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        category: race.category,
        date: race.date,
        runner_id: runner.id
      })
    }).then(resp => resp.json())
      .then(race => showRace(race))
  }

  function completeRaceEventListener(completeBtn) {
    completeBtn.addEventListener('click', e => {
       const id = e.target.parentElement.id
      fetch(`${BACKEND_URL}/races/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          active: false
        })
       }).then(resp => resp.json())
        .then(race => {
          e.target.style.display = 'none'
        })
    })
  }

})();
