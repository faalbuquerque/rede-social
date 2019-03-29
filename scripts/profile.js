let database = firebase.database();

$(document).ready(function() {

  database.ref('posts').once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      createPost(childData.text, childKey)
    });

  });

  $("#exit").click(function (event) {
    event.preventDefault();

    firebase.auth().signOut().then(function () {
      window.location = 'index.html';
    }).catch(function (error) {
      alert("Erro: " + error);
    });
  });

  $("#post-button").click(function () {
    event.preventDefault();

    let postText = $("#post-text").val();
    $("#post-text").val("");

    let newPostInDB = database.ref('posts').push({
      text: postText    
    });
    
    createPost(postText, newPostInDB.key); 

    $("#post-button").prop("disabled", true);

  });

  $("#post-button").prop("disabled", true);

  $("#post-text").keyup(function (event) {
    
    if ($(this).val().length != 0) {
      $("#post-button").prop("disabled", false);
    }
    else {
      $("#post-button").prop("disabled", true);
    }
  });

  });

  function createPost (text, key){
    $("#post-feed").prepend(
      `<li class="post-style"> 
      <p>${text}</p> 
      <button data-del-id="${key}">Excluir</button>
      <button data-edit-id="${key}">Editar</button>
       </li> 
       `);

       $(`button[data-del-id=${key}]`).click(function(){
         $(this).parent().remove();
         database.ref("posts/" + key).remove();
      
      });

      
    //   $(`button[data-edit-id=${key}]`).click(function(){
       
     
    //  });

}


