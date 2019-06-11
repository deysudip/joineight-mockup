import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";
@Injectable()
export class ToastService {

  constructor(
    private snackBar: MatSnackBar
  ) {

  }

  showToast(message, action = '', duartion:number = 3000) {
    this.snackBar.open(message, action, {duration: duartion});
  }
}
