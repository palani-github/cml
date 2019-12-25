import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {IMusic} from '../shared/model/music'
import {MusicService} from '../shared/service/music.service';
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {  
  displayedColumns: string[] = ['titleName', 'albumName', 'composerName', 
  'artistName', 'releasedDate', 'albumimage'];
  musicList:IMusic[] = [];  
  dataSource = new MatTableDataSource(this.musicList);
  albumName = '';
  @ViewChild('pg', {static: true}) pagination: MatPaginator;
  constructor(private musicService: MusicService,
    private router: Router, private route: ActivatedRoute
    ) {}
  ngOnInit() {    
    if(this.route.snapshot.paramMap.has("albumName")){
      this.albumName = this.route.snapshot.paramMap.get("albumName");
    }
    this.bindMusicList();
  } 
  bindMusicList()
  {
    this.musicService.getLocalMusicList().subscribe(resp =>
      {
        if(this.albumName !== '')
        {
          resp.forEach(itm => {
            if(itm.albumName == this.albumName)
            {
              this.musicList.push(
                {
                albumimage : itm.albumimage,
                albumName: itm.albumName,
                titleName: itm.titleName,
                artistName: itm.artistName,
                releasedDate: itm.releasedDate,
                uid: itm.releasedDate,
                composerName: itm.composerName                
              });
            }
          })
        }else {
          this.musicList = resp;
        }
        this.dataSource = new MatTableDataSource(this.musicList);  
        this.dataSource.paginator = this.pagination; 
      });
  }
  applySearchFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.pagination;
  }
}