import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userId: any;
  user: User;
  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  phoneControl = new FormControl('', [Validators.required]);
  addressControl = new FormControl('', [Validators.required]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.userId);
    this.userService.findById(this.userId).subscribe((data) => {
      this.user = data;
    });
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  updateUser(_name: string, _email: string, _phone: string, _address: string) {
    this.user.name = _name;
    this.user.email = _email;
    this.user.phone = _phone;
    this.user.address = _address;
  }

  onSubmit() {
    this.userService
      .editUser(this.userId, this.user)
      .subscribe((result) => this.gotoUserList());
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
