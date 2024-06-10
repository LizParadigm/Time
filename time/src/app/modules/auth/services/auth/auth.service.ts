import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/simulacion/api.service';
import { Apollo, gql } from 'apollo-angular';
import { Credential } from 'src/app/core/models/users/credencial';
import { User } from 'src/app/core/models/users/user';
import { Router } from '@angular/router';
import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';

const TOKENAUTH = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const CREATEUSER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName,  username: $username, email: $email, password: $password) {
      user { 
        id
        firstName
        lastName
        username
        email
      }
    }
  }
`;

const VERIFICARCORREOEXISTENTE = gql`
  query VerificarCorreo($email: String!) {
    correo(email: $email)
  }
`;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private api: ApiService,
    private apollo: Apollo,
  ) { }

  iniciarSesion(credencial: Credential, handleError: (error: any) => void) {
    this.tokenAuth(credencial).subscribe(({ data }) => {
      sessionStorage.setItem("username", credencial.username.toString());
      sessionStorage.setItem("token", JSON.parse(JSON.stringify(data)).tokenAuth.token);
      sessionStorage.setItem('tema', 'oscuro');

      this.router.navigate(['/home']);
      alert("Usuario creado, redirigiendo al menu.");
    }, (error) => {
      handleError(error);
    });
  }




  verificarCorreoExistente(email: string) {
    console.log('paso 1', email)
    return this.apollo.query({
      query: VERIFICARCORREOEXISTENTE,
      variables: {
        email: email
      }
    });
  }

  validarContrasenaCorrecta(correo: string, contra: string): boolean {
    let correcta = this.api.comprobarContrasena(correo, contra);
    if (correcta) {
      return true;
    }
    else {
      return false;
    }
  }

  crearUsuario(user: User) {
    return this.apollo.mutate({
      mutation: CREATEUSER,
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        password: user.password
      }
    });
  }

  tokenAuth(myCredential: Credential) {
    return this.apollo.mutate({
      mutation: TOKENAUTH,
      variables: {
        username: myCredential.username,
        password: myCredential.password
      }
    });
  }
}
