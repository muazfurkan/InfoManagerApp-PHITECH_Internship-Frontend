import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Admin } from 'src/app/admin/admin';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {

  admin!: Admin;
  nameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }

  addAdmin(_username: string, _password: string){
    this.admin.name = _username;
    this.admin.password = _password;
  }

}
