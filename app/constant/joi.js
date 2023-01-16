import Joi from "@hapi/joi";
Joi.objectId = require("joi-objectid")(Joi);

class JoiError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

// helpers schema
const pagination = {
  limit: Joi.number().integer().min(1).max(100).required(),
  page: Joi.number().integer().min(1).required(),
};

const findSchema = {
  projectId: Joi.string(),
  name: Joi.string(),
  symbol: Joi.string(),
};

// const contractSchema = {
//     // ctId: Joi.string().required(),
//     deployer: Joi.string().required(),
//     ctName: Joi.string().required(),
//     ctAddr: Joi.string().required(),
//     // ctNetwork: Joi.number().required(),
// }

// const contractSetSchema = {
//     // ctId: Joi.string().required(),
//     deployer: Joi.string().required(),
//     setName: Joi.string().required(),
//     contracts: Joi.array()
//         .items(
//             Joi.object({
//                 ctName: Joi.string().required(),
//                 ctAddr: Joi.string().required(),
//                 ctNetwork: Joi.number().required(),
//             })
//         )
//         .min(2),
// }

// GENERAL SCHEMA
const JoiGeneral = {
  getById: Joi.object({
    id: Joi.objectId().required(),
  }),
  JWTPayload: Joi.object({
    id: Joi.objectId(),
    name: Joi.string().required(),
    role: Joi.string().required(),
    iat: Joi.number().required(),
    exp: Joi.number().required(),
    iss: Joi.string().valid("VBC").required(),
  }),
};

