import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from '@angular/cdk/dialog';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { HttpLink } from 'apollo-angular/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(
  //   private httpLink: HttpLink
  // ) {
  //   const uri = 'http://localhost:8000/graphql/'; // Cambia esta URL por la de tu servidor GraphQL Django
  //   httpLink.create({
  //     uri
  //   });
  // }
}
