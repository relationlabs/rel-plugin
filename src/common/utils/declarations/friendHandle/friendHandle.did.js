export const idlFactory = ({ IDL }) => {
  const UserName = IDL.Text;
  const Addr = IDL.Text;
  const FriendInit = IDL.Record({ 'userName' : UserName, 'addr' : Addr });
  const FriendId__1 = IDL.Text;
  const FriendId = IDL.Text;
  const FriendInfo = IDL.Record({
    'userName' : UserName,
    'addr' : Addr,
    'createdAt' : IDL.Int,
    'friendId' : FriendId,
  });
  const MsgData = IDL.Record({
    'content' : IDL.Text,
    'from' : IDL.Text,
    'sendTime' : IDL.Int,
  });
  const FriendHandle = IDL.Service({
    'createFriend' : IDL.Func([FriendInit], [IDL.Opt(FriendId__1)], []),
    'createOwner' : IDL.Func([IDL.Principal], [IDL.Principal], []),
    'getCanisterID' : IDL.Func([], [IDL.Principal], ['query']),
    'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'getFriends' : IDL.Func([], [IDL.Opt(IDL.Vec(FriendInfo))], ['query']),
    'getMsg' : IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Text))], ['query']),
    'getMsg2' : IDL.Func([], [IDL.Opt(IDL.Vec(MsgData))], ['query']),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'sendMsg' : IDL.Func([IDL.Text], [], []),
    'sendMsg2' : IDL.Func([IDL.Text], [], []),
  });
  return FriendHandle;
};
export const init = ({ IDL }) => { return []; };
