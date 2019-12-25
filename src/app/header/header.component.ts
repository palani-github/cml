import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MusicService} from '../shared/service/music.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser = '';
  constructor(private musicService: MusicService,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this.musicService.getSignedInUsers();
    if(this.currentUser == ''){
      this.currentUser = "Guest";
    }
  }
  onSwitchUser(isAdmin: boolean) {    
    this.musicService.signedInUsers(isAdmin);    
    if(isAdmin == true)
    {
      this.currentUser = "Admin";
    } else {
      this.currentUser = "Guest";
    }    
    this.router.navigate(['']);
  }

}
