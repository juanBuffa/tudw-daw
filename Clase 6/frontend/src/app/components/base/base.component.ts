import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ToastModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {

}
