import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PeopleCarouserComponent } from './Components/people-carousel/people-carousel.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PeopleService } from './services/people.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { RegistrationComponent } from './login/registration/registration.component';
import { MyPageComponent } from './Components/my-page-component/my-page.component';
import { PersonPageComponent } from './Components/person-page/person-page.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PeopleCarouserComponent,
    PersonPageComponent,
    LoginComponent,
    RegistrationComponent,
    MyPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'ng-cli-universal'
    }),
    HttpClientModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    //MatButtonModule,
    //MatInputModule,
    //MatCardModule,
    RouterModule.forRoot([{
      path: '',
      component: HomeComponent,
      pathMatch: 'full'
    }, {
      path: 'home',
      component: HomeComponent
      },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'my-page', component: MyPageComponent },
      { path: 'people-carousel', component: PeopleCarouserComponent },
      { path: 'person/:id', component: PersonPageComponent },
      {
      path: '**',
      redirectTo: 'home'
    }])
  ],
  providers: [JwtHelper, AuthGuard, PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }  
