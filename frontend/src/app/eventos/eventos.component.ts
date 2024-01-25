import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit {
  userId: string = '';
  eventos: any[] = [];
  eventosConvidados: any[] = [];
  eventosConfirmados: any[] = [];
  flagNovoEvento: boolean = false;
  flagListagem: boolean = true;
  flagAlterarEvento: boolean = false;
  flagconvidarUsuario: boolean = false;
  meuFormulario: FormGroup;
  meuFormularioAlteracao: FormGroup;
  meuFormularioConvidar: FormGroup;
  eventoAlteracao: any = '';
  usuarios: any[] = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private apiService: ApiService, private router: Router) { 
    this.meuFormulario = this.formBuilder.group({
      evt_desc: ['', Validators.required],
      evt_start: ['', [Validators.required]],
      evt_end: ['', [Validators.required]],
      evt_usr: [''] 
    });

    this.meuFormularioAlteracao = this.formBuilder.group({
      evt_desc: ['', Validators.required],
      evt_start: ['', [Validators.required]],
      evt_end: ['', [Validators.required]],
      evt_usr: [''],
      evt_id: [''] 
    });

    this.meuFormularioConvidar = this.formBuilder.group({
      evt_id: [''], 
      invite_user_id: [''],
      evt_usr: [''] 
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.meuFormulario.get('evt_usr')?.setValue(this.userId);
      this.meuFormularioAlteracao.get('evt_usr')?.setValue(this.userId);
      this.apiService.getAllEvents(this.userId).subscribe(
        (response) => {
          if(response.status == 'success'){
            this.eventos = Object.values(response.body);
          }
        },
        (error) => {
          console.log(error);
        }
      );
      this.apiService.getInvites(this.userId).subscribe(
        (response) => {
          if(response.status == 'success'){
            this.eventosConvidados = Object.values(response.body);
          }
        },
        (error) => {
          console.log(error);
        }
      )
      this.apiService.aceptedEvents(this.userId).subscribe(
        (response) => {
          if(response.status == 'success'){
            console.log(response.body)
            this.eventosConfirmados = Object.values(response.body);
          }
        },
        (error) => {
          console.log(error);
        }
      )
    });
  }

  adicionarEvento(){
    this.flagNovoEvento = true;
    this.flagListagem = false
  }

  fecharForm(){
    this.flagNovoEvento = false;
    this.flagListagem = true
    this.flagAlterarEvento = false;
    this.flagconvidarUsuario = false;
  }

  sair(){
    this.router.navigate(['/']);
  }

  excluirEvento(id: any){
    if(confirm("Deseja excluir esse evento?")){
      this.apiService.deleteEvent(id).subscribe(
        (response) => {
            alert(response.mensagem);
            window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  alterarEvento(id: any){
    this.flagNovoEvento = false;
    this.flagListagem = false
    this.flagAlterarEvento = true;
    this.apiService.findEventById(id).subscribe(
      (response) => {
        if(response.status == 'success'){
          this.eventoAlteracao = response.body;
          this.meuFormularioAlteracao.get('evt_usr')?.setValue(this.userId);
          this.meuFormularioAlteracao.get('evt_desc')?.setValue(this.eventoAlteracao.evt_desc);
          this.meuFormularioAlteracao.get('evt_start')?.setValue(this.eventoAlteracao.evt_start);
          this.meuFormularioAlteracao.get('evt_end')?.setValue(this.eventoAlteracao.evt_end);
          this.meuFormularioAlteracao.get('evt_id')?.setValue(this.eventoAlteracao.evt_id);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onSubmit() {
    if (this.meuFormulario.valid) {
      const formData = this.meuFormulario.value; 
      this.apiService.addNewEvent(formData).subscribe(
        (response) => {
          if(response.status == 'success'){
            alert(response.message);
            window.location.reload();
          }else{
            alert(response.message);
            this.fecharForm();
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

  onChange(){
    const formData = this.meuFormularioAlteracao.value; 
    this.apiService.alteraEvento(formData).subscribe(
      (response) => {
        if(response.status == 'success'){
          alert(response.message);
          window.location.reload();
        }else{
          alert(response.message);
          this.fecharForm();
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  inviteForm(id: any){
    this.flagListagem = false;
    this.flagconvidarUsuario = true;

    this.apiService.getAllUsers(this.userId).subscribe(
      (response) => {
        if(response.status == 'success'){
          console.log(response.body);
          this.usuarios = Object.values(response.body);
          this.meuFormularioConvidar.get('evt_usr')?.setValue(this.userId);
          this.meuFormularioConvidar.get('evt_id')?.setValue(id);
        }
      },
      (error) => {
        console.log(error);
      }
    )


  }
  
  onInvite(){
    const formData = this.meuFormularioConvidar.value; 
    this.apiService.sendInvite(formData).subscribe(
      (response) => {
        if(response.status == 'success'){
          alert(response.message);
          window.location.reload();
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  aceitarConvite(id: any){
    const corpoRequisicao = {
      'id': id
    };
    this.apiService.acceptInvite(corpoRequisicao).subscribe(
      (response) => {
        if(response.status == 'success'){
          alert(response.message);
          window.location.reload();
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  rejeitarConvite(id: any){
    const corpoRequisicao = {
      'id': id
    };
    this.apiService.rejectInvite(corpoRequisicao).subscribe(
      (response) => {
        if(response.status == 'success'){
          alert(response.message);
          window.location.reload();
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
