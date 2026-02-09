export interface UserInfo {
  id?: string; // Auto-generated
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  roles: 'ROLE_USER' | 'ROLE_ADMIN';
}
