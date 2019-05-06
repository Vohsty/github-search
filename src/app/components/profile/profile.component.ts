import { Component, OnInit } from '@angular/core';
import {Client} from '../../client-class/client';
import {ProfileServiceService} from '../../services/profile-service.service'
import {MyRepo} from '../../myRepo-Class/my-repo';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers:[ProfileServiceService],
  styleUrls: ['./profile.component.css'],
  
})

export class ProfileComponent implements OnInit {
  
  profile:any[];
  client:Client;
  myRepo : MyRepo
  username: string;

  constructor( private profileServiceService:ProfileServiceService) { 
    this.profileServiceService.getUserData()
    this.client = profileServiceService.client


    this.profileServiceService.getRepoData()
    this.myRepo = profileServiceService.myRepo

  }

  userSearch() {
    this.profileServiceService.userSearch(this.username);
  }

  ngOnInit() {
  }

}
