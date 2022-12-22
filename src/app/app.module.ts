import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form/user-form.component';
import { UserService } from './service/user-service.service';
import { FilterPipe } from './pipe/filter.pipe';
import { NgxPaginationModule, PaginationService } from 'ngx-pagination';
import { EditUserComponent } from './edit-user/edit-user/edit-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule }   from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminAuthComponent } from './admin-auth/admin-auth/admin-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    FilterPipe,
    EditUserComponent,
    AdminAuthComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    NgxPaginationModule, 
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatPaginatorModule
  ],
  providers: [UserService, FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
