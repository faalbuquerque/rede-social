$(document).ready(function () {

    $("#btn-login").click(function (event) {
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();
    
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (response) {
                window.location = 'profile.html';
              
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage);
            });
    })

    $("#login-gmail").click(function (event) {
        event.preventDefault();
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                let token = result.credential.acessToken;
                let user = result.user;
                window.location = 'profile.html';
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                let email = error.email;
                let credential = error.credential;
                alert('Erro de autenticação')
            })
    })

})


