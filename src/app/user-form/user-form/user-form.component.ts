import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent {

  user: User;
  // addUserForm: FormGroup;
  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  phoneControl = new FormControl('', [Validators.required]);
  addressControl = new FormControl('', [Validators.required]);
  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private userService: UserService,
        public snackBar: MatSnackBar) {
    this.user = new User();
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if(this.user.name && this.user.email){
      this.userService.save(this.user).subscribe(result => this.gotoUserList());
      this.openSnackBar('<<<<<<<<<<<<<<<<< User Added >>>>>>>>>>>>>>>>', '');
    }else if(!this.user.name){
      this.openSnackBar('<<<<<<<<<<<<<<< Name is required! >>>>>>>>>>>>>>', '');
    }else{
      this.openSnackBar('<<<<<<<<<<<<<<< Email is required! >>>>>>>>>>>>>>', '');
    }
  }

  setUser(_name: string, _email: string, _phone: string, _address:string){
    this.user.name = _name
    this.user.email = _email
    this.user.phone = _phone
    this.user.address = _address
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      
    });
  }

}