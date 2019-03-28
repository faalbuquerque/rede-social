$(document).ready(function () {

    $("#btn-register").click(function (event) {
    event.preventDefault();
    let email = $("#input-email").val();
    let password = $("#input-password").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            window.location = 'profile.html';
        })
        .catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            alert("erro: " + errorMessage);
        });
    })


    $("#exit").click(function (event) {
        event.preventDefault();
    
        firebase.auth().signOut().then(function() {
            window.location = 'index.html';
        }).catch(function(error) {
            alert("Erro: " + error);
        });
    });


    $("#new-user").click(function (event) {
        event.preventDefault();
        window.location = 'register.html';
    });
    
});

