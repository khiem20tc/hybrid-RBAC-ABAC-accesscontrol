import { accessControl } from "../config";
import accessKey from "./accessKey";

/* Pseudocode to privacy read info asset
**    
*/

const readPermission = async ({key, userId, owner}) => {
  let role, permission;

  console.log({key, userId, owner});

  //Check if hasn't admin role and grant new role

  // Check role owner
  if (userId === owner) {
    role = "owner";
    permission = accessControl.can(role).readOwn("asset");
    return permission;
  }
  //else

  const isValid = await accessKey.verifyKey(key);

  //check accessKey
  if (isValid) {
    // Check role viewer
    role = "viewer";
    permission = accessControl.can(role).readOwn("asset");
    return permission;
  }
  //else

  // Check role others
  role = "others";
  permission = accessControl.can(role).readAny("asset");

  return permission;
};

export default {
  readPermission
};