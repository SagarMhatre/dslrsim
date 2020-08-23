import { Component, OnInit } from '@angular/core';
import {YouTubePlayerModule} from '@angular/youtube-player';

@Component({
  selector: 'app-test4',
  templateUrl: './test4.component.html',
  styleUrls: ['./test4.component.css']
})
export class Test4Component implements OnInit {

// Ref : https://github.com/angular/components/tree/master/src/youtube-player

  private videoId = "PRQCAL_RMVo";


/**
   * Extra parameters used to configure the player. See:
   * https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5#Parameters
   */
private playerVars = { 
  
  controls : 0 ,
  disablekb :  1 
  //, "loop" : 1, "autoplay" : 1 , "playsinline" : 0
};

private height:number = 720;
private width:number = 1080;
private startSeconds:number=150;
private endSeconds:number=155;

private suggestedQuality;

private player : YouTubePlayerModule;

  /**
   * Whether the iframe will attempt to load regardless of the status of the api on the page. Set this to true if you don't want the `onYouTubeIframeAPIReady` field to be set on the global window.
   */
  private  showBeforeIframeApiLoads: boolean = false

  constructor() { }

  ngOnInit() {
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    this.player = document.getElementById('ytplayer');

     console.log("Player : ", this.player);
    

  }

  

  

}