// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ContatoService } from '../../services/contato.service';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// import { HttpClient } from '@angular/common/http';
// import { NgxMaskDirective } from 'ngx-mask';

// @Component({
//   selector: 'app-cadastrar',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule,
//     NgxMaskDirective],
//   templateUrl: './cadastrar.component.html',
//   styleUrl: './cadastrar.component.css'
// })
// export class CadastrarComponent implements OnInit {
//   contato = {
//     contatoNome: '',
//     contatoEmail: '',
//     contatoCelular: '',
//     contatoTelefone: '',
//     contatoSnFavorito: '',
//     contatoSnAtivo:'',
//       contatoDhCad: Date
    
//   };
//   mensagemErro: string = '';
//   editando: boolean = false;
 
//   constructor(private contatoService: ContatoService, 

//     private router: Router,
//     private route: ActivatedRoute,
//   private http: HttpClient) {}


//   ngOnInit(): void {
  
//     }
//   }
//     voltar() {
//       this.router.navigate(['/']);
//     }



  
  
//   carregarEmpresa(id: number) {
//     this.empresaService.getEmpresaById(id).subscribe({
//       next: (data) => {
//         console.log(data); // Verifique a resposta da API aqui
//         this. empresa = {          
//           cnpj: this.formatarCnpj(data.cnpj),
//           nomeFantasia:data.nomeFantasia,
//           cep:this.formatarCep(data.cep) ,
//           cidade:data.cidade,
//           uf: data.estado,
//           fornecedorIds: data.fornecedores.map((e: any) => e.id)
               
//         };
//         this.cidadeUfVisivel = true;
//       },
//       error: () => {
//         alert('Erro ao carregar fornecedor para edição.');
//         this.router.navigate(['/empresas']);
//       }
//     });
//   }
//   cadastrar(): void {
//     this.mensagemErro = '';
   
   
//     const requisicao = this.editando && this.empresaId
//     ? this.empresaService.atualizarEmpresa(this.empresaId, this.empresa)
//     : this.empresaService.criarEmpresa(this.empresa);

//     requisicao.subscribe({
//       next: () => {
//         //  alert(`Fornecedor ${this.editando ? 'atualizado' : 'cadastrado'} com sucesso!`);
//           this.router.navigate(['/empresas']);
//         },
//         error: (erro) => {
//           console.error(`Erro ao ${this.editando ? 'atualizar' : 'cadastrar'} fornecedor:`, erro);
        
//           const mensagens: string[] = [];
        
//           const erroOriginal = erro.error;
        
//           if (erroOriginal) {
//             if (typeof erroOriginal === 'string') {
//               mensagens.push(erroOriginal);
//             } else if (erroOriginal.erro) {
//               mensagens.push(erroOriginal.erro); // 👈 pega exatamente esse caso
//             } else if (erroOriginal.message) {
//               mensagens.push(erroOriginal.message);
//             } else if (Array.isArray(erroOriginal)) {
//               mensagens.push(...erroOriginal);
//             } else {
//               Object.values(erroOriginal).forEach(msg => {
//                 if (Array.isArray(msg)) {
//                   mensagens.push(...msg);
//                 } else {
//                   mensagens.push(String(msg));
//                 }
//               });
//             }
//           } else {
//             mensagens.push('Erro ao conectar com o servidor.');
//           }
        
//           alert(mensagens.join('\n'));
//         }
      
        
//       });
//     }
    

//   formatarCep(cep: string): string {
//     if (!cep) return ''; // Retorna uma string vazia se o CEP for nulo ou indefinido
//     const num = cep.replace(/\D/g, '');
//     return num.length === 8 ? num.replace(/(\d{5})(\d{3})/, '$1-$2') : cep;
//   }
//   formatarCnpj(cnpj: string): string {
//     if (!cnpj) return ''; // Retorna uma string vazia se o CNPJ for nulo ou indefinido
//     const num = cnpj.replace(/\D/g, '');
//     return num.length === 14
//       ? num.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
//       : cnpj;
//   }
// }