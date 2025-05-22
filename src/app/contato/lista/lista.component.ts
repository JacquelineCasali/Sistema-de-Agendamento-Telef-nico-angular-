import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../../services/contato.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { capitalizarNome,formatarContatoCelular,formatarContatoTeleFone } from '../../shared/utils/utils';
@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  contatos: any[] = [];
  contatosFiltradas: any[] = [];
  contatosPaginadas: any[] = [];
  paginas: number[] = [];
  paginaAtual = 1;
  itensPorPagina = 6;
  totalPaginas = 1;
  filtro: string = '';
    contatoSelecionado: any = null;
  modalAberto = false;
  constructor(private contatoService: ContatoService, private router: Router) {}

  ngOnInit(): void {
    // Ordena os por nome de cada contato
    this.contatoService.listar().subscribe((data) => {
      this.contatos = data.sort((a, b) =>
        a.contatoNome.localeCompare(b.contatoNome)
      );
      this.aplicarFiltro();
    });
    
  }

  aplicarFiltro(): void {
    const termo = this.filtro.toLowerCase().trim();
    const termoNumerico = this.filtro.replace(/\D/g, '');

    this.contatosFiltradas = this.contatos.filter((e) => {
      const nome = (e.contatoNome || '').toLowerCase();
      const celular = (e.contatoCelular || '').replace(/\D/g, '');

      // Se não tiver filtro, retorna tudo
      if (!termo) return true;

      // Verifica se TODOS os termos do filtro estão no nome (busca por palavra)
      const termoPalavras = termo.split(/\s+/);
      const nomeMatch = termoPalavras.every((tp) => nome.includes(tp));

      // Verifica se o celular inclui os números do filtro
      const celularMatch = termoNumerico && celular.includes(termoNumerico);

      return nomeMatch || celularMatch;
    });

    console.log('Filtro atual:', this.filtro);
    console.log('Contatos filtradas:', this.contatosFiltradas.length);

    this.totalPaginas = Math.ceil(
      this.contatosFiltradas.length / this.itensPorPagina
    );
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    this.paginaAtual = 1;
    this.atualizarPaginacao();
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.contatosPaginadas = this.contatosFiltradas.slice(inicio, fim);
    console.log('Contatos paginadas:', this.contatosPaginadas);
  }

  anteriorPagina(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPaginacao();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPaginacao();
    }
  }

  irParaPagina(pagina: number): void {
    this.paginaAtual = pagina;
    this.atualizarPaginacao();
  }

  cadastrar() {
    this.router.navigate(['contatos/cadastrar']);
  }

  editar(contato: any) {
    this.router.navigate(['contatos/editar', contato.contatoId]);
  }

  abrirModal(contato: any) {
       this.contatoSelecionado = contato;
     document.body.classList.add('modal-aberto');
  }
 fecharModal() {
   
    this.contatoSelecionado = null;
    document.body.classList.remove('modal-aberto');
  }

  deletar(contato: any) {
    if (
      confirm(
        `Tem certeza que deseja excluir o contato ${contato.contatoNome}?`
      )
    ) {
      this.contatoService.deletar(contato.contatoId).subscribe({
        next: () => {
          this.contatos = this.contatos.filter((e) => e.contatoId !== contato.contatoId);
          this.aplicarFiltro();
        },
        error: (error) => {
          console.error('Erro ao excluir contato:', error);
          alert(`Erro ao excluir o contato: ${error.message || error}`);
        },
      });
    }
  }



   formatarData(contatoDhCad: string): string {
    return new Date(contatoDhCad).toLocaleDateString('pt-BR');
  }

alternarFavorito(contato: any): void {
  const novoValor = !contato.contatoSnFavorito;
  const contatoAtualizado = { ...contato, contatoSnFavorito: novoValor };

  this.contatoService.atualizarContato(contato.contatoId, contatoAtualizado).subscribe({
    next: () => {
      contato.contatoSnFavorito = novoValor;
    },
    error: (err) => {
      console.error('Erro ao atualizar favorito:', err);
      alert('Erro ao alterar favorito');
    },
  });
}

  // abrirModalFornecedor(fornecedor: any) {
  //   this.fornecedorSelecionado = fornecedor;
  //   this.modalAberto = true;
  // }

  // fecharModal() {
  //   this.modalAberto = false;
  // }

  // Função no template
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
