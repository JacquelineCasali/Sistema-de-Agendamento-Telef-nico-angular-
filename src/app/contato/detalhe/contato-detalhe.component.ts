import { Component, OnInit } from '@angular/core';

import { ContatoService  } from '../../services/contato.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { capitalizarNome,formatarContatoCelular,formatarContatoTeleFone } from '../../shared/utils/utils';


@Component({
  selector: 'app-contato-detalhe',
  standalone: true,
   imports: [CommonModule],
  templateUrl: './contato-detalhe.component.html',
  styleUrls: ['./contato-detalhe.component.css']
})
export class ContatoDetalheComponent implements OnInit {
  contato: any;
  
  paginaAtual = 1;
  itensPorPagina = 5;
  paginaTotal = 1;
 



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService,
  
  ) {}



  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.getContatoById(Number(id)).subscribe((contato) => {
        this.contato = contato;
        
  
     
      });
    }
  }

 



  cadastrar() {
    this.router.navigate(['contatos/cadastrar']);
  }

  editarContato() {
    this.router.navigate(['contatos/editar', this.contato?.id]);
  }

  voltar() {
    this.router.navigate(['/contatos']); // ajuste essa rota conforme a sua aplicação
  }
  


  
  
  
  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
  
   formatarContatoCelular(contatoCelular: string): string {
     return formatarContatoCelular(contatoCelular); // Chama a função importada
   }
       formatarContatoTeleFone(contatoTelefone:string): string {
     return formatarContatoTeleFone(contatoTelefone); // Chama a função importada
   }
   capitalizarNome(nome: string): string {
      return capitalizarNome(nome);  // Chama a função importada
    }
}





