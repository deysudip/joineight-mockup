import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {UserOrderChangeRequest, UserRequest} from '../models/user-request.model';
import {Observable} from 'rxjs/index';
import {User} from '../models/user-details.model';
import {UserList} from '../models/user-list.model';
import {
  CREATE_USER_URL, DELETE_USER_URL, GET_SINGLE_USER_URL, GET_USER_LIST_URL,
  UPDATE_USER_URL
} from '../constants/url.constant';
import {UserResponse} from '../models/user-response.model';
@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
  ) {

  }

  getUserList(pageNo: number): Observable<HttpResponse<UserList>> {
    return this.http.get<UserList>(GET_USER_LIST_URL + pageNo, {observe: 'response'});
  }

  getUser(id: number): Observable<HttpResponse<User>> {
    return this.http.get<User>(GET_SINGLE_USER_URL + id, {observe: 'response'});
  }

  addUser(data: UserRequest): Observable<HttpResponse<UserResponse>> {
    return this.http.post<UserResponse>(CREATE_USER_URL, data, {observe: 'response'});
  }

  updateUser(data: UserRequest, id: number): Observable<HttpResponse<UserResponse>> {
    return this.http.put<UserResponse>(UPDATE_USER_URL + id, data, {observe: 'response'});
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(DELETE_USER_URL + id, {observe: 'response'});
  }

  updateUserOrder(data: UserOrderChangeRequest) {

  }

}
