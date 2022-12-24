import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { Observable, map, catchError, throwError, debounceTime } from 'rxjs';
import { UserData } from '../user-data/user-data';

@Injectable()
export class UserService {
  private usersUrl: string;
  private filteredUsersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.filteredUsersUrl = 'http://localhost:8080/filtered';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public pagination(
    pageSize: number,
    currentPage: number
  ): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('currentPage', String(currentPage));
    params = params.append('pageSize', String(pageSize));
    return this.http
      .get<UserData>(this.usersUrl, { params })
      .pipe(map((userData: UserData) => userData));
  }

  public paginationWithFiltered(
    pageSize: number,
    currentPage: number,
    searchCondition: string,
    filterText: string
  ): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('pageNumber', String(currentPage));
    params = params.append('pageSize', String(pageSize));
    params = params.append('criteria', String(searchCondition.toLowerCase()));
    params = params.append('filterText', String(filterText));
    // if (filterText != '') {
    //   params = params.append('filterText', String(filterText));
    // }

    return this.http
      .get<UserData>(this.filteredUsersUrl, { params })
      .pipe(map((userData: UserData) => userData));
  }

  public findById(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/edituser/' + id);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl + '/adduser', user);
  }

  public deleteUser(id: number) {
    return this.http.delete<User>(this.usersUrl + '/delete/' + id);
  }

  public editUser(id: number, user: User) {
    return this.http.put<User>(this.usersUrl + '/edituser/' + id, user);
  }
}
