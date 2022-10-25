import { Component } from '@angular/core';
import { NbDialogRef, NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'do-dialog-icon',
  templateUrl: 'dialog-icon.component.html',
  styleUrls: ['dialog-icon.component.scss'],
})
export class DialogIconComponent {

  public evaIcons: any[] = [];

  constructor(protected ref: NbDialogRef<DialogIconComponent>, iconsLibrary: NbIconLibraries) {
    this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
      .filter(icon => icon.indexOf('outline') !== -1);
  }

  choose(icon: string): void {
    this.ref.close(icon);
  }
}
