import { AccessControl } from "accesscontrol";

// ROLE: 0->1->2 (Admin >= Owner >= Viewer >= Others)

// This is actually how the grants are maintained internally.
const grantsObject = {
  admin: {
    asset: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"]
    }
  },

  //Own by userId
  owner: {
    asset: {
      "create:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"]
    }
  },
  
  //Own by userId in whiteList or staticKey
  viewer: {
    asset: {
      "read:own": ["id", "name", "image", "nftId", "nftAddress", "amounts"],
      "update:own": ["amounts"],
    }
  },
  others: {
    asset: {
      "read:any": ["id", "name", "image"],
    }
  },
};

const ac = new AccessControl(grantsObject);

export default ac;