// USER API
const JoiUser = {
  getMany: Joi.object({
    ...pagination,
    _id: Joi.objectId(),
    name: Joi.string(),
    role: Joi.number(),
    bcAddress: Joi.string(),
  }),
  signUp: Joi.object({
    firstName: Joi.string(),
    middleName: Joi.string(),
    lastName: Joi.string(),
    fullName: Joi.string().required(),
    username: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    bizField: Joi.string(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().valid("0", "1"),
    address: Joi.object({
      country: Joi.string(),
      city: Joi.string(),
      district: Joi.string(),
      street: Joi.string(),
    }),
    phoneNumber: Joi.string(),
    areaCode: Joi.string(),
    website: Joi.string(),
  }),
  addGuest: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
  getAPIKey: Joi.object()
    .keys({
      username: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().required(),
    })
    .xor("username", "email"),
  updateInfo: Joi.object({
    firstName: Joi.string(),
    middleName: Joi.string(),
    lastName: Joi.string(),
    fullName: Joi.string(),
    bizField: Joi.string(),
    contact: Joi.alternatives().try(
      Joi.object({
        country: Joi.string(),
        city: Joi.string(),
        district: Joi.string(),
        street: Joi.string(),
        phoneNumber: Joi.string(),
        email: Joi.string().email(),
        areaCode: Joi.string(),
        website: Joi.string(),
      }),
      Joi.object({
        version: Joi.string(),
      })
    ),
    profile: Joi.object({
      avatar: Joi.string(),
      gender: Joi.string(),
      bizField: Joi.string(),
    }),
  }),
  verifyAccount: Joi.object({
    code: Joi.string().max(20).required(),
    name: Joi.string().required(),
    symbol: Joi.string().required(),
    representative: Joi.string(),
    address: Joi.string(),
    district: Joi.string(),
    city: Joi.string(),
    nation: Joi.string(),
  }),
};

// BIZ FIELD
const JoiBizField = {
  getBizField: Joi.object({
    code: Joi.string(),
    lang: Joi.string().valid("VN", "EN"),
  }),
};

// PROJECT API
const JoiProject = {
  addProject: Joi.object({
    projectName: Joi.string().required(),
    symbol: Joi.string().required(),
  }),
  getList: Joi.object({
    limit: Joi.number().integer().min(1).max(100),
    page: Joi.number().integer().min(1),
  }).and("limit", "page"),
  getGeneralInfo: Joi.alternatives().try(
    Joi.object(findSchema).xor("projectId", "name", "symbol"),
    Joi.object({
      ...pagination,
    }),
    Joi.object({})
  ),
  updateProject: Joi.object({
    project: Joi.object(findSchema)
      .xor("projectId", "name", "symbol")
      .required(),
    name: Joi.string(),
    symbol: Joi.string(),
    status: Joi.number(),
    accessCount: Joi.number(),
    txCount: Joi.number(),
  }),
  updateInfo: Joi.object({
    project: Joi.object(findSchema)
      .xor("projectId", "name", "symbol")
      .required(),
    update: Joi.object({
      version: Joi.string().allow(null, ""),
      field: Joi.string().allow(null, ""),
      type: Joi.string().allow(null, ""),
      linkProject: Joi.string().allow(null, ""),
      target: Joi.string().allow(null, ""),
      description: Joi.string().allow(null, ""),
      appInfo: Joi.array(),
      avatar: Joi.object({
        title: Joi.string().allow(null, ""),
        option: Joi.object(),
        data: Joi.string(),
      }),
      illustratingImg: Joi.array()
        .items(
          Joi.alternatives().try(
            Joi.object({
              title: Joi.string().required(),
              description: Joi.string().allow(null, ""),
              option: Joi.object(),
              data: Joi.string().required(),
            }),
            Joi.object({
              title: Joi.string().required(),
              description: Joi.string().allow(null, ""),
              option: Joi.object(),
              url: Joi.string().required(),
            })
          )
        )
        .max(3),
      certificationImg: Joi.array()
        .items(
          Joi.alternatives().try(
            Joi.object({
              title: Joi.string().required(),
              description: Joi.string().allow(null, ""),
              option: Joi.object(),
              data: Joi.string().required(),
            }),
            Joi.object({
              title: Joi.string().required(),
              description: Joi.string().allow(null, ""),
              option: Joi.object(),
              url: Joi.string().required(),
            })
          )
        )
        .max(3),
    }),
  }),
  updateContract: Joi.object({
    project: Joi.object(findSchema)
      .xor("projectId", "name", "symbol")
      .required(),
    ctAddr: Joi.string().required(),
  }),

  updateSecurity: Joi.object({
    project: Joi.object(findSchema)
      .xor("projectId", "name", "symbol")
      .required(),
    updateSecurity: Joi.object({
      confidential: Joi.boolean(),
      allowContract: Joi.object({
        contract: Joi.string(),
        action: Joi.string().valid("add", "remove"),
      }),
      allowUser: Joi.object({
        user: Joi.string(),
        action: Joi.string().valid("add", "remove"),
      }),
      allowHttpOrigin: Joi.object({
        httpOrigin: Joi.string(),
        action: Joi.string().valid("add", "remove"),
      }),
    }),
  }),
};

// const JoiAvatar = {
//     avatar: Joi.object({
//         title: Joi.string(),
//         option: Joi.object(),
//         data: Joi.string().required(),
//     }),
// }

const JoiContract = {
  addContract: Joi.object({
    workingSpace: Joi.string(),
    deployer: Joi.string().required(),
    ctName: Joi.string().required(),
    ctAddr: Joi.string().required(),
  }),
  getContract: Joi.alternatives().try(
    Joi.object({
      ...pagination,
    }),
    Joi.object({
      ctId: Joi.string(),
      ctName: Joi.string(),
      deployer: Joi.string(),
      deployerBcAddress: Joi.string(),
      ctAddr: Joi.string(),
      workingSpace: Joi.string(),
      ctAddress: Joi.string(),
    })
  ),
  importContract: Joi.object({
    workingSpace: Joi.string(),
    ctName: Joi.string().required(),
    ctAddr: Joi.string().required(),
  }),
};
// WALLET API
const JoiWallet = {
  createWallet: Joi.object({
    hashedPassword: Joi.string().min(6).required(),
    encSeed: Joi.string().required(),
    hashedSeed: Joi.string().required(),
    name: Joi.string().required(),
    icon: Joi.object().allow(null),
  }),
  getWallet: Joi.object({
    hashedPassword: Joi.string().min(6),
    platform: Joi.number().valid(1, 2, 3),
  }),
  createAccount: Joi.object({
    isImport: Joi.required(),
    accountName: Joi.string().allow(null, ""),
    encPrivateKey: Joi.string().required(),
    address: Joi.string().required(),
    // balance: Joi.number().allow(null, ""),
    // nonce: Joi.number().default(0),
    // network: Joi.number().min(0).required(),
    //info: Joi.array(),
    icon: Joi.string().required(),
    platform: Joi.number().valid(0, 1, 2).required(),
    newPath: Joi.number(),
  }),
  switchActive: Joi.object({
    hashedPassword: Joi.string().min(6),
    isActive: Joi.number().valid(0, 1),
  }),
};

const JoiNetwork = {
  create: Joi.object({
    // networkId: Joi.number().min(0).required(),
    platform: Joi.number().valid(0, 1, 2),
    name: Joi.string().required(),
    symbols: Joi.string().required(),
    domain: Joi.string().required(),
    gateway: Joi.string().required(),
    networkId: Joi.number().required(),
    TPS: Joi.number().required(),
    blockTimeAverage: Joi.number().required(),
    endpoints: Joi.array().required(),
    icon: Joi.object().allow(null),
    type: Joi.object().valid("Internal", "External"),
  }),
  update: Joi.object({
    networkId: Joi.number().min(0).required(),
    name: Joi.string().required(),
    symbols: Joi.string().required(),
    domain: Joi.string().required(),
    //networkId: Joi.number().required(),
    TPS: Joi.number().required(),
    blockTimeAverage: Joi.number().required(),
    endpoints: Joi.array().required(),
    icon: Joi.object().allow(null),
  }),
  get: Joi.object()
    .keys({
      networkId: Joi.number().min(0),
      name: Joi.string(),
      symbols: Joi.string(),
    })
    .xor("networkId", "name", "symbols"),
};

const JoiAPI = {
  create: Joi.object({
    name: Joi.string().required(),
    tag: Joi.string().required(),
    header: Joi.object(),
    path: Joi.object(),
    params: Joi.object(),
    type: Joi.string().required(), //Type: Account, Block, Contract, EventLog, Parity, Token, Transaction
    domain: Joi.string().required(),
    networkId: Joi.number().min(0).required(),
    url: Joi.string().required(),
    method: Joi.string()
      .valid("POST", "PUT", "PATCH", "GET", "DELETE")
      .required(),
    description: Joi.string().required(),
    body: Joi.object().required(),
    contentType: Joi.string().required(),
    APIKey: Joi.string().required(),
    response: Joi.object().required(),
    status: Joi.string().valid("Active", "Deactive").required(),
  }),
  update: Joi.object({
    name: Joi.string().required(),
    tag: Joi.string().required(),
    header: Joi.object(),
    path: Joi.object(),
    params: Joi.object(),
    type: Joi.string().required(), //Type: Account, Block, Contract, EventLog, Parity, Token, Transaction
    domain: Joi.string().required(),
    networkId: Joi.number().min(0).required(),
    url: Joi.string().required(),
    method: Joi.string()
      .valid("POST", "PUT", "PATCH", "GET", "DELETE")
      .required(),
    description: Joi.string().required(),
    body: Joi.object().required(),
    contentType: Joi.string().required(),
    APIKey: Joi.string().required(),
    response: Joi.object().required(),
    status: Joi.string().valid("Active", "Deactive").required(),
  }),
};

const JoiAdmin = {
  createSuperAdmin: Joi.object({
    accessKey: Joi.string().required(),
    name: Joi.string().required(),
    username: Joi.string().max(30).required(),
    password: Joi.string().min(6).required(),
  }),
  deleteSuperAdmin: Joi.object({
    accessKey: Joi.string().required(),
    username: Joi.string().required(),
  }),
  createSubAdmin: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().max(30).required(),
    password: Joi.string().min(6).required(),
    type: Joi.string().required(),
  }),
  signIn: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  getListAdmin: Joi.object({
    type: Joi.string(),
    status: Joi.number().valid(0, 1),
    limit: Joi.number().integer().min(1).max(100),
    page: Joi.number().integer().min(1),
  }).and("limit", "page"),
  getInfoSubAdmin: Joi.object({
    username: Joi.string().required(),
  }).and("limit", "page"),
  updateInfo: Joi.object({
    name: Joi.string(),
  }),
  updateAccount: Joi.object({
    username: Joi.string().required(),
    update: Joi.object({
      name: Joi.string(),
      type: Joi.string(),
      status: Joi.number().valid(0, 1),
    }),
  }),
  deleteSubAdmin: Joi.object({
    username: Joi.string().required(),
  }),
};

