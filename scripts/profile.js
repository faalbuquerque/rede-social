let database = firebase.database();
let USER_ID =  window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {

  database.ref('/posts/' + USER_ID).once('value')
    .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {

      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();

      createPost(childData.text, childKey)
    });
  });


  $("#post-button").click(function (event) {
    event.preventDefault();

    let postText = $("#post-text").val();
    $("#post-text").val("");

    let newPostInDB = database.ref('posts/' + USER_ID).push({
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

  function createPost (text, key){
    $("#post-feed").prepend(
      `<li class="post-style"> 
        <div class="d-flex flex-row justify-content-between mr-5 my-3 p-3 border border-secondary rounded"> 
          <p>${text}</p> 
         
          <button id="btn-del" data-del-id="${key}"><i class="fas fa-trash-alt"></i></button>
          <button id="btn-edit" data-edit-id="${key}"><i class="fas fa-edit"></i></button>
        
        </div>
      </li> 
   `);
  
    $(`button[data-del-id=${key}]`).click(function(event){
      event.preventDefault();
      $(this).parent().remove();
      database.ref("posts/" + USER_ID + "/" + key).remove();
    });
  

    $(`button[data-edit-id=${key}]`).click(function(event) {
      event.preventDefault();
      
      $("#post-feed").html(
        `<li class="post-style">  
          <div class="d-flex flex-row justify-content-between mr-5 my-3 p-3 border border-secondary rounded"> 
            <p>${text}</p>
            
              <button id="btn-del" data-del-id="${key}"><i class="fas fa-trash-alt"></i></button>
              <button id="btn-edit" data-edit-id="${key}"><i class="fas fa-edit"></i></button>

              <button id="btn-edit"> Salvar</button>
            
            </div> 
           </li> 
        `)
        $("#btn-edit").click(function(event) {
            event.preventDefault();
            let newText = $(`p[data-text-id=${key}]`).val()

            $(`p[data-text-id=${key}]`).text(newText)
            database.ref("posts/" + USER_ID + "/" + key).update({
                text: newText
            })   
          
        });
      }); 
      
    }


  $("#exit").click(function (event) {
    event.preventDefault();
    firebase.auth().signOut().then(function () {
      window.location = 'index.html';
    }).catch(function (error) {
      alert("Erro: " + error);
    });
  });
   
});

