document.addEventListener("DOMContentLoaded",function(){firebase.firestore().collection("answers").doc("quiz_data").get().then(function(e){if(e.exists){const t=e.data();QuizDataModel(t),quizDataModel.push(new QuizDataModel(t))}else console.log("No such document exists in the database")}).catch(function(e){console.log("There seems to be an error: ",e)})});const quizDataModel=[];function QuizDataModel(e){this.answer=e}var questionsModel=[{question:"This is a so called dummy question.<br><p class='small'><b>Hint</b>: <i>this.password = ' '</i></p>"},{question:"This text is the password.<br><p class='small'><b>Hint</b>: <i>sentence.SubArray(5, 4);</i></p>"},{question:"This text is the password.<br><p class='small'><b>Hint</b>: <i>This time the previous password is encrypted. Don't be sha to be the one that's going to find it.</i></p>"},{question:"This time the password is hidden within this page.<br><p class='small'><b>Hint</b>: <i>I am revealed when inspected.</i>\x3c!-- <span>Password: w-12..---</span>--\x3e</p>"},{question:"The admin is more careful now. He stores the passwords within a database.js file.<p class='small'><b>Hint: </b><i>Even though he ensured they're encrypted, he didn't invest enough time to hide the file...</i></p>"}];const userInputField=document.getElementById("userInput"),questionText=document.getElementById("question"),startTheGameWrapper=document.getElementById("start"),quizGameWrapper=document.getElementById("quiz"),endScreenWrapper=document.getElementById("endgame");let currentAnswerIndex=0,currentQuestionIndex=1,score=0;function StartTheGame(){startTheGameWrapper.classList.add("disabled"),quizGameWrapper.classList.remove("disabled"),ResetUserInput(),DisplayNextQuestion()}function Endgame(){let e=Object.keys(quizDataModel[0].answer).length;currentAnswerIndex===e&&(quizGameWrapper.classList.add("disabled"),endgameComponent.init())}function DisplayNextQuestion(){var e="";e+="<h3 class='font-weight-bold'>"+currentQuestionIndex+". Question </h3>",e+=questionsModel[currentAnswerIndex].question,questionText.innerHTML=e}function ResetUserInput(){userInputField.value="",userInputField.style.borderColor="transparent"}function IsCorrectAnswer(){userInputField.value===quizDataModel[0].answer[currentAnswerIndex]?(currentAnswerIndex++,currentQuestionIndex++):userInputField.style.borderColor="red"}function Submit(){quizDataModel&&(IsCorrectAnswer(),Endgame(),ResetUserInput(),DisplayNextQuestion())}var header={init:function(){document.querySelector("header").innerHTML='<div class="pos-f-t"><div class="collapse" id="navbarToggleExternalContent"><div class="p-4"><ul class="navbar-nav mr-auto mt-2 mt-lg-0"><li class="nav-item"><a class="text-white nav-link" href="index.html">Home</a></li><li class="nav-item"><a class="text-white nav-link" href="about.html">About This App</a></li><li class="nav-item"><a class="text-white nav-link" href="#" onclick="googleLogin()">Login</a></li><li class="nav-item logout"><a class="text-white nav-link" href="#" onclick="googleLogout()">Logout</a></li></ul></div></div><nav class="navbar navbar-dark"><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="logged-in"><span class="text-small text-white pr-3" id="username"></span><div class="dropdown show"><a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="img-fluid profile-picture" src="" alt="Logged In User Profile Picture" /></a><div class="dropdown-menu dropdown-menu-right align-center" aria-labelledby="dropdownMenuLink"><img class="img-fluid dropdown-profile-picture" src="" alt="Dropdown Profile Picture" /><p class="text-small font-weight-bold dropdown-username"></p><p class="text-small dropdown-email"></p><p class="text-small dropdown-email"></p></div></div><span class="text-small text-white pr-2" id="loader">Loading your profile...</span></div></nav></div>'}};header.init();var endgameComponent={init:function(){document.getElementById("endgame").innerHTML='<div class="container"><div class="row"><div class="col-sm-9 col-md-7 col-lg-5 mx-auto mt-5"><div class="card card-signin my-5"><div class="card-body"><h3 class="card-title text-center">Congratulations!<img src="assets/img/icons/champagne.png"/></h3><p class="text-center">You successfully passed this quiz!</p><p class="text-center">Make sure to stay updated on the new features.</p><p class="text-center">New questions are in preparation as well as the highscore board, login options to save your data, view instructional materials and suggesting improvements through our contact center.</p><p class="text-center">Thank you a lot for playing, have a nice day! </p></div></div></div></div></div>'}};let userName=document.getElementById("username"),loggedInNavbar=document.querySelector(".logged-in"),profilePicture=document.querySelector(".profile-picture"),logoutBtn=document.querySelector(".logout"),dropdownProfilePicture=document.querySelector(".dropdown-profile-picture"),dropdownUsername=document.querySelector(".dropdown-username"),dropdownEmail=document.querySelector(".dropdown-email");function googleLogin(){const e=new firebase.auth.GoogleAuthProvider;firebase.auth().signInWithPopup(e).then(function(e){successfulLogin(e.user)}).catch(function(e){console.log("There has been an error: ",e)})}function successfulLogin(e){null!=e?(loggedInNavbar.style.display="flex",logoutBtn.style.display="block",profilePicture.src=e.photoURL,userName.innerHTML="Hello, "+e.displayName,dropdownProfilePicture.src=e.photoURL,dropdownUsername.innerHTML=e.displayName,dropdownEmail.innerHTML=e.email):console.log("User is logged out.")}function googleLogout(){firebase.auth().signOut().then(function(){loggedInNavbar.style.display="none",logoutBtn.style.display="none",console.log("User is successfully logged out.")}).catch(function(e){console.log("There has been an error: ",e)})}let isLoaderActive=!1,loader=document.getElementById("loader");document.addEventListener("DOMContentLoaded",function(){loader.style.display=1==isLoaderActive?"block;":"none",isLoaderActive=!0,firebase.auth().onAuthStateChanged(function(e){e?(successfulLogin(e),setTimeout(function(){isLoaderActive=!1},2e3)):firebase.auth().signOut()})});