const JoiEmail = {
  contact: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string(),
    company: Joi.string(),
    content: Joi.string(),
  }),
};

const JoiDigitalProfile = {
  createProfile: Joi.alternatives().try(
    Joi.object({
      networkId: Joi.number().integer(),
      profileType: Joi.number().integer(1),
      idCard: Joi.string().allow(null),
      phone: Joi.string().allow(null),
      citizenIdCard: Joi.string().allow(null),
      passport: Joi.string().allow(null),
      fullName: Joi.string().allow(null),
    }),
    Joi.object({
      networkId: Joi.number().integer(),
      profileType: Joi.number().integer(2),
      list: Joi.array().items(
        Joi.object({
          phone: Joi.string().allow(null),
          idCard: Joi.string().allow(null),
          citizenIdCard: Joi.string().allow(null),
          passport: Joi.string().allow(null),
          fullName: Joi.string().allow(null),
        })
      ),
    })
  ),
  updateProfile: Joi.object({
    secondaryKey: Joi.string().required(),
    idCard: Joi.string().allow(null),
    citizenIdCard: Joi.string().allow(null),
    passport: Joi.string().allow(null),
    fullName: Joi.string().allow(null),
    newSecondaryKey: Joi.string().allow(null),
    phone: Joi.string().allow(null),
  }),
  getList: Joi.object({
    networkId: Joi.number().integer(),
    page: Joi.number().integer(),
    size: Joi.number().integer(),
    txId: Joi.string(),
    profileAddr: Joi.string(),
  }),
};

