import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router'
import { ProfileComponent } from '../components/profile/profile.component';
import { RepositoriesComponent } from '../components/repositories/repositories.component';

const routes: Routes = [
  {path:'',
  component:ProfileComponent,
    },

  {path:'repos',
  component:RepositoriesComponent, 
    },
    {path:'profile',
  component:ProfileComponent, 
    },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule],
})
export class RoutingModule { }
