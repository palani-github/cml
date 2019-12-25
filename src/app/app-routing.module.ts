import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { EditorialsComponent } from './editorials/editorials.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { ErrorComponent } from './error/error.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [ 
  {
    path : '', component : HomeComponent
  },
  {
    path: 'albums', component: AlbumsComponent
  },
  {
    path: 'albums/:albumName', component: AlbumsComponent
  },
  {
    path: 'editorials', component: EditorialsComponent
  },
  {
    path: 'accessdenied', component: AccessdeniedComponent
  },
  {
    path: 'error', component: ErrorComponent
  },
  {
    path: 'pagenotfound', component: PagenotfoundComponent
  },
  {
    path: '**', redirectTo: '/pagenotfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
