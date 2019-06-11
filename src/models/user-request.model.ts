import {User} from "./user-details.model";
export interface UserRequest {
  name: string;
  job: string;
}

export interface UserOrderChangeRequest {
  data: User[];
}
