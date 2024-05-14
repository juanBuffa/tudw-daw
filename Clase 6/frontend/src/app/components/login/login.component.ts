import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RolesEnum } from '../../enums/roles.enum';

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, ToastModule],
})
export class LoginComponent {
  form = new FormGroup({
    nombreUsuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
  });

  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  login() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Debe ingresar todos los campos',
      });
      return;
    }
    const formValue = this.form.getRawValue();
    this.authService
      .login(formValue.nombreUsuario!, formValue.clave!)
      .subscribe({
        next: (res) => {
          this.authService.setSession(res.token);
          if (this.authService.hasRole(RolesEnum.ADMINISTRADOR)) {
            this.router.navigateByUrl('admin');
          } else {
            this.router.navigateByUrl('');
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al autenticar. Verifique el usuario y la clave',
          });
        },
      });
  }
}
