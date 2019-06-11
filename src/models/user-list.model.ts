import {User} from './user-details.model';
export interface UserList {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
