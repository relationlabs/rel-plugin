export const idlFactory = ({ IDL }) => {
  const UserName = IDL.Text;
  const FriendCanister = IDL.Principal;
  const UserId = IDL.Principal;
  const test = IDL.Service({
    'createProfile' : IDL.Func([UserName], [IDL.Opt(FriendCanister)], []),
    'getUserName' : IDL.Func([UserId], [IDL.Opt(UserName)], ['query']),
  });
  return test;
};
export const init = ({ IDL }) => { return []; };
