import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
  imports: [ReactiveFormsModule, RouterModule],
})
export class CadastroUsuarioComponent {
  
  meuFormulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.meuFormulario = this.formBuilder.group({
      usr_name: ['', Validators.required],
      usr_nickname: ['', [Validators.required]],
      usr_psw: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.meuFormulario.valid) {
      const formData = this.meuFormulario.value; // Obtenha os dados do formulário
    
      this.apiService.addNewUser(formData).subscribe(
        (response) => {
          if(response.status == 'success'){
            alert(response.message);
            this.router.navigate(['/']);
          }else{

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
