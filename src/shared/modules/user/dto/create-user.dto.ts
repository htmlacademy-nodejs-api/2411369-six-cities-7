export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarUrl?: string | undefined;
  public isPro: boolean;
  public password: string;
}
