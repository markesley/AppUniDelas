export interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    telefone?: string;
    universidadeNome?: string;
    createdAt: Date;
    updatedAt: Date;
}
  
export interface UserCreate {
    name:       string
    username:   string
    email:      string
    password:   string
    telefone:   string
    universidadeId: string
  }
  
  
export interface UserRepository {
    create(data: UserCreate): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
  