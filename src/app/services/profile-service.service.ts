import { Injectable } from '@angular/core';
import {Client} from '../client-class/client';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MyRepo} from '../myRepo-Class/my-repo';
import { RepoHolder } from '../repo-holder';



@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  client : Client;
  myRepo : MyRepo
  repoHolder : RepoHolder

  private username:string;
  private reponame:string;

  constructor(private http:HttpClient) {

    this.username = "Vohsty";
    this.reponame = "pig-dice";
    this.client = new Client("","","","","", 0, 0, 0, 0, 0);
    this.myRepo = new MyRepo([]);
    this.repoHolder = new RepoHolder("","","","");
   }

   getUserData(){

    interface ApiResponse{
        avatar_url: string;
        login:string;
        url:string;
        name:string;
        bio:string;
        followers:number;
        following:number;
        public_repos:number;
        created_at:number;
        
    }
    let promise =new Promise((resolve,reject)=>{
        this.http.get<ApiResponse>( 'https://api.github.com/users/' + this.username +'?access_token=' + environment.apiKey).toPromise().then(response=>{

            this.client.avatarimg=response.avatar_url;
            this.client.user=response.login;
            this.client.owner=response.name;
            this.client.email=response.url;
            this.client.bio=response.bio;
            this.client.followers=response.followers;
            this.client.following=response.following;
            this.client.noOfrepos=response.public_repos;
            this.client.date=response.created_at;
            


            resolve()
        },
        error=>{
                this.client.avatarimg="Huna picha"
              
                reject(error)
            }
        )
    })

    return promise
  }

  getRepoData(){

  let promise =new Promise((resolve,reject)=>{
    this.http.get( 'https://api.github.com/users/' + this.username +'/repos?access_token=' + environment.apiKey).toPromise().then(response=>{

        this.myRepo.myRepoArray=response;

        resolve()
    },
    error=>{
            this.myRepo.myRepoArray=[];

            reject(error)
        }
    )
})

return promise
}

getRep(){

  interface Response{
      name: string;
      description:string;
      language:string;
      url:string;
  }
  let promise =new Promise((resolve,reject)=>{
      this.http.get<Response>( 'https://api.github.com/repos/' + this.username + '/' + this.reponame + '?access_token=' + environment.apiKey).toPromise().then(response=>{

          this.repoHolder.name=response.name;
          this.repoHolder.description=response.description;
          this.repoHolder.language=response.language;
          this.repoHolder.url=response.url;

          resolve()
      },
      error=>{
        this.repoHolder.name="Error";
        this.repoHolder.description="Error";
        this.repoHolder.language="Error";
        this.repoHolder.url="Error";

          reject(error)
          }
      )
  })

  return promise
}
userSearch(username:string) {
  this.username = username;
  this.getUserData();
  this.getRepoData();
  this.getRep();
}

}
