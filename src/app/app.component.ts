import { Component } from '@angular/core';
import {UserService} from '../services/user.services';
import {UserList} from '../models/user-list.model';
import {User} from '../models/user-details.model';
import {HttpResponse} from '@angular/common/http';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {SpinnerService} from '../services/spinner.service';
import {UserOrderChangeRequest, UserRequest} from '../models/user-request.model';
import {UserResponse} from '../models/user-response.model';
import {ToastService} from '../services/toast.service';
import {DatePipe} from '@angular/common';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})


export class AppComponent {
  title = 'joineight-mockup';
  isSmallScreen = false;
  userList: UserList;
  userDetails: User;
  clickedUserId = 0;
  showSpinner = false;
  showAddForm = false;
  inputName: string;
  inputJob: string;
  addUserForm: FormGroup;

  userArray: User[];
  currentPage = 1;
  totalPage: number;
  totalCount: number;
  perPageCount = 3;
  constructor(
    private userService: UserService,
    private bpObserver: BreakpointObserver,
    private spinner: SpinnerService,
    private toast: ToastService,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.addUserForm = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      name : ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      job :  ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
    });
  }

  ngOnInit() {
    this.bpObserver
      .observe(['(min-width: 840px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 600px or over!');
          this.isSmallScreen = false;
        } else {
          console.log('Viewport is getting smaller!');
          this.isSmallScreen = true;
        }
      });

    this.updateUserList(this.currentPage);
  }

  fetchUserDetails(id) {
    this.spinner.showSpinner();
    this.userService.getUser(id)
      .subscribe( (resp: HttpResponse<any>) => {
        console.debug(resp);
        this.spinner.stopSpinner();
        try {
          if (resp.status !== 200) {
            throw new Error(`Error in getUser:app.component.ts => Status Code ${resp.status}, User id: ${id}`);
          } else {
            this.userDetails = resp.body.data;
          }
        } catch (e) {
          console.error(e.message);
        }
      },
        error => {
          this.spinner.stopSpinner();
          console.log(`Error in getUser:app.component.ts => ${error}`);
        }
      );
  }

  closeUserDetails() {
    this.userDetails = {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      avatar: ''
    };
  }

  updateUserList(pageNo) {
    this.currentPage = pageNo;
    this.spinner.showSpinner();
    this.userService.getUserList(this.currentPage)
      .subscribe( (resp: HttpResponse<UserList>) => {
          console.debug(resp);
          this.spinner.stopSpinner();
          try {
            if (resp.status !== 200) {
              throw new Error(`Error in getUserList:app.component.ts => Status Code = ${resp.status}, Page No = ${this.currentPage}`);
            } else {

              this.userList = resp.body;
              this.currentPage = this.userList.page;
              this.totalPage = this.userList.total_pages;
              this.totalCount = this.userList.total;
              this.perPageCount = this.userList.per_page;
              let startOrder = (this.currentPage - 1) * this.perPageCount;
              this.userArray = this.userList.data;
              this.userArray.forEach( e => {e.orderId = ++startOrder; });
              // console.log(this.userArray);
            }
          } catch (e) {
            console.error(e.message);
          }
        },
        error => {
          this.spinner.stopSpinner();
          console.log(`Error in getUserList:app.component.ts => ${error}`);
        }
      );
  }

  updateUser() {
    this.spinner.showSpinner();

    const userRequest: UserRequest = {
      name: 'Jon Doe',
      job: 'Sales'
    };

    this.userService.updateUser(userRequest, 1)
      .subscribe( (resp: HttpResponse<UserResponse>) => {
          console.debug(resp);
          this.spinner.stopSpinner();
          try {
            if (resp.status !== 200) {
              throw new Error(`Error in updateUser:app.component.ts => Status Code ${resp.status}, User Id: 1`);
            } else {
            //  Todo: display update Toast here
              this.toast.showToast(`Update Successful! User Id: 1, Update Time: ${this.datePipe.transform(resp.body.updatedAt,
                'mm:hh dd/MMM/yyyy')}`);
            }
          } catch (e) {
            console.error(e.message);
          }
        },
        error => {
          this.spinner.stopSpinner();
          console.log(`Error in updateUser:app.component.ts => ${error}`);
        }
      );
  }

  deleteUser() {
    this.spinner.showSpinner();
    this.userService.deleteUser(1)
      .subscribe( (resp: HttpResponse<UserResponse>) => {
          console.debug(resp);
          this.spinner.stopSpinner();
          try {
            if (resp.status !== 204) {
              throw new Error(`Error in deleteUser:app.component.ts => Status Code ${resp.status}, User Id: 1`);
            } else {
              //  Todo: display delete Toast here
              this.toast.showToast(`Delete Successful! User Id: 1`);
            }
          } catch (e) {
            console.error(e.message);
          }
        },
        error => {
          this.spinner.stopSpinner();
          console.log(`Error in deleteUser:app.component.ts => ${error}`);
        }
      );
  }

  addUser() {
    if (this.addUserForm.valid) {
      this.showAddForm = false;
      this.spinner.showSpinner();
      const newUser = {...this.addUserForm.value as UserRequest};

      this.userService.addUser(newUser)
        .subscribe( (resp: HttpResponse<UserResponse>) => {
            console.debug(resp);
            this.spinner.stopSpinner();
            try {
              if (resp.status !== 201) {
                throw new Error(`Error in addUser:app.component.ts => Status Code ${resp.status}`);
              } else {
                this.toast.showToast(`New User Added! User Id: ${resp.body.id}, Create time : ${this.datePipe.transform(resp.body.createdAt,
                  'mm:hh dd/MMM/yyyy')}`);
              }
            } catch (e) {
              console.error(e.message);
            }
          },
          error => {
            this.spinner.stopSpinner();
            console.log(`Error in deleteUser:app.component.ts => ${error}`);
          }
        );
    } else {
      this.toast.showToast('User Form Invalid!');
    }
  }

  dropEvent(event: CdkDragDrop<string[]>) {
    console.log(event);
    this.reOrderList(event.previousIndex, event.currentIndex, event.item.data);
    moveItemInArray(this.userArray, event.previousIndex, event.currentIndex);
  }

  reOrderList(prevIndex: number, currentIndex: number, movedUser: User) {
    const changedElements: UserOrderChangeRequest = {data: []};
    movedUser.orderId = (this.currentPage - 1) * this.perPageCount + (currentIndex + 1);
    changedElements.data.push(movedUser);

    // console.log(this.userArray);

    if ( prevIndex > currentIndex ) {
      console.log('move Upwards');
      for (let i = currentIndex; i < prevIndex; i++) {
        this.userArray[i].orderId++;
        changedElements.data.push(this.userArray[i]);
      }
    } else if (prevIndex < currentIndex) {
      console.log('move downwards');
      for (let i = currentIndex; i > prevIndex; i--) {
        this.userArray[i].orderId--;
        changedElements.data.push(this.userArray[i]);
      }
    } else {
      console.log('No Movement');
    }
    this.toast.showToast('Re-Ordering List. Please Check the console for data model.');
    console.log('Data with Updated Order Id to sent to AJAX Call');
    console.log(changedElements);
  }
}
