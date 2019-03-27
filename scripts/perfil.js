//jq
$(document).ready(function () {

    $("#exit").click(function (event) {
        event.preventDefault();

        firebase.auth().signOut().then(function() {
            window.location = 'index.html';
        }).catch(function(error) {
            alert("Erro: " + error);
        });
    });
});

//js
document.querySelector("#btn-fork").disabled = true;

function postComment(){
    let comment = document.getElementById("comment").value;
    return comment;
}

function writePost(){
    let elemento = document.createElement("textarea");
    let hora = document.createElement("p");
    hora.textContent = hour();
    elemento.textContent = postComment();
    document.body.appendChild(hora);
    document.body.appendChild(elemento);
}

function clearPost(){
    document.querySelector("#btn-fork").disabled = true;
    document.getElementById("comment").value = "";
    document.getElementById("counter").innerHTML = 140;
}

let botao= document.querySelector("#btn-fork");
botao.addEventListener("click", writePost);
botao.addEventListener("click", clearPost);

function countChar(){
    let characters = document.getElementById("comment").value.length;
    let tamanho = 140 - characters;
    document.getElementById("counter").innerHTML = tamanho;

    if(characters < 120 && characters <= 129){
        counter.style.color= "#000";
    }
    if(characters >= 120 && characters <= 129){
        counter.style.color= "#FFA500";
    }
    if(characters >= 130 && characters <= 140){
        counter.style.color= "#FF0000";
    }
    if(characters > 140){
        counter.style.color= "#9932CC";
    }
  }

  function desabilitaOuNao(){
    let texto = document.getElementById("comment").value;
    let botao = document.querySelector("#btn-fork");

    if(texto.length > 0 && texto.length <= 140) {
        botao.disabled= false;
    }
    else{
        botao.disabled = true;
    }
}

let comment= document.getElementById("comment");
comment.addEventListener("keyup", countChar);
comment.addEventListener("keyup", desabilitaOuNao);


function hour(){
   let hora = new Date().getHours();
   let minuto = new Date().getMinutes();

   if(minuto < 10){
       minuto = "0" + minuto;
   }    
   return hora + ":" + minuto;
}

