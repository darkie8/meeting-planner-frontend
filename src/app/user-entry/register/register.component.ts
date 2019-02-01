import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../../http-calls.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  repass: any;

  constructor(private httpService: HttpCallsService, private router: Router,
    private messageService: MessageService) { }

  // declaring variables for registering functionality
  public firstName: any;
  public lastName: any;
  public countryCode: any;
  public mobileNo: any;
  public email: any;
  public password: any;
  public countries: any;
  public countriesSc: any;
  public selected = 'India';
  ngOnInit() {
     this.httpService.getCountryName().subscribe(
      res => {

        this.countries = Object.values(res['data']);
        this.countriesSc = Object.keys(res['data']);
      },
      err => { }
    );
    
  }
/**
 * change
 */
public codeChange() {
  if (this.countries.indexOf(this.selected)) {
    let zingo = this.countriesSc[this.countries.indexOf(this.selected)];
    this.httpService.getCountryCode(zingo).subscribe(

      res1 => {
        this.countryCode = res1['data'];
      },
      err => { }
    );
  }
}
  // go to login page
  goToLogin = (): void => {
    this.router.navigate(['/login']);
  }
  // login function ends

  goToerrorBrokenErrorPage = (): void => {
    this.router.navigate(['/error404']);
  }
  goToerrorServerErrorPage = (): void => {
    this.router.navigate(['/error500']);
  }
  // registering user

  signUp = (): any => {
    if (!this.firstName) {

      this.messageService.add({
        key: 'firstName',
        severity: 'warn',
        summary: 'Firstname is missing',
        detail: 'Input Firstname'
      });
    } else if (!this.lastName) {
      this.messageService.add({
        key: 'lastName',
        severity: 'warn',
        summary: 'Lastname is missing',
        detail: 'Input Lastname'
      });
    } else if (!this.mobileNo) {
      this.messageService.add({
        key: 'mobileNo',
        severity: 'warn',
        summary: 'Phone No. is missing',
        detail: 'Input Mobile No'
      });
    } else if (!this.countryCode) {
      this.messageService.add({
        key: 'countryCode',
        severity: 'warn',
        summary: 'Country code is missing',
        detail: 'Select country code'
      });

    } else if (!this.email) {
      this.messageService.add({
        key: 'email',
        severity: 'warn',
        summary: 'Email is missing',
        detail: 'Input email'
      });

    } else if (!this.password) {
      this.messageService.add({
        key: 'password',
        severity: 'warn',
        summary: 'Password missing',
        detail: 'Input Password'
      });
    } else if (this.password !== this.repass) {
      this.messageService.add({
        key: 'repassword',
        severity: 'warn',
        summary: 'repass missing',
        detail: 'Input password again'
      });
    } else {

      // saving input infos
      const registering_data = {
        firstName: this.firstName,
        lastName: this.lastName,
        countryCode: this.countryCode,
        mobile: this.mobileNo,
        email: this.email,
        password: this.repass
      };

      // calling registering method
      this.httpService.registeringMethod(registering_data).subscribe(
        res => {
          // if the status comes with 200 status code
          if (res.status === 200) {
            this.messageService.add({
              key: 'emailsent',
              severity: 'info',
              summary: 'An Email has benn sent'
            });

            // redirecting to login page
            setTimeout(() => {
              this.goToLogin();
            }, 1500);
          } else {
            // if server has problems
            this.messageService.add({
              key: 'errServer',
              severity: 'error',
              summary: 'Error in server',
              detail: res.message
            });

            // http 500 problem navigatong to 500 error page
            setTimeout(() => {
              this.goToerrorServerErrorPage();
            }, 1500);
          }

        },
        err => {
          this.messageService.add({
            key: 'regno',
            severity: 'warn',
            summary: 'can not be registered',
            detail: 'can not be registered ;internal problem'
          });

          // http 404 error navigating to 404 error page
          setTimeout(() => {
            this.goToerrorBrokenErrorPage();
          }, 1500);
        }
      );
    }

  }
  // function ends of registering

}
