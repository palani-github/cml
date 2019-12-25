import { Component, OnInit } from '@angular/core';
import {IMusic} from '../shared/model/music'
import {MusicService} from '../shared/service/music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: IMusic[] = [];
  constructor(private musicService: MusicService) {} 
  ngOnInit() {
    this.musicService.generateDemoList().subscribe(resp =>
      {
        this.dataSource = this.musicService.getUniqueMusicList();
      });
  }
}
