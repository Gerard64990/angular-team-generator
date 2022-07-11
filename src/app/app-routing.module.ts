import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListEditComponent } from './player-list-edit/player-list-edit.component';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
  { path: 'edit', component: PlayerListEditComponent },
  { path: '', component: PlayerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
