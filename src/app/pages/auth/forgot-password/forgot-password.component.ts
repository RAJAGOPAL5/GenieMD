import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  clinicID: any;

  constructor( private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router,
               private activatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required, , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      console.log('res', res);
      this.clinicID = res.clinicID || '1000202';
    });
  }
  get r() { return this.form.controls; }
  submit() {
    this.submitted = true;
    console.log('form', this.form.value.email);
    if (this.form.valid) {
      this.authService.forgetPassword(this.form.value.email).subscribe(res => {
        this.toastr.success('Forgot Password link has been sent to email successfully')
        this.router.navigate([`${this.clinicID}/login`]);
      }, error => {
        this.toastr.error('User Not Found');
      });
    }
  }

}