const JoiNFT = {
  createCollection: Joi.object({
    // icon: Joi.object({
    //   data: Joi.string().required(),
    //   title: Joi.string().allow(null)
    // }),
    name: Joi.string().required(),
    symbol: Joi.string().required(),
    label_id: Joi.string().required(),
  }),
  createItem: Joi.object({
    item_images: Joi.array()
      .items(
        Joi.object({
          data: Joi.string().required(),
          title: Joi.string().allow(null),
        })
      )
      .allow(null),
    name: Joi.string().required(),
    collection_id: Joi.string().required(),
    description: Joi.string().allow(null),
    creator_bc_address: Joi.string().required(),
    contract_bc_address: Joi.string().required(),
    token_id: Joi.string().required(),
    url: Joi.string().required(),
    network_id: Joi.number().integer(),
    associate: Joi.string().allow(null),
    bc_account_id: Joi.string().allow(null),
  }),
  update: Joi.object({
    item_id: Joi.string().required(),
    status: Joi.number().valid(-1, 0, 1),
  }),
};

const JoiLike = {
  like: Joi.object({
    subject: Joi.string().required(),
    object: Joi.string().length(24).required(),
    typeObject: Joi.string()
      .valid("NFT", "Collection", "Set", "Creator")
      .required(),
  }),
};

const JoiTX = {
  createRawSingleNFT: Joi.object({
    networkId: Joi.number().valid(97,8888,4444).required(),
    from: Joi.string().required(),
    nftAddresses: Joi.array().items(Joi.string()).required(),
    tokenIds: Joi.array().items(Joi.any()).required(),
    useWrapper: Joi.number().valid(0,1,2),
    paymentMethod: Joi.string().default("0x0000000000000000000000000000000000000001"),
    price: Joi.string().required(),
    seller: Joi.string().required(),
    validTxTime: Joi.any(),
    sellerSig: Joi.string().required()
  }),
  updateSingleNFT: Joi.object({
    networkId: Joi.string().valid("97","8888","4444").required(),
    txId: Joi.string().required()
  }),
  sendRaw: Joi.object({
    from: Joi.string().required(),
    networkId: Joi.number().valid(97,8888,4444).required(),
    signedTx: Joi.string().required()
  }),
  createRawManyNFT: Joi.object({
    from: Joi.string().required(),
    marketNFTIds: Joi.array().items(Joi.string()).required()
  }),
  updateManyNFT: Joi.object({
    marketNFTIds: Joi.array().items(Joi.string()).required(),
    txId: Joi.string().required()
  }),
  createRawSet: Joi.object({
    from: Joi.string().required(),
    setId: Joi.string().required()
  }),
  createRawBundle: Joi.object({
    from: Joi.string().required(),
    bundleId: Joi.string().required()
  }),
  updateItem: Joi.object({
    txId: Joi.string().required()
  }),
};

