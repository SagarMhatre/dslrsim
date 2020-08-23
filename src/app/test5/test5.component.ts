import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-test5",
  templateUrl: "./test5.component.html",
  styleUrls: ["./test5.component.css"]
})
export class Test5Component implements OnInit {
  /* 1. Some required variables which will be used by YT API*/

  public YT: any;
  public videoId: String;
  public player: any;
  public reframed: Boolean = false;

  private playerVars = {
    autoplay: 1,
    modestbranding: 1,
    controls: 0,
    disablekb: 1,
    rel: 0,
    showinfo: 0,
    fs: 0,
    playsinline: 1,
    enablejsapi:1, 
    loop:1,
    start:110,
    end:120
  };

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  /* 2. Initialize method for YT IFrame API */
  init() {
    // Return if Player is already created
    if (window["YT"]) {
      this.startVideo();
      return;
    }

    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window["onYouTubeIframeAPIReady"] = () => this.startVideo();
  }

  ngOnInit() {
    this.videoId = "nRiOw3qGYq4";
    this.init();
  }

  startVideo() {
    this.reframed = false;
    this.player = new window["YT"].Player("player", {
      videoId: this.videoId,
      playerVars: this.playerVars,
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this)
      }
    });
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event) {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
  onPlayerStateChange(event) {
    console.log(event);
    switch (event.data) {
      case window["YT"].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log("started " + this.cleanTime());
        } else {
          console.log("playing " + this.cleanTime());
        }
        break;
      case window["YT"].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log("paused" + " @ " + this.cleanTime());
        }
        break;
      case window["YT"].PlayerState.ENDED:
        console.log("ended ");
        break;
    }
  }

  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log("" + this.videoId);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  play($event) {
    console.log("Play button is clicked!", $event);

    if (this.player) {
      this.player.playVideo();
    }
  }

  pause($event) {
    console.log("Pause button is clicked!", $event);
    if (this.player) {
      this.player.pauseVideo();
    }
  }

  setPlaybackRate($event) {
    console.log("setPlaybackRate button is clicked!", $event);
  }
}
