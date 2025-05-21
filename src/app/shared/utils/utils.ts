export function capitalizarNome(contatoNome: string): string {
    return contatoNome
      ?.toLowerCase()
      .split(' ')
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ');
  }

 export function formatarContatoCelular(contatoCelular: string): string {
    const num = contatoCelular.replace(/\D/g, '');
    return num.length === 11
      ? num.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      : contatoCelular 
     ;
  }
 export function formatarContatoTeleFone(contatoTelefone:string): string {
    const num = contatoTelefone.replace(/\D/g, '');
    return num.length === 10
      ? num.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
      :  contatoTelefone
     ;
  }
// export function  formatarRg(rg: string): string {
//     const num = rg.replace(/\D/g, '');
//     return num.length === 9
//       ? num.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
//       : rg;
//   }