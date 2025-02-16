

export class Post {
  _id?: string;
  titulo?: string;
  conteudo?: string;
  dtCriacao?: Date;
  dtModificacao?: Date;
  autor?: AuthorProps[];
}
export class PostSingle {
  _id?: string;
  titulo?: string;
  conteudo?: string;
  dtCriacao?: Date;
  dtModificacao?: Date;
  autor?: AuthorProps;
}

export interface PostProps {
  _id?: string;
  titulo?: string;
  conteudo?: string;
  dtCriacao?: Date;
  dtModificacao?: Date;
  autor?: AuthorProps[];
}

export interface CompletedPostProps {
  posts: Post[];
}

export class Autor {
  _id?: string;
  nome?: string;
  dtCriacao?: Date;
  dtModificacao?: Date;
}

export interface AuthorProps {
  _id?: string;
  nome?: string;
  dtCriacao?: Date;
  dtModificacao?: Date;
}

export class Usuario {
  _id?: string;
  email?: string;
  senha?: string;
  nome?: string;
  tipoAcesso?: string;
  dtCriacao?: Date;
}
