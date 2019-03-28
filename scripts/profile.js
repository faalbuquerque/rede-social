
$(document).ready(function() {

    $("#post-button").click(function(){
        let postText = $("#post-text").val();
        $("#post-feed").prepend(
          `<li class="post-style"> ${postText} </li>
           <button>Excluir</button>
           <button>Editar</button>
          `);
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

