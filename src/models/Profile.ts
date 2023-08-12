import { ProfileAttribute } from './ProfileAttribute';

export interface Profile {
  name: string;
  nickname: string;
  avatar?: string;
  about?: string;
  attributes?: ProfileAttribute[];
}
