const PROXY_CONFIG = [
  {
    context: [
      "//recherche",
      "/referentiel",
      "/regalienne",
      "/correspondance",
      "/sectorielle",
      "/demandeenreg",
      "/piecesjointes",
      "/commune",
      "/demande",
      "/userInfos",
      "/recherche",
      "/prol/findUserByIdSub",
      "/prol/findDemandByIdSub"

    ],
    "target": "http://localhost:3010",
    "secure": false,
    "pathRewrite": {
      "^//recherche": "",
      "^/referentiel/commune": "",
      "^/referentiel": "",
      "^/regalienne": "",
      "^/correspondance": "",
      "^/sectorielle": "",
      "^/demandeenreg": "",
      "^/piecesjointes": "",
      "^/commune": "",
      "^/demande": "",
      "^/prol": ""
    }
  }
]

module.exports = PROXY_CONFIG;
