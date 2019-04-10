let database = firebase.database();
let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function () {

  database.ref('/posts/' + USER_ID).once('value')
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {

        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        let privacy = childData.privacyType;
        let time = childData.time


        createPost(childData.text, childKey, privacy, time, childData.like)

      });
    });

  $("#post-button").click(function (event) {
    event.preventDefault();

    let postText = $("#post-text").val();
    $("#post-text").val("");

    let privacy = $("#privacy-menu option:selected").text();
    let hour = getTime()

    let newPostInDB = database.ref('posts/' + USER_ID).push({
      text: postText,
      privacyType: privacy,
      time: hour,
      like: 0
    });

    createPost(postText, newPostInDB.key, privacy, hour, likePost);
  });

  let likePost = 0

  $("#post-button").prop("disabled", true);


  $("#post-button").prop("disabled", true);

  $("#post-text").keyup(function (event) {
    if ($(this).val().length != 0) {
      $("#post-button").prop("disabled", false);
    }
    else {
      $("#post-button").prop("disabled", true);
    }
  });


  function createPost(text, key, privacyType, hour, likePost) {
    $("#post-feed").prepend(
      `<li class="post-style" data-post-id="${key}">

      <div class="d-flex flex-row justify-content-between mr-5  p-3 border border-secondary rounded">
  
        <div class="d-flex flex-column align-item-end">
          <p data-id-post="${key}" class="post-text">${text}</p>
          <span class="privacy-type">${privacyType}</span>
          <span class="privacy-type">${hour}</span>
        </div>
  
        <div class="btns d-flex flex-column align-items-start">
          <button class="btn-del ml-auto" id="btn-del" data-del-id="${key}" data-toggle="modal" data-target=".display-modal"><i
              class="fas fa-trash-alt"></i></button>
          <button class="btn-edit ml-auto" id="btn-edit" data-edit-id="${key}"><i class="fas fa-edit"></i></button>
          <button class="btn-save border border-danger rounded d-none" data-save-id="${key}">Salvar</button>
        </div>
      </div>
        <div class="mb-3 mt-1">
          <button class="fas fa-heart like-icon" type="button" data-like-id="${key}">
            <span class="badge text-style" data-span-id="${key}">${likePost}</span></button>
  
        </div>
  
    </li>
         
   `);

    $(`button[data-del-id=${key}]`).click(function (event) {
      event.preventDefault();

      $("#delete-btn").click(function () {
        $(`li[data-post-id=${key}]`).remove();
        database.ref("posts/" + USER_ID + "/" + key).remove();
      })
    });

    $(`button[data-edit-id=${key}]`).click(function (event) {
      event.preventDefault();

      $(`.post-text[data-id-post="${key}"]`).replaceWith(`<textarea data-id-txta=${key} class="post-area border-0">${text}</textarea>`);
      $(`.btn-save[data-save-id="${key}"]`).toggleClass("d-none");

      $(`.btn-save[data-save-id="${key}"]`).click(function (event) {
        event.preventDefault();
        let newText = $(`[data-id-txta=${key}]`).val()
        database.ref("posts/" + USER_ID + "/" + key).update({
          text: newText
        })

        $(`[data-id-txta=${key}]`).replaceWith(`<p data-id-post="${key}" class="post-text">${newText}</p>`)

        $(`.btn-save[data-save-id="${key}"]`).toggleClass("d-none");
      });
    });

    $(`button[data-like-id=${key}]`).click(function () {
      let contador = 0;
      contador += 1;
      let numero = parseInt($(`span[data-span-id="${key}"]`).text()) + 1;
      $(`span[data-span-id="${key}"]`).text(numero);
      database.ref("posts/" + USER_ID + "/" + key).update({
        like: numero
      })
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

  $("#private").click(function (event) {
    event.preventDefault();


      database.ref("posts/" + USER_ID).once("value", function (snapshot) {
        $("#post-feed").html("");
        snapshot.forEach(function (childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          let privacy = childData.privacyType;
          let time = childData.time
          
          
          if(privacy === "Privado"){
            createPost(childData.text, childKey, privacy, time, childData.like)
          }
    }); 

      });

  });

  $("#public").click(function (event) {
    event.preventDefault();

      database.ref("posts/" + USER_ID).once("value", function (snapshot) {
        $("#post-feed").html("");
        snapshot.forEach(function (childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          let privacy = childData.privacyType;
          let time = childData.time
         
          
          if(privacy === "Público"){
            createPost(childData.text, childKey, privacy, time, childData.like)
          }
    }); 

      });

  });

  $("#allposts").click(function (event) {
    event.preventDefault();

    database.ref("posts/" + USER_ID).once("value", function (snapshot) {
      $("#post-feed").html("");
      snapshot.forEach(function (childSnapshot) {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        let privacy = childData.privacyType;
        let time = childData.time
       
        createPost(childData.text, childKey, privacy, time, childData.like)
          }); 

    });
   
  });

});

function getTime() {
  let tweetDate = new Date();
  let showDate = tweetDate.getDate() + '/' + (tweetDate.getMonth()+1) + '/' + tweetDate.getFullYear() + ' - ' + tweetDate.getHours() + ':' + tweetDate.getMinutes();
  
  return showDate;
}
  

