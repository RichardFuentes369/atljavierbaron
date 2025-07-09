import { Component, Renderer2, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  constructor(private renderer: Renderer2, private translate: TranslateService,) {}

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
  }

  ngOnInit(event:any) {
  }

}
