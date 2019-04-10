$(document).ready(function () {

    $("#btn-register").click(function (event) {
        event.preventDefault();

        let name = $("#input-name").val();
        let email = $("#input-email").val();
        let password = $("#input-password").val();

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (response) {
                window.location = 'profile.html?id=' + response.user.uid;
                database.ref("users/" + response.user.uid).push({
                name: name,
                }); 
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert("erro: " + errorMessage);
            });

    });


    $("#new-user").click(function (event) {
        event.preventDefault();
        window.location = 'register.html';
    });   


    $("#exit").click(function (event) {
        event.preventDefault();
    
        firebase.auth().signOut().then(function() {
            window.location = 'index.html';
        }).catch(function(error) {
            alert("Erro: " + error);
        });
    });
  
});
