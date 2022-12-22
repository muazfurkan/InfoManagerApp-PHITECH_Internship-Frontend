import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';
import { UserData } from 'src/app/user-data/user-data';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { interval, map, tap, timer, delay} from 'rxjs';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  users: User[] = [];
  dataSource: UserData = new UserData;
  displayedColumns: string[] = [];
  pageEvent: PageEvent = new PageEvent;
  tableSize: number = 25;
  pageNumber: number  = 0;
  searchBy_List: any = ['Name', 'Email', 'Phone', 'Address'];
  searchCondition: string = 'Name';
  serverFilterText: string = "";

  constructor(private userService: UserService,
    private router: Router,
    public snackBar: MatSnackBar,
    public filterPipe: FilterPipe) {
  }

  ngOnInit() {
    // this.userList();
    this.onPaginateChange();
    this.displayedColumns = ['id', 'name', 'email', 'phone', 'address', 'actions'];
  }
  setUsers(content: any){
    this.users = content;
  }

  applyServerSideFilter(_serverFilterText: string){
    this.serverFilterText = _serverFilterText
    let textLen = this.serverFilterText.length
    if(this.serverFilterText!="" && textLen>=3){
      this.userService.paginationWithFiltered(this.tableSize, 0, this.searchCondition, _serverFilterText).pipe(
        tap(users => this.setUsers(users.content)),
        // delay(300),
        map((userData: UserData) => this.dataSource = userData)
      ).subscribe()
    }
    else if(this.serverFilterText!="" && textLen<3){}
    else{
      this.userService.pagination(this.tableSize, this.pageNumber).pipe(
        tap(users => this.setUsers(users.content)),
        map((userData: UserData) => this.dataSource = userData)).subscribe();
    }
  }
  
  onPaginateChange(event?: PageEvent){
    if(event){
      this.pageNumber = event.pageIndex;
      this.tableSize = event.pageSize;
      this.applyServerSideFilter(this.serverFilterText);
    }else{
      this.applyServerSideFilter(this.serverFilterText);
    }

  }

  deleteUser(id: number, message: string, action: string){
    // this.userService.deleteUser(id).subscribe(result => this.userList());
    this.userService.deleteUser(id).subscribe(result => this.onPaginateChange());
    this.openSnackBar(message, action);
  }

  editUser(id: number){
    this.router.navigate(['/edituser/' + id]);
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}