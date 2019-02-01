import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MessageService } from 'primeng/api';
import { HttpCallsService } from '../../http-calls.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  userid: any;
  email: any;
  password: any;
  constructor(private routeend: ActivatedRoute, private httpservice: HttpCallsService,  private router: Router,
    private messageService: MessageService) {
  }

  ngOnInit() {
    if (this.routeend.snapshot.paramMap.get('userId')) {
      this.userid = this.routeend.snapshot.paramMap.get('userId');
      this.httpservice.verificationemail(this.userid).subscribe(
        data => {
          this.messageService.add({
            key: 'emver',
            severity: 'info',
            summary: 'email verified',
            detail: 'email hasbeen verified'
          });
        },
        err => {
          this.messageService.add({
            key: 'emer',
            severity: 'error',
            summary: 'email verification failed',
            detail: 'email can not be verified, check your email'
          });
        }
      );
    }
  }

  /**
   * goToSignUp
   */

  public goToSignUp() {
    this.router.navigate(['/register']);

  }

  /**
   * login
   */
  public login() {
    let promise: Promise<string> | Promise<never>;

    if (!this.email) {
      this.messageService.add({
        key: 'em',
        severity: 'warn',
        summary: 'email missing',
        detail: 'input email'
      });

    } else if (!this.password) {
      this.messageService.add({
        key: 'pass',
        severity: 'warn',
        summary: 'password missing',
        detail: 'input password'
      });
    } else {
      const loginInfo = {
        email: this.email,
        password: this.password
      };
      this.httpservice.loginmethod(loginInfo).subscribe(
        data => {

          if (data.status === 200) {

            this.messageService.add({
              key: 'log',
              severity: 'info',
              summary: 'Login done',
              detail: 'Login has been done and app is accessing your info from the server'
            });

            const date = new Date();
            const days = -1;
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

            // saving authtoken, userid and name as cookies
            Cookie.set('authToken', data.data.authToken, date['toGMTString']());
            Cookie.set('receiverId', data.data.userDetails.userId, date['toGMTString']());
            Cookie.set('receiverName', data.data.userDetails.firstName + ' ' + data.data.userDetails.lastName, date['toGMTString']());
            // saving user details in localstorage
            this.httpservice.setdatatoLocalStorage(data.data.userDetails);

            // shooting the users to the personal dashboard page
            promise = Promise.resolve(data.data.userDetails.firstName + '_' + data.data.userDetails.lastName);
          } else {
            this.messageService.add({
              key: 'logf',
              severity: 'error',
              summary: 'Login failed',
              detail: data.message
            });
            promise = Promise.reject('login failed');
          } // end condition

          promise.then(data1 => {
            setTimeout(() => {
              this.router.navigate([`/dashboard/${data1}`]);
            }, 2000);
          })
            .catch(err => {
              console.log('check');
            });
        },
        err => {
          console.log('check');
          this.messageService.add({
            key: 'logfserver',
            severity: 'error',
            summary: 'Login failed',
            detail: 'Could not login'
          });
        }
      );


    }

  } // login function ends


}
