import {Injectable} from "@angular/core";
import {Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {MatSpinner} from "@angular/material";
import {ComponentPortal} from "@angular/cdk/portal";
@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerRef: OverlayRef = this.cdkSpinnerCreate();

  constructor(
    private overlay: Overlay,
  ) {

  }

  cdkSpinnerCreate() {
    return this.overlay.create(<OverlayConfig> {
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
  }

  showSpinner() {
    this.spinnerRef.attach(new ComponentPortal(MatSpinner));
  }
  stopSpinner() {
    this.spinnerRef.detach();
  }
}