const JoiActivity = {
  query: Joi.object({
    page: Joi.number().required(),
    size: Joi.number().required(),
    networkId: Joi.number().valid(8888,4444,97).required(),
    nftAddress: Joi.string().required(),
    type: Joi.string()
      .valid(
        "LISTINGS",
        "TRANSFERS",
        "BIDS",
        "BURNS",
        "REVOKES",
        "SALES",
        "LIKES",
        "ALL"
      ),
    tokenId: Joi.number(),
    time_anchor: Joi.number()
  }),
};

const JoiListNFT = {
  listMarketNFT: Joi.object({
    nftId: Joi.string().required(),
    collectionAddr: Joi.string().required(),
    baseType: Joi.any(), //for ERC1155
    tokenId: Joi.string().required(),
    networkId: Joi.number().valid(97,8888,4444,9898,8989).required(),
    name: Joi.string().required(),
    avatar: Joi.any().required(),
    description: Joi.string(),
    jsonURI: Joi.string(),
    creator: Joi.string().required(),
    seller: Joi.string().required(),
    specificBuyer: Joi.string().required().default("0x0000000000000000000000000000000000000000"),
    isBuy: Joi.boolean().required(),
    isBid: Joi.boolean().required(),
    listSig: Joi.string().required(),
    paymentMethod: Joi.string().required().default("0x0000000000000000000000000000000000000001"),
    buyPrice: Joi.string().required(),
    startTime: Joi.required(),
    endTime: Joi.required(),
    listTime: Joi.required(),
    bidType: Joi.any().valid("HIGHEST","DECLINE").allow(null),
    startPrice: Joi.any(),
    endPrice: Joi.any(),
    timeToDecrease: Joi.any(),
    labelId: Joi.string().required(),
  }),
  listMarketSet: Joi.object({
    setId: Joi.string().required(),
    nftIds: Joi.array().min(1).required(),
    collectionAddr: Joi.string().required(),
    baseType: Joi.any(), //for ERC1155
    tokenIds: Joi.array().min(1).required(),
    networkId: Joi.number().valid(97,8888,4444,9898,8989).required(),
    marketName: Joi.string(),
    name: Joi.string().required(),
    avatar: Joi.object().required(),
    description: Joi.string(),
    jsonURI: Joi.string(),
    creator: Joi.string().required(),
    seller: Joi.string().required(),
    specificBuyer: Joi.string().required().default("0x0000000000000000000000000000000000000000"),
    isBuy: Joi.boolean().required(),
    isBid: Joi.boolean().required(),
    listSig: Joi.string().required(),
    paymentMethod: Joi.string().required().default("0x0000000000000000000000000000000000000001"),
    buyPrice: Joi.string().required(),
    startTime: Joi.required(),
    endTime: Joi.required(),
    listTime: Joi.required(),
    bidType: Joi.any().valid("HIGHEST","DECLINE").allow(null),
    startPrice: Joi.any(),
    endPrice: Joi.any(),
    timeToDecrease: Joi.any(),
    labelId: Joi.string().required(),
  }),
  listMarketBundle: Joi.object({
    bundleId: Joi.string(),
    nftIds: Joi.array().min(1).required(),
    collectionAddr: Joi.string().required(),
    baseType: Joi.any(), //for ERC1155
    tokenIds: Joi.array().min(1).required(),
    networkId: Joi.number().valid(97,8888,4444,9898,8989).required(),
    marketName: Joi.string(),
    name: Joi.string().required(),
    avatars: Joi.array().min(1).required(),
    description: Joi.string(),

    creator: Joi.string().required(),
    seller: Joi.string().required(),
    specificBuyer: Joi.string().required().default("0x0000000000000000000000000000000000000000"),
    paymentMethod: Joi.string().required().default("0x0000000000000000000000000000000000000001"),
    buyPrices: Joi.array().required(),
    discounts: Joi.array().required(),
    discountCondition: Joi.string().required(),
    isBuy: Joi.boolean().required(),
    isBid: Joi.boolean().required(),
    listSig: Joi.string().required(),
    startTime: Joi.required(),
    endTime: Joi.required(),
    listTime: Joi.required(),
    bidType: Joi.any().valid("HIGHEST","DECLINE").allow(null),
    buyType: Joi.any().valid("RETAIL","WHOLESALE").allow(null),
    startPrice: Joi.any(),
    endPrice: Joi.any(),
    timeToDecrease: Joi.any(),
    labelId: Joi.string().required(),
  }),
  updateMarketCollection: Joi.object({
    avatar: Joi.string().allow(null),
    banner: Joi.string().allow(null),
    description: Joi.string().allow(null),
  })
};

