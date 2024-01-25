// src/app/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CadastroUsuarioComponent } from '../cadastro-usuario/cadastro-usuario.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CadastroUsuarioComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  meuFormulario: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.meuFormulario = this.formBuilder.group({
      usr_nickname: ['', Validators.required],
      usr_psw: ['', [Validators.required]]
    });
  }
  

  onSubmit() {
    if (this.meuFormulario.valid) {
      const formData = this.meuFormulario.value; // Obtenha os dados do formulário
    
      this.apiService.doLogin(formData).subscribe(
        (response) => {
          if(response.status == 'success'){
            this.router.navigate(['/listarEventos', response.id ]);
          }else{
            alert(response.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('Formulário inválido, todos os campos são obrigatórios');
    }
  }
}
