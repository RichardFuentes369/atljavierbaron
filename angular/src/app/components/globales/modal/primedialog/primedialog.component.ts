import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-global-primedialog',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './primedialog.component.html',
  styleUrl: './primedialog.component.scss'
})
export class PrimedialogComponent {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
        this.visible = false;
    }
}