const JoiShowNFT = {
  showMarketNFT: Joi.object({
    page: Joi.number(),
    size: Joi.number(),
    likeAddress: Joi.string(),
    status: Joi.string(),
    collectionAddr: Joi.string(),
    ERCtype: Joi.string().valid("ERC721","ERC1155"),
    baseType: Joi.string(),
    tokenId: Joi.string(),
    creator: Joi.string(),
    seller: Joi.string(),
    owner: Joi.string(),
    labelId: Joi.string(),
    set: Joi.string(),
    bundle: Joi.string(),
    setId: Joi.string(),
    networkId: Joi.number().valid(97,8888,4444,9898,8989),
    hotNFT: Joi.number().valid(1,0),
    isBid: Joi.number().valid(1,0),
    isBuy: Joi.number().valid(1,0),
    isSet: Joi.number().valid(1,0),
    isBundle: Joi.number().valid(1,0),
    sort: Joi.string().valid("like","bid","highbuyprice","lowbuyprice"),
    search: Joi.string(),
  }),
  showDetailMarketNFT: Joi.object({
    id: Joi.string(),
    collectionAddr: Joi.string(),
    tokenId: Joi.string(),
    likeAddress: Joi.string(),
  }),
  showMarketSetNFT: Joi.object({
    page: Joi.number(),
    size: Joi.number(),
    likeAddress: Joi.string(),
    status: Joi.string(),
    collectionAddr: Joi.string(),
    ERCtype: Joi.string().valid("ERC721","ERC1155"),
    baseType: Joi.string(),
    creator: Joi.string(),
    seller: Joi.string(),
    labelId: Joi.string(),
    setId: Joi.string(),
    networkId: Joi.number().valid(97,8888,4444,9898,8989),
    isBid: Joi.number().valid(1,0),
    isBuy: Joi.number().valid(1,0),
    sort: Joi.string().valid("like","bid","highbuyprice","lowbuyprice"),
    search: Joi.string(),
  }),
  showDetailMarketSetNFT: Joi.object({
    id: Joi.string().required(),
    likeAddress: Joi.string(),
  }),
  showMarketCollection: Joi.object({
    page: Joi.number(),
    size: Joi.number(),
    isSet: Joi.string().valid("true","false"),
    collectionAddr: Joi.string(),
    ERCtype: Joi.string().valid("ERC721","ERC1155"),
    baseType: Joi.string(),
    labelId: Joi.string(),
    networkId: Joi.number().valid(97,8888,4444,9898,8989),
    creator: Joi.string(),
    isShow: Joi.number().valid(1,0),
    search: Joi.string(),
    sort: Joi.string().valid("like"),
    likeAddress: Joi.string(),
  }),
  showDetailMarketCollection: Joi.object({
    id: Joi.string(),
    collectionAddr: Joi.string(),
    baseType: Joi.string(),
    likeAddress: Joi.string(),
  }),
  showMarketBundleNFT: Joi.object({
    page: Joi.number(),
    size: Joi.number(),
    likeAddress: Joi.string(),
    status: Joi.string(),
    collectionAddr: Joi.string(),
    ERCtype: Joi.string().valid("ERC721","ERC1155"),
    baseType: Joi.string(),
    creator: Joi.string(),
    seller: Joi.string(),
    labelId: Joi.string(),
    bundleId: Joi.string(),
    networkId: Joi.number().valid(97,8888,4444,9898,8989),
    isBid: Joi.number().valid(1,0),
    isBuy: Joi.number().valid(1,0),
    sort: Joi.string().valid("like","bid","highbuyprice","lowbuyprice"),
    search: Joi.string(),
  }),
  showDetailMarketBundleNFT: Joi.object({
    id: Joi.string().required(),
    likeAddress: Joi.string(),
  }),
};

