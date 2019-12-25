import { Injectable, Inject } from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {IMusic} from '../model/music';
import { Guid } from "guid-typescript";
import { Observable, of, BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'music_list';
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  emptyMusicList: IMusic[] = [];
  currentSignedInUser = new BehaviorSubject<string>("Guest");
  constructor(@Inject (LOCAL_STORAGE) private storage: StorageService) { }
  signedInUsers(isAdmin: boolean){
    if(isAdmin == true) {
      this.currentSignedInUser.next("Admin");
    }
    else {
      this.currentSignedInUser.next("Guest");
    }
  }
  getSignedInUsers(){    
    return this.currentSignedInUser.getValue();
  }
  public storeOnLocal(music : IMusic[]) {    
    let eventResult = '';
    let unid: Guid;
    try {
      let currentMusicList: IMusic[] = this.storage.get(STORAGE_KEY) || this.emptyMusicList;
      music.forEach(itm => {
        if(itm.albumName !== "")
        {
          if (currentMusicList.findIndex(exItm => exItm.titleName == itm.titleName) < 0)
          unid  = Guid.create();
          currentMusicList.push({
            titleName: itm.titleName,
            albumName: itm.albumName,
            composerName:itm.composerName,
            artistName: itm.artistName,
            releasedDate: itm.releasedDate,
            albumimage: itm.albumimage,
            uid: unid.toString()      
          });
          this.storage.set(STORAGE_KEY, currentMusicList);
          eventResult = unid.toString();
        }
      });
    } catch (error) {
      eventResult = "Error: " + error;
    }
    return eventResult;
  }
  public getLocalMusicList() : Observable<IMusic[]>{
    return of(this.storage.get(STORAGE_KEY) || this.emptyMusicList);        
  }
  public getUniqueMusicList(): IMusic[]{
    let uniqueList : IMusic[] = [];
    (this.storage.get(STORAGE_KEY) || this.emptyMusicList).forEach(element => {
      if(uniqueList.findIndex(itm => itm.albumName == element.albumName) < 0)
      {
        uniqueList.push({
          albumName: element.albumName,
          titleName: element.titleName,
          artistName: element.artistName,
          releasedDate: element.releasedDate,
          composerName: element.composerName,
          uid:element.uid,
          albumimage: element.albumimage
        })
      }
    });
    return uniqueList;
  }
  public generateDemoList() :Observable<string> {
    const MUSIC_DATA: IMusic[] = [
      {uid:'0', titleName: 'Thalaivar Theme', albumName: 'Darbar', 
      composerName: 'Anirudh Ravichander',artistName: 'Anirudh Ravichander', releasedDate: '01/11/2019',albumimage: '../assets/images/Darbar.jpg'},  
      {uid:'0', titleName: 'Chumma Kizhi', albumName: 'Darbar', 
      composerName: 'Anirudh Ravichander',artistName: 'S.P. Balasubramanyam', releasedDate: '01/11/2019',albumimage: '../assets/images/Darbar.jpg'},
      {uid:'0', titleName: 'The Life of Ram', albumName: '96', 
      composerName: 'Govind Vasantha',artistName: 'Govind Vasantha, Pradeep Kumar', releasedDate: '24/08/2018',albumimage: '../assets/images/96.jpg'},
      {uid:'0', titleName: 'Vasantha Kaalangal', albumName: '96', 
      composerName: 'Govind Vasantha',artistName: 'Chinmayi Sripada, Govind Vasantha', releasedDate: '24/08/2018',albumimage: '../assets/images/96.jpg'},
      {uid:'0', titleName: 'Believer', albumName: 'Believer', 
      composerName: 'Imagine Dragons',artistName: 'Evolve Imagine Dragons', releasedDate: '24/08/2019',albumimage: '../assets/images/Believer.jpg'},
      {uid:'0', titleName: 'Thunder', albumName: 'Believer', 
      composerName: 'Imagine Dragons',artistName: 'Evolve Imagine Dragons', releasedDate: '24/08/2019',albumimage: '../assets/images/Believer.jpg'},
      {uid:'0', titleName: 'Jai Ho', albumName: 'Slumdog Millionaire', 
      composerName: 'A.R. Rahman',artistName: 'Freida Pinto, Vijay Prakash', releasedDate: '01/12/2009',albumimage: '../assets/images/slumdog.jpg'},
      // {uid:8, titleName: 'Thunder Thunder', albumName: 'ABC', 
      // composerName: 'Imagine Dragons',artistName: 'Evolve Imagine Dragons', releasedDate: '24/08/2019',albumimage: '../assets/images/Believer.jpg'},
      // {uid:9, titleName: 'Jai Hooo', albumName: 'CBA Millionaire', 
      // composerName: 'A.R. Rahman',artistName: 'Freida Pinto, Vijay Prakash', releasedDate: '01/12/2009',albumimage: '../assets/images/slumdog.jpg'},
      

    ];    
    return of(this.storeOnLocal(MUSIC_DATA));
  }
}
 