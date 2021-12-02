export const idlFactory = ({ IDL }) => {
  const UserName__1 = IDL.Text;
  const FriendCanister__1 = IDL.Principal;
  const UserId = IDL.Principal;
  const UserId__1 = IDL.Principal;
  const UserName = IDL.Text;
  const FriendCanister = IDL.Principal;
  const Profile = IDL.Record({
    'id' : UserId__1,
    'userName' : UserName,
    'createdAt' : IDL.Int,
    'updateCanister' : IDL.Bool,
    'friendCanister' : FriendCanister,
  });
  const test = IDL.Service({
    'balance' : IDL.Func([], [IDL.Nat], ['query']),
    'createProfile' : IDL.Func([UserName__1], [IDL.Opt(FriendCanister__1)], []),
    'getAdmin' : IDL.Func([], [IDL.Principal], ['query']),
    'getCanister' : IDL.Func([UserId], [IDL.Opt(FriendCanister__1)], ['query']),
    'getUserCount' : IDL.Func([IDL.Text], [IDL.Nat], ['query']),
    'getUserName' : IDL.Func([UserId], [IDL.Opt(UserName__1)], ['query']),
    'userProfile' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(UserId, Profile))],
        ['query'],
      ),
  });
  return test;
};
export const init = ({ IDL }) => { return []; };
