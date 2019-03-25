document.getElementById("screen-register").style.display = "none";
document.getElementById("register").style.display = "none";

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("new-user").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    } else {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("new-user").style.display = "block";  
    }
  });


function login(){
    let userEmail = document.getElementById("email").value;
    let userPass  = document.getElementById("password").value;
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        window.alert("Errooou: " + errorMessage);
      }); 
}


function logout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
}

function newUser(){
    document.getElementById("new-user").style.display = "none";
    document.getElementById("screen-register").style.display = "block";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("register").style.display = "block";

    let newEmail = document.getElementById("new-email").value;
    let newPass  = document.getElementById("new-pass").value;

    firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });  
}

function hide(){
    return document.getElementById("screen-register").style.display = "none";
}


let botao = document.getElementById("sair");
botao.addEventListener("click", function(){
document.location.reload(true);
});


/*
criando os posts...

document.querySelector(".btn-fork").disabled= true

function postComment(){
    let comment= document.getElementById("comment").value
    return comment
}

function writePost(){
    let elemento= document.createElement("textarea")
    let hora= document.createElement("p")
    hora.textContent= hour()
    elemento.textContent= postComment() 
    document.body.appendChild(hora)
    document.body.appendChild(elemento)
}

function clearPost(){
    document.querySelector(".btn-fork").disabled= true
    document.getElementById("comment").value= ""
    document.getElementById("counter").innerHTML= 140
}

let botao= document.querySelector(".btn-fork")
botao.addEventListener("click", writePost)
botao.addEventListener("click", clearPost)

function countChar(){
    let characters= document.getElementById("comment").value.length
    let tamanho= 140 - characters;
    document.getElementById("counter").innerHTML= tamanho

    if(characters < 120 && characters <= 129){
        counter.style.color= "#000"
    }
    if(characters >= 120 && characters <= 129){
        counter.style.color= "#FFA500"
    }
    if(characters >= 130 && characters <= 140){
        counter.style.color= "#FF0000"
    }
    if(characters > 140){
        counter.style.color= "#9932CC"
    }
  }

  function desabilitaOuNao(){
    let texto= document.getElementById("comment").value
    let botao= document.querySelector(".btn-fork")

    if(texto.length > 0 && texto.length <= 140) {
        botao.disabled= false
    }
    else{
        botao.disabled= true
    }
}

let comment= document.getElementById("comment")
comment.addEventListener("keyup", countChar)
comment.addEventListener("keyup", desabilitaOuNao)


function hour(){
   let hora= new Date().getHours()
   let minuto= new Date().getMinutes()

   if(minuto < 10){
       minuto= "0" + minuto
   }    
   return hora + ":" + minuto
}
*/