function loginFacebook(){
 
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(resposta =>{
        console.log('usuario',resposta.user);
        console.log('token', resposta.credential.accessToken);

    }).catch(erro => {
        console.log('erro' , erro);
})      
}