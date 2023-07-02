export interface UserUpload {
  email: string;
  password: string;
  name: string;
  role?: string;
  avatar: File;
}
