import type { Principal } from '@dfinity/principal';
export type Addr = string;
export interface FriendHandle {
  'createFriend' : (arg_0: FriendInit) => Promise<[] | [FriendId__1]>,
  'createOwner' : (arg_0: Principal) => Promise<Principal>,
  'getCanisterID' : () => Promise<Principal>,
  'getCycles' : () => Promise<bigint>,
  'getFriends' : () => Promise<[] | [Array<FriendInfo>]>,
  'getMsg' : () => Promise<[] | [Array<string>]>,
  'getMsg2' : () => Promise<[] | [Array<MsgData>]>,
  'getOwner' : () => Promise<Principal>,
  'sendMsg' : (arg_0: string) => Promise<undefined>,
  'sendMsg2' : (arg_0: string) => Promise<undefined>,
}
export type FriendId = string;
export type FriendId__1 = string;
export interface FriendInfo {
  'userName' : UserName,
  'addr' : Addr,
  'createdAt' : bigint,
  'friendId' : FriendId,
}
export interface FriendInit { 'userName' : UserName, 'addr' : Addr }
export interface MsgData {
  'content' : string,
  'from' : string,
  'sendTime' : bigint,
}
export type UserName = string;
export interface _SERVICE extends FriendHandle {}
