import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from 'src/app/core/models/users/user';
import { Credential } from 'src/app/core/models/users/credencial';
import { Token } from 'src/app/core/models/users/Token';

const TOKENAUTH = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) { }

  tokenAuth(myCredential: Credential) {

    // console.log("username ... " + myCredential.nickname);
    // console.log("password ... " + myCredential.password);

    // var myToken = new Token();

    // // call api

    // return this.apollo.mutate({
    //   mutation: TOKENAUTH,
    //   variables: {
    //     username: myCredential.nickname,
    //     password: myCredential.password
    //   }
    // });
  }

  resetPassword(email: String, password: String, token: String) {
    // // call reset password API 

    // var isResetPassword = 1;

    // this.destroyToken(token);

    // return "" + isResetPassword;

  }

  sendUrlResetPassword(email: String) {

    // console.log("email ... " + email);

    // var myUser = this.validateUser(email);

    // if (myUser.id != 0) {

    //   var myUrlReset = this.createUrlReset(myUser.email);
    //   console.log(myUrlReset);
    //   var sendEmail = this.sendEmail(myUser.email, myUrlReset);
    //   console.log(sendEmail);
    // }

    // return myUser;

  }

  sendEmail(email: String, urlReset: String) {

    // var emailSuccess = 0;

    // // send email using SMTP (gmail, outlook..)

    // // email sent
    // emailSuccess = 1;
    // console.log('sent to :' + email);
    // console.log('url : ' + urlReset);

    // return "" + emailSuccess;

  }
  createUrlReset(email: String) {
    // var myUrlReset = "" +
    //   this.createBaseURL() +
    //   "/" +
    //   email +
    //   "/" +
    //   this.createTokenReset(email)

    // return myUrlReset;
  }

  createBaseURL(){

    // // call process to create base URL
    // var baseURL = "http://localhost:4200/reset-password";

    // return baseURL;
  }

  createTokenReset(email: String){
    // JWT create a token to encrypt email
    // var SECRET_KEY = "i-love-adsoftsito";

    // var myToken = "lkjlskiei8093wjdjde9203394"

    // return myToken;
  }


  validateUser(email: String) {

    // call fake query api by email

    // var myUser = new User();

    // // Success, email valid
    // if (email == "adsoft@live.com.mx") {
    //   console.log("Success " + myUser.id);
    //   myUser.id = 1; // Success
    //   myUser.email = email;
    //   myUser.nickname = "adsoft";
    //   myUser.password = "";
    // }
    // else {
    //   console.log("Error" + myUser.id);

    //   myUser.id = 0; // Error
    // }

    // return myUser;

  }



  validateToken(email: String, token: String) {

    // // call api to validate token 
    // // success
    // console.log('validating token ... ' + token);

    // var validToken = 1;
    // return "" + validToken;

  }

  destroyToken(token: String) {

    // // call api to destroy token
    // var istokenDestroyed = 1;
    // console.log('destroying token ... ' + token);
    // return "" + istokenDestroyed;
  }

}
