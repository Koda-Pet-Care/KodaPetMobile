import { Produto, Servico, Categoria } from '@/types';

export const CATEGORIAS: Categoria[] = [
  { id: 'racao', nome: 'Ração', emoji: '🥩' },
  { id: 'higiene', nome: 'Higiene', emoji: '🛁' },
  { id: 'brinquedos', nome: 'Brinquedos', emoji: '🎾' },
  { id: 'saude', nome: 'Saúde', emoji: '💊' },
  { id: 'acessorios', nome: 'Acessórios', emoji: '🎀' },
  { id: 'camas', nome: 'Camas', emoji: '🛏️' },
];

export const PRODUTOS: Produto[] = [
  {
    id: '1',
    nome: 'Ração Premium Cães Adultos 15kg',
    marca: 'Royal Canin',
    preco: 189.9,
    emoji: '🥩',
    categoria: 'racao',
    descricao:
      'Ração completa para cães adultos de médio porte. Rica em proteínas e nutrientes essenciais para a saúde e bem-estar do seu pet.',
  },
  {
    id: '2',
    nome: 'Ração Gourmet para Gatos Castrados 3kg',
    marca: 'Whiskas',
    preco: 54.9,
    emoji: '🐟',
    categoria: 'racao',
    descricao:
      'Formulação especial para gatos castrados, controlando o ganho de peso e promovendo saúde urinária.',
  },
  {
    id: '3',
    nome: 'Shampoo Neutro Pet 500ml',
    marca: 'PetClean',
    preco: 28.9,
    emoji: '🧴',
    categoria: 'higiene',
    descricao:
      'Shampoo suave e hipoalergênico para cães e gatos. Deixa o pelo brilhante e perfumado sem agredir a pele sensível.',
  },
  {
    id: '4',
    nome: 'Bola Interativa com Apito',
    marca: 'PetFun',
    preco: 19.9,
    emoji: '🎾',
    categoria: 'brinquedos',
    descricao:
      'Bola resistente com apito interno para entreter e estimular seu pet. Ideal para cães de todos os portes.',
  },
  {
    id: '5',
    nome: 'Antipulgas Spot-On 3 meses',
    marca: 'Bravecto',
    preco: 89.9,
    emoji: '💊',
    categoria: 'saude',
    descricao:
      'Proteção de longa duração contra pulgas e carrapatos. Uma única aplicação garante 3 meses de proteção eficaz.',
  },
  {
    id: '6',
    nome: 'Coleira Ajustável com Enfeite',
    marca: 'PetStyle',
    preco: 34.9,
    emoji: '🎀',
    categoria: 'acessorios',
    descricao:
      'Coleira confortável e estilosa em couro vegano. Disponível em diversas cores e tamanhos para todos os pets.',
  },
  {
    id: '7',
    nome: 'Cama Ortopédica Cães Grandes',
    marca: 'ComfyPet',
    preco: 159.9,
    emoji: '🛏️',
    categoria: 'camas',
    descricao:
      'Cama com espuma viscoelástica para aliviar pressão nas articulações. Ideal para cães sênior e de grande porte.',
  },
  {
    id: '8',
    nome: 'Tapete Higiênico 60x60cm (30un)',
    marca: 'PetPad',
    preco: 39.9,
    emoji: '📋',
    categoria: 'higiene',
    descricao:
      'Tapetes super absorventes com tecnologia antibacteriana. Ideal para filhotes em fase de adestramento.',
  },
  {
    id: '9',
    nome: 'Ração Natural para Filhotes 2kg',
    marca: 'Guabi Natural',
    preco: 72.9,
    emoji: '🌿',
    categoria: 'racao',
    descricao:
      'Ração natural para filhotes com ingredientes selecionados. Sem corantes artificiais, com frango e arroz integral.',
  },
  {
    id: '10',
    nome: 'Arranhador Colunar para Gatos',
    marca: 'GatoCriativo',
    preco: 89.9,
    emoji: '🐱',
    categoria: 'brinquedos',
    descricao:
      'Arranhador com plataforma e brinquedo pendente. Ajuda a preservar seus móveis e estimula o instinto natural do gato.',
  },
];

export const PRODUTOS_DESTAQUE = PRODUTOS.slice(0, 5);

export const SERVICOS: Servico[] = [
  {
    id: '1',
    nome: 'Banho e Tosa',
    descricao:
      'Deixe seu pet limpo, cheiroso e com visual impecável. Profissionais especializados próximos de você com agendamento online fácil.',
    emoji: '🛁',
    preco: 60.0,
  },
  {
    id: '2',
    nome: 'Hospedagem',
    descricao:
      'Vai viajar? Hospede seu pet com segurança e carinho. Garantimos diversão, cuidados e bem-estar enquanto você estiver fora.',
    emoji: '🏠',
    preco: 80.0,
  },
  {
    id: '3',
    nome: 'Pet Sitter',
    descricao:
      'Nossos cuidadores vão até seu pet para oferecer atenção, companhia e carinho no aconchego da sua casa.',
    emoji: '❤️',
    preco: 50.0,
  },
  {
    id: '4',
    nome: 'Consulta Veterinária',
    descricao:
      'Atendimento veterinário de qualidade para garantir a saúde e bem-estar do seu pet com profissionais certificados.',
    emoji: '🩺',
    preco: 120.0,
  },
  {
    id: '5',
    nome: 'Creche Pet',
    descricao:
      'Ideal para quem não quer deixar o pet sozinho. Ele brinca, socializa e gasta energia em um ambiente seguro e supervisionado.',
    emoji: '🎮',
    preco: 70.0,
  },
  {
    id: '6',
    nome: 'Fisioterapia Animal',
    descricao:
      'Tratamentos especializados para dores, traumas e fraturas. Sessões que promovem saúde, mobilidade e bem-estar.',
    emoji: '💪',
    preco: 150.0,
  },
];

export const SERVICOS_DESTAQUE = SERVICOS.slice(0, 3);
