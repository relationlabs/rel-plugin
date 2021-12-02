import type { Principal } from '@dfinity/principal';
export type FriendCanister = Principal;
export type FriendCanister__1 = Principal;
export interface Profile {
  'id' : UserId__1,
  'userName' : UserName,
  'createdAt' : bigint,
  'updateCanister' : boolean,
  'friendCanister' : FriendCanister,
}
export type UserId = Principal;
export type UserId__1 = Principal;
export type UserName = string;
export type UserName__1 = string;
export interface test {
  'balance' : () => Promise<bigint>,
  'createProfile' : (arg_0: UserName__1) => Promise<[] | [FriendCanister__1]>,
  'getAdmin' : () => Promise<Principal>,
  'getCanister' : (arg_0: UserId) => Promise<[] | [FriendCanister__1]>,
  'getUserCount' : (arg_0: string) => Promise<bigint>,
  'getUserName' : (arg_0: UserId) => Promise<[] | [UserName__1]>,
  'userProfile' : (arg_0: string) => Promise<Array<[UserId, Profile]>>,
}
export interface _SERVICE extends test {}