const JoiRevokeNFT = {
  revoke: Joi.object({
    id: Joi.string().required(),
    from: Joi.string().required(),
  }),
  update: Joi.object({
    //networkId: Joi.string().valid("97","8888","4444").required(),
    networkId: Joi.number().valid(97,8888,4444).required(),
    txId: Joi.string().required()
  })
};

const JoiPreOrderNFT = {
  listing: Joi.object({
    networkId: Joi.number().required(),
    seller: Joi.string().required(),
    ERCtype: Joi.string().valid("ERC721","ERC1155"),
    paymentMethod: Joi.string().default("0x0000000000000000000000000000000000000001"),
    useWrapper: Joi.number().valid(0,1,2),
    startTime: Joi.number().required(),
    endTime: Joi.number().required(),
    releaseTime: Joi.number().required(),
    labelId: Joi.string().required(),
    preOrderCollection: Joi.object(),
    preOrderSession: Joi.object(),
    products: Joi.array()
      .items(Joi.object({
        dashboardId: Joi.string().allow(null, ""),
        productId: Joi.string().required(),
        name: Joi.string().required(),
        itemImages: Joi.array(),
        description: Joi.string().allow(null, ""),
        uri: Joi.string().allow(null, ""),
        fileInfo: Joi.object(),
        associate: Joi.string().allow(null, ""),
        max: Joi.number(),
        price: Joi.string().required(),
        limit: Joi.number(),
        rarity: Joi.string().allow(null, ""),
        listingTx: Joi.string().required()
      })).min(1)
  }),
  edit: Joi.object({
    startTime: Joi.number().required(),
    endTime: Joi.number().required(),
    releaseTime: Joi.number().required(),
    products: Joi.array()
      .items(Joi.object({
        productId: Joi.string().required(),
        max: Joi.number().required(),
      })).min(1)
  }),
  getList: Joi.object({
    page: Joi.string().allow(null, ""),
    size: Joi.string().allow(null, ""),
    status: Joi.string().allow(null, ""),
    networkId: Joi.any().valid("97","8888","4444").allow(null, ""),
    seller: Joi.string().allow(null, ""),
    ERCtype: Joi.string().valid("ERC721","ERC1155").allow(null, ""),
    labelId: Joi.string().allow(null, ""),
    collectionId: Joi.string().allow(null, ""),
    dashboardId: Joi.string().allow(null, ""),
    session: Joi.string().allow(null, ""),
    sort: Joi.string().valid("like").allow(null, ""),
  }), 
  getDetail: Joi.object({
    id: Joi.string().allow(null, ""),
    productId: Joi.string().allow(null, ""),
  }),
  actionCart: Joi.object({
    orderer: Joi.string().required(),
    sessionId: Joi.string().required(),
    products: Joi.array().items(Joi.object({
      productId: Joi.string().required(),
      number: Joi.number().allow(null),
    })).min(1)
  }),
  history: Joi.object({
    page: Joi.string().allow(null, ""),
    size: Joi.string().allow(null, ""),
    productId: Joi.string().allow(null, ""),
    status: Joi.any().allow(null, ""),
    buyer: Joi.string().allow(null, ""),
    seller: Joi.string().allow(null, ""),
    sort: Joi.string().allow(null, "")
  }),
  release: Joi.object({
    dashboardCollectionId: Joi.string(),
    creator: Joi.string().allow(null, ""),
    productId: Joi.string(),
    nftAddress: Joi.string(),
    tokenIds: Joi.array().items(Joi.string()).min(1),
    nftIds: Joi.array().items(Joi.string()).min(1),
    uris: Joi.array().items(Joi.string()).min(1)
  })
};

export default {
  JoiGeneral,
  JoiUser,
  JoiProject,
  JoiError,
  JoiContract,
  JoiWallet,
  JoiNetwork,
  JoiAPI,
  JoiBizField,
  JoiAdmin,
  JoiEmail,
  JoiDigitalProfile,
  JoiNFT,
  JoiLike,
  JoiTX,
  JoiActivity,
  JoiListNFT,
  JoiShowNFT,
  JoiRevokeNFT,
  JoiPreOrderNFT
};
