import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';
import { UserData } from 'src/app/user-data/user-data';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import {
  interval,
  map,
  tap,
  timer,
  delay,
  debounceTime,
  filter,
  fromEvent,
} from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  dataSource: UserData = new UserData();
  displayedColumns: string[] = [];
  pageEvent: PageEvent = new PageEvent();
  tableSize: number = 25;
  pageNumber: number = 0;
  searchBy_List: any = ['Name', 'Email', 'Phone', 'Address'];
  searchCondition: string = 'Name';
  serverFilterText: string = '';
  @ViewChild('_filterText', { static: true }) _filterText!: ElementRef;
  apiResponse: any;
  isSearching!: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    public snackBar: MatSnackBar,
    public filterPipe: FilterPipe
  ) {}

  ngOnInit() {
    // this.userList();
    this.onPaginateChange();
    this.displayedColumns = [
      'id',
      'name',
      'email',
      'phone',
      'address',
      'actions',
    ];
  }

  ngAfterViewInit() {
    fromEvent(this._filterText.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter((res) => res.length > 2 || res.length == 0),
        debounceTime(300)
      )
      .subscribe((text: string) => {
        this.isSearching = true;
        this.applyServerSideFilter(text);
      });
  }

  applyServerSideFilter(serverFilterText: string) {
    this.serverFilterText = serverFilterText;
    this.userService
      .paginationWithFiltered(
        this.tableSize,
        0,
        this.searchCondition,
        serverFilterText
      )
      .pipe(
        tap((users) => this.setUsers(users.content)),
        map((userData: UserData) => (this.dataSource = userData))
      )
      .subscribe();
  }

  applyPagination() {
    this.userService
      .pagination(this.tableSize, this.pageNumber)
      .pipe(
        tap((users) => this.setUsers(users.content)),
        map((userData: UserData) => (this.dataSource = userData))
      )
      .subscribe();
  }

  // applyServerSideFilter(_serverFilterText: string) {
  //   this.serverFilterText = _serverFilterText;
  //   let textLen = this.serverFilterText.length;
  //   if (this.serverFilterText != '' && textLen >= 3) {
  //     this.userService
  //       .paginationWithFiltered(
  //         this.tableSize,
  //         0,
  //         this.searchCondition,
  //         _serverFilterText
  //       )
  //       .pipe(
  //         tap((users) => this.setUsers(users.content)),
  //         delay(300),
  //         map((userData: UserData) => (this.dataSource = userData))
  //       )
  //       .subscribe();
  //   } else if (this.serverFilterText != '' && textLen < 3) {
  //   } else {
  //     this.userService
  //       .pagination(this.tableSize, this.pageNumber)
  //       .pipe(
  //         tap((users) => this.setUsers(users.content)),
  //         map((userData: UserData) => (this.dataSource = userData))
  //       )
  //       .subscribe();
  //   }
  // }

  onPaginateChange(event?: PageEvent) {
    if (event) {
      this.pageNumber = event.pageIndex;
      this.tableSize = event.pageSize;
      this.applyPagination();
    } else {
      this.applyPagination();
    }
  }

  deleteUser(id: number, message: string, action: string) {
    this.userService
      .deleteUser(id)
      .subscribe((result) => this.onPaginateChange());
    this.openSnackBar(message, action);
  }

  editUser(id: number) {
    this.router.navigate(['/edituser/' + id]);
  }

  setUsers(content: any) {
    this.users = content;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
