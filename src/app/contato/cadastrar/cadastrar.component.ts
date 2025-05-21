import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContatoService } from '../../services/contato.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { NgxMaskDirective } from 'ngx-mask';
import { capitalizarNome,formatarContatoCelular,formatarContatoTeleFone } from '../../shared/utils/utils';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,
    NgxMaskDirective],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent implements OnInit {
  contato = {
    contatoNome: '',
    contatoEmail: '',
    contatoCelular: '',
    contatoTelefone: '',
   contatoSnFavorito: 'N',
  contatoSnAtivo: 'S',
      // contatoDhCad: Date
    
  };
  mensagemErro: string = '';
  editando: boolean = false;
 contatoId: number | null = null;
  constructor(private contatoService: ContatoService, 

    private router: Router,
    private route: ActivatedRoute,
  private http: HttpClient) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
if(id){
  this.editando=true;
  this.contatoId=+id;
  this.carregarContato(this.contatoId);
}
    })
  }
    voltar() {
      this.router.navigate(['/contatos']);
    }



  
  
  carregarContato(id: number) {
    this.contatoService.getContatoById(id).subscribe({
      next: (data) => {
        console.log(data); // Verifique a resposta da API aqui
        this.contato = {          
          contatoNome:this.capitalizarNome(data.contatoNome),
         contatoEmail:data.contatoEmail,
         contatoCelular:this.formatarContatoCelular(data.contatoCelular),
         contatoTelefone:this.formatarContatoTeleFone(data.contatoTelefone),
          contatoSnFavorito: data.contatoSnFavorito || 'N',
        contatoSnAtivo: data.contatoSnAtivo || 'S'
      
               
        };
          },
      error: () => {
        alert('Erro ao carregar fornecedor para edição.');
        this.router.navigate(['/']);
      }
    });
  }
  cadastrar(): void {
    this.mensagemErro = '';
   
   
    const requisicao = this.editando && this.contatoId
    ? this.contatoService.atualizarContato(this.contatoId, this.contato)
    : this.contatoService.criaContato(this.contato);

    requisicao.subscribe({
      next: () => {
        //  alert(`Fornecedor ${this.editando ? 'atualizado' : 'cadastrado'} com sucesso!`);
          this.router.navigate(['/']);
        },
        error: (erro) => {
          console.error(`Erro ao ${this.editando ? 'atualizar' : 'cadastrar'} `, erro);
        
          const mensagens: string[] = [];
        
          const erroOriginal = erro.error;
        
          if (erroOriginal) {
            if (typeof erroOriginal === 'string') {
              mensagens.push(erroOriginal);
            } else if (erroOriginal.erro) {
              mensagens.push(erroOriginal.erro); // 👈 pega exatamente esse caso
            } else if (erroOriginal.message) {
              mensagens.push(erroOriginal.message);
            } else if (Array.isArray(erroOriginal)) {
              mensagens.push(...erroOriginal);
            } else {
              Object.values(erroOriginal).forEach(msg => {
                if (Array.isArray(msg)) {
                  mensagens.push(...msg);
                } else {
                  mensagens.push(String(msg));
                }
              });
            }
          } else {
            mensagens.push('Erro ao conectar com o servidor.');
          }
        
          alert(mensagens.join('\n'));
        }
      
        
      });
    }
      formatarData(contatoDhCad: string): string {
    return new Date(contatoDhCad).toLocaleDateString('pt-BR');
  }
 capitalizarNome(contatoNome: string): string {
    return capitalizarNome(contatoNome); // Chama a função importada
  }
    formatarContatoCelular(contatoCelular: string): string {
    return formatarContatoCelular(contatoCelular); // Chama a função importada
  }
      formatarContatoTeleFone(contatoTelefone:string): string {
    return formatarContatoTeleFone(contatoTelefone); // Chama a função importada
  }
}