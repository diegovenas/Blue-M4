import { Favorite } from 'src/favorites/entities/favorite-entitie';

export class User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  favorites?: Favorite[];
}
