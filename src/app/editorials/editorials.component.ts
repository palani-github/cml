import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {IMusic} from '../shared/model/music'
import {MusicService} from '../shared/service/music.service';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editorials',
  templateUrl: './editorials.component.html',
  styleUrls: ['./editorials.component.css']
})
export class EditorialsComponent implements OnInit {
  displayedColumns: string[] = ['titleName', 'albumName', 'composerName', 'artistName', 'releasedDate', 'albumimage'];
  musicList:IMusic[] = [];
  dataSource = new MatTableDataSource(this.musicList);
  ctrlTitleName = new FormControl('',[Validators.required]);
  ctrlAlbumName = new FormControl('',[Validators.required]);
  ctrlComposerName = new FormControl('',[Validators.required]);
  ctrlArtistName = new FormControl('',[Validators.required]);
  ctrlRelDt = new FormControl('',[Validators.required]);
  // ctrlImage = new FormControl('', [Validators.required]);
  constructor(private musicService: MusicService, 
    private router: Router) {}
  ngOnInit() {
    this.isUserAllowed();
  }
  isUserAllowed(){
    if(this.musicService.getSignedInUsers() !== "Admin")
    {
      this.router.navigate(['/accessdenied']);
    }
  }
  onSubmit(){    
    let eventResult = '';
    if(
      !this.ctrlAlbumName.invalid &&
      !this.ctrlTitleName.invalid &&
      !this.ctrlComposerName.invalid &&
      !this.ctrlArtistName.invalid &&
      !this.ctrlRelDt.invalid   
    )
    {
      this.musicList.push({
        artistName: this.ctrlArtistName.value,
        albumName: this.ctrlAlbumName.value,
        titleName:this.ctrlTitleName.value,
        composerName: this.ctrlComposerName.value,
        releasedDate: this.ctrlRelDt.value.toLocaleString('en-IN').split(',')[0],
        albumimage: '../assets/images/default.jpg',
        uid: '0'
      });
      eventResult = this.musicService.storeOnLocal(this.musicList);      
      if(eventResult !== ''){
        alert("Successfully Added!");
        this.dataSource = new MatTableDataSource(this.musicList);
      }
    }else {
      alert("Please enter value for all the fields and then submit");
    }
  }
}
