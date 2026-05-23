export interface Categoria {
  id: string;
  nome: string;
  emoji: string;
}

export interface Produto {
  id: string;
  nome: string;
  marca: string;
  preco: number;
  emoji: string;
  categoria: string;
  descricao: string;
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  preco: number;
}

export interface CarrinhoItem extends Produto {
  quantidade: number;
}

export interface Usuario {
  nome: string;
  email: string;
  telefone?: string;
}
