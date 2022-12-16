(async () => {
  const {
    setProductCategories,
  } = require("./functions/products/setProductCategories");

  require("./config/config").config("ch");

  const rows = [
    { "Product ID": 115 },
    { "Product ID": 120 },
    { "Product ID": 123 },
    { "Product ID": 130 },
    { "Product ID": 137 },
    { "Product ID": 141 },
    { "Product ID": 173 },
    { "Product ID": 179 },
    { "Product ID": 181 },
    { "Product ID": 182 },
    { "Product ID": 185 },
    { "Product ID": 190 },
    { "Product ID": 195 },
    { "Product ID": 204 },
    { "Product ID": 215 },
    { "Product ID": 217 },
    { "Product ID": 220 },
    { "Product ID": 221 },
    { "Product ID": 227 },
    { "Product ID": 233 },
    { "Product ID": 234 },
    { "Product ID": 235 },
    { "Product ID": 237 },
    { "Product ID": 240 },
    { "Product ID": 248 },
    { "Product ID": 252 },
    { "Product ID": 266 },
    { "Product ID": 269 },
    { "Product ID": 275 },
    { "Product ID": 276 },
    { "Product ID": 280 },
    { "Product ID": 286 },
    { "Product ID": 289 },
    { "Product ID": 290 },
    { "Product ID": 295 },
    { "Product ID": 306 },
    { "Product ID": 307 },
    { "Product ID": 314 },
    { "Product ID": 325 },
    { "Product ID": 330 },
    { "Product ID": 334 },
    { "Product ID": 340 },
    { "Product ID": 341 },
    { "Product ID": 346 },
    { "Product ID": 353 },
    { "Product ID": 364 },
    { "Product ID": 367 },
    { "Product ID": 371 },
    { "Product ID": 374 },
    { "Product ID": 375 },
    { "Product ID": 384 },
    { "Product ID": 388 },
    { "Product ID": 401 },
    { "Product ID": 406 },
    { "Product ID": 407 },
    { "Product ID": 410 },
    { "Product ID": 416 },
    { "Product ID": 418 },
    { "Product ID": 420 },
    { "Product ID": 424 },
    { "Product ID": 425 },
    { "Product ID": 446 },
    { "Product ID": 453 },
    { "Product ID": 464 },
    { "Product ID": 465 },
    { "Product ID": 467 },
    { "Product ID": 473 },
    { "Product ID": 474 },
    { "Product ID": 477 },
    { "Product ID": 478 },
    { "Product ID": 491 },
    { "Product ID": 497 },
    { "Product ID": 499 },
    { "Product ID": 506 },
    { "Product ID": 507 },
    { "Product ID": 518 },
    { "Product ID": 521 },
    { "Product ID": 524 },
    { "Product ID": 526 },
    { "Product ID": 528 },
    { "Product ID": 534 },
    { "Product ID": 550 },
    { "Product ID": 553 },
    { "Product ID": 554 },
    { "Product ID": 555 },
    { "Product ID": 559 },
    { "Product ID": 560 },
    { "Product ID": 561 },
    { "Product ID": 563 },
    { "Product ID": 566 },
    { "Product ID": 568 },
    { "Product ID": 573 },
    { "Product ID": 576 },
    { "Product ID": 582 },
    { "Product ID": 595 },
    { "Product ID": 599 },
    { "Product ID": 603 },
    { "Product ID": 613 },
    { "Product ID": 616 },
    { "Product ID": 622 },
    { "Product ID": 636 },
    { "Product ID": 637 },
    { "Product ID": 642 },
    { "Product ID": 659 },
    { "Product ID": 675 },
    { "Product ID": 678 },
    { "Product ID": 701 },
    { "Product ID": 703 },
    { "Product ID": 704 },
    { "Product ID": 710 },
    { "Product ID": 711 },
    { "Product ID": 712 },
    { "Product ID": 713 },
    { "Product ID": 716 },
    { "Product ID": 733 },
    { "Product ID": 734 },
    { "Product ID": 736 },
    { "Product ID": 747 },
    { "Product ID": 753 },
    { "Product ID": 754 },
    { "Product ID": 761 },
    { "Product ID": 779 },
    { "Product ID": 782 },
    { "Product ID": 788 },
    { "Product ID": 798 },
    { "Product ID": 804 },
    { "Product ID": 808 },
    { "Product ID": 827 },
    { "Product ID": 835 },
    { "Product ID": 842 },
    { "Product ID": 843 },
    { "Product ID": 851 },
    { "Product ID": 852 },
    { "Product ID": 854 },
    { "Product ID": 855 },
    { "Product ID": 859 },
    { "Product ID": 860 },
    { "Product ID": 865 },
    { "Product ID": 869 },
    { "Product ID": 877 },
    { "Product ID": 883 },
    { "Product ID": 895 },
    { "Product ID": 899 },
    { "Product ID": 900 },
    { "Product ID": 914 },
    { "Product ID": 918 },
    { "Product ID": 923 },
    { "Product ID": 933 },
    { "Product ID": 944 },
    { "Product ID": 945 },
    { "Product ID": 947 },
    { "Product ID": 959 },
    { "Product ID": 964 },
    { "Product ID": 967 },
    { "Product ID": 969 },
    { "Product ID": 972 },
    { "Product ID": 973 },
    { "Product ID": 974 },
    { "Product ID": 975 },
    { "Product ID": 979 },
    { "Product ID": 990 },
    { "Product ID": 1003 },
    { "Product ID": 1010 },
    { "Product ID": 1012 },
    { "Product ID": 1018 },
    { "Product ID": 1021 },
    { "Product ID": 1023 },
    { "Product ID": 1024 },
    { "Product ID": 1025 },
    { "Product ID": 1031 },
    { "Product ID": 1033 },
    { "Product ID": 1034 },
    { "Product ID": 1039 },
    { "Product ID": 1048 },
    { "Product ID": 1050 },
    { "Product ID": 1052 },
    { "Product ID": 1054 },
    { "Product ID": 1056 },
    { "Product ID": 1059 },
    { "Product ID": 1061 },
    { "Product ID": 1068 },
    { "Product ID": 1069 },
    { "Product ID": 1073 },
    { "Product ID": 1078 },
    { "Product ID": 1090 },
    { "Product ID": 1095 },
    { "Product ID": 1096 },
    { "Product ID": 1112 },
    { "Product ID": 1113 },
    { "Product ID": 1114 },
    { "Product ID": 1172 },
    { "Product ID": 1173 },
    { "Product ID": 1174 },
    { "Product ID": 1175 },
    { "Product ID": 1226 },
    { "Product ID": 1228 },
    { "Product ID": 1230 },
    { "Product ID": 1231 },
    { "Product ID": 1232 },
    { "Product ID": 1234 },
    { "Product ID": 1236 },
    { "Product ID": 1238 },
    { "Product ID": 1239 },
    { "Product ID": 1240 },
    { "Product ID": 1241 },
    { "Product ID": 1242 },
    { "Product ID": 1244 },
    { "Product ID": 1246 },
    { "Product ID": 1247 },
    { "Product ID": 1248 },
    { "Product ID": 1249 },
    { "Product ID": 1250 },
    { "Product ID": 1251 },
    { "Product ID": 1253 },
    { "Product ID": 1254 },
    { "Product ID": 1255 },
    { "Product ID": 1256 },
    { "Product ID": 1290 },
    { "Product ID": 1302 },
    { "Product ID": 1303 },
    { "Product ID": 1310 },
    { "Product ID": 1311 },
    { "Product ID": 1313 },
    { "Product ID": 1314 },
    { "Product ID": 1315 },
    { "Product ID": 1316 },
    { "Product ID": 1317 },
    { "Product ID": 1319 },
    { "Product ID": 1320 },
    { "Product ID": 1321 },
    { "Product ID": 1322 },
    { "Product ID": 1323 },
    { "Product ID": 1324 },
    { "Product ID": 1326 },
    { "Product ID": 1327 },
    { "Product ID": 1328 },
    { "Product ID": 1329 },
    { "Product ID": 1330 },
    { "Product ID": 1332 },
    { "Product ID": 1333 },
    { "Product ID": 1334 },
    { "Product ID": 1335 },
    { "Product ID": 1341 },
    { "Product ID": 1342 },
    { "Product ID": 1176 },
    { "Product ID": 1177 },
    { "Product ID": 1178 },
    { "Product ID": 1179 },
    { "Product ID": 1189 },
  ];

  for (const row of rows) {
    const id = row["Product ID"];
    await setProductCategories(id, [486]).catch(console.log)
    console.log(`${rows.indexOf(row)}/${rows.length}`);
  }

  console.log("products updated");
})();
