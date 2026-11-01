import { User, UserType } from '../../types/index.js';
import { prop, getModelForClass, defaultClasses, modelOptions } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'users' } })

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, trim: true})
  public name: string;

  @prop({unique: true, required: true})
  public email: string;

  @prop()
  public avatar?: string;

  @prop({required: true})
  private password: string;

  constructor(userData: User) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string): void {
    this.password = createSHA256(password, salt);
  }

  public getPassword(): string {
    return this.password;
  }

  @prop({required: true, type: () => String, enum: UserType})
  public type: UserType;
}

export const UserModel = getModelForClass(UserEntity);
