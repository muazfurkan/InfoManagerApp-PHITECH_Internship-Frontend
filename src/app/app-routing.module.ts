import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form/user-form.component';
import { EditUserComponent } from './edit-user/edit-user/edit-user.component';
import { AdminAuthComponent } from './admin-auth/admin-auth/admin-auth.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'adduser', component: UserFormComponent },
  { path: 'edituser/:id', component: EditUserComponent },
  { path: 'login', component: AdminAuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
