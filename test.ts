import { getProductBySku } from "./functions/products/getProductBySKU"
import { Product } from "./functions/products/Product"
import { updateProduct } from "./functions/products/updateProduct"
import { allhairCategoryRules } from "./scripts/categorising/allHairCategoryRules"

const skus = [
    "100047",
    "100870A",
    "100918",
    "10097",
    "10098",
    "10123",
    "10127",
    "10128",
    "10129",
    "10130",
    "10131",
    "10132",
    "10133",
    "10134",
    "10135",
    "10136",
    "10137",
    "10138",
    "10139",
    "10140",
    "10141",
    "10142",
    "10143",
    "10144",
    "10145",
    "10194A",
    "10197",
    "10209",
    "10210",
    "10211",
    "10257A",
    "10303",
    "10305",
    "10306",
    "10307",
    "10308",
    "10309",
    "10310",
    "10311",
    "10320",
    "10355",
    "10361a",
    "10362a",
    "10363a",
    "10364a",
    "10364b",
    "10365a",
    "10377",
    "10399",
    "10400",
    "10401",
    "10443",
    "10453",
    "10454",
    "10455",
    "10545",
    "10551",
    "10552",
    "10569",
    "10688A",
    "10730A",
    "10730B",
    "10731A",
    "10732A",
    "10902",
    "10903",
    "11047",
    "11048",
    "11049",
    "11050",
    "11074",
    "11075",
    "11076",
    "11077",
    "11077A",
    "11152",
    "11166",
    "11167",
    "11168",
    "11169",
    "11170",
    "11171",
    "11338",
    "11350",
    "11353",
    "11359A",
    "11388",
    "11389",
    "11497",
    "11498",
    "11499",
    "11500",
    "11553A",
    "11553Z",
    "11749",
    "11750",
    "11795",
    "11797",
    "11798",
    "11849",
    "11850",
    "11851",
    "11852",
    "11853",
    "11854",
    "11855",
    "11856",
    "11857",
    "11858",
    "11859",
    "11860",
    "11861",
    "11862",
    "11863",
    "11864",
    "11865",
    "11866",
    "11867",
    "11868",
    "11869",
    "11870",
    "11871",
    "11872",
    "11873",
    "11874",
    "11875",
    "11876",
    "11877",
    "11878",
    "12123",
    "12124",
    "12125",
    "12126",
    "12127",
    "12263",
    "12335",
    "12336",
    "12337",
    "12338",
    "12339",
    "12340",
    "12341",
    "12405",
    "12750",
    "12756",
    "12756A",
    "12757",
    "12757A",
    "12758",
    "12758A",
    "12885",
    "12886",
    "12887",
    "12888",
    "12889",
    "12890",
    "12891",
    "12892",
    "12893",
    "12894",
    "12895",
    "12896",
    "12897",
    "12898",
    "12899",
    "12899A",
    "12900",
    "12901",
    "12902",
    "12902A",
    "12903",
    "12904",
    "12905",
    "12906",
    "12908",
    "12910",
    "12911",
    "12912",
    "12913",
    "12914",
    "12915",
    "12916",
    "12917",
    "12918",
    "12919",
    "12920",
    "12921",
    "12922",
    "12924",
    "12925",
    "12926",
    "12927",
    "12928",
    "12930",
    "12931",
    "12932",
    "12933",
    "12934",
    "12935",
    "12936",
    "12937",
    "12939",
    "12940",
    "13037",
    "13038",
    "13039",
    "13040",
    "13041",
    "13093",
    "13211",
    "13216",
    "13217",
    "13218",
    "13219",
    "13220",
    "13221",
    "13222",
    "13223",
    "13224",
    "13225",
    "13226",
    "13227",
    "13228",
    "13229",
    "13230",
    "13231",
    "13232",
    "13233",
    "13234",
    "13292A",
    "13293A",
    "13294A",
    "13295A",
    "13296A",
    "13310",
    "13365A",
    "13643",
    "13673",
    "13933",
    "14027",
    "14028",
    "14029",
    "14030",
    "14031",
    "14032A",
    "14032B",
    "14032C",
    "14032D",
    "14042",
    "14043",
    "14044",
    "14045",
    "14046",
    "14047",
    "14049",
    "14136",
    "14137",
    "14138",
    "14195",
    "14196",
    "14197",
    "14198",
    "14199",
    "14200",
    "14201",
    "14202",
    "14203",
    "14204",
    "14205",
    "14206",
    "14207",
    "14208",
    "14209",
    "14210",
    "14211",
    "14212",
    "14213",
    "14214",
    "14215",
    "14216",
    "14217",
    "14218",
    "14219",
    "14220",
    "14221",
    "14222",
    "14224",
    "14225",
    "14229",
    "14230",
    "14231",
    "14232",
    "14233",
    "14234",
    "14235",
    "14236",
    "14237",
    "14238",
    "14239",
    "14240",
    "14241",
    "14242",
    "14243",
    "14244",
    "14245",
    "14246",
    "14247",
    "14248",
    "14249",
    "14250",
    "14251",
    "14252",
    "14253",
    "14254",
    "14255",
    "14256",
    "14257",
    "14258",
    "14259",
    "14260",
    "14261",
    "14262",
    "14263",
    "14264",
    "14265",
    "14266",
    "14267",
    "14268",
    "14269",
    "14270",
    "14271",
    "14272",
    "14273",
    "14274",
    "14275",
    "14276",
    "14277",
    "14278",
    "14279",
    "14280",
    "14281",
    "14282",
    "14283",
    "14284",
    "14285",
    "14286",
    "14287",
    "14288",
    "14289",
    "14290",
    "14291",
    "14292",
    "14293",
    "14294",
    "14301",
    "14414",
    "14429",
    "14459",
    "14460",
    "14493",
    "14494",
    "14495",
    "14496",
    "14521",
    "14522",
    "14523",
    "14590",
    "14591",
    "14592",
    "14743",
    "14744",
    "14745",
    "14758",
    "14759",
    "14760",
    "14761",
    "14762",
    "14763",
    "14764",
    "14779",
    "14780",
    "14781",
    "14782",
    "14783",
    "14784",
    "1866003",
    "1866010",
    "20199",
    "20200",
    "20230",
    "20231",
    "20232",
    "20233",
    "20277",
    "20291",
    "20302",
    "20303",
    "20304",
    "20305",
    "20306",
    "20307",
    "20389",
    "20499",
    "20500",
    "20501",
    "20502",
    "20503",
    "20512",
    "20513",
    "20522",
    "20523",
    "20524",
    "20525",
    "20527",
    "20528",
    "20529",
    "20530",
    "20531",
    "20532",
    "20533",
    "20623",
    "20624",
    "20625",
    "20626",
    "20627",
    "20628",
    "20629",
    "20630",
    "20631",
    "20632",
    "20633",
    "20634",
    "20635",
    "20636",
    "20637",
    "20638",
    "20639",
    "20640",
    "20641",
    "20646",
    "20647",
    "20648",
    "20649",
    "20650",
    "20651",
    "20652",
    "20656",
    "20657",
    "20658",
    "20659",
    "20660",
    "20661",
    "20662",
    "20663",
    "20664",
    "20665",
    "20666",
    "20667",
    "20668",
    "20669",
    "20670",
    "20671",
    "20672",
    "20673",
    "20674",
    "20675",
    "20676",
    "20677",
    "20678",
    "20679",
    "20681",
    "20682",
    "20683",
    "20684",
    "20685",
    "20686",
    "20687",
    "20713",
    "20715",
    "20716",
    "20725",
    "20726",
    "20821",
    "20822",
    "20823",
    "20824",
    "20825",
    "20826",
    "20827",
    "20828",
    "20836",
    "20837",
    "20838",
    "20839",
    "20840",
    "20841",
    "20844",
    "20845",
    "20846",
    "20847",
    "20848",
    "20849",
    "20850",
    "20851",
    "20852",
    "20853",
    "20854",
    "20855",
    "20856",
    "20857",
    "20858",
    "20859",
    "20860",
    "20861",
    "20862",
    "20863",
    "20864",
    "20865",
    "20866",
    "20867",
    "20868",
    "20869",
    "20870",
    "20871",
    "20872",
    "20873",
    "20874",
    "20875",
    "20876",
    "20877",
    "20878",
    "20879",
    "20880",
    "20881",
    "20882",
    "20883",
    "20884",
    "20885",
    "20886",
    "20887",
    "20888",
    "20889",
    "20890",
    "20891",
    "20892",
    "20893",
    "20894",
    "20895",
    "20896",
    "20897",
    "20898",
    "20899",
    "20900",
    "20901",
    "20902",
    "20903",
    "20904",
    "20905",
    "20906",
    "20907",
    "20908",
    "20909",
    "20910",
    "20911",
    "20912",
    "20913",
    "20914",
    "20915",
    "20916",
    "20929",
    "20930",
    "20931",
    "20932",
    "20933",
    "20934",
    "20935",
    "20936",
    "20937",
    "20938",
    "20939",
    "20940",
    "20941",
    "20942",
    "20943",
    "20944",
    "20945",
    "20946",
    "20947",
    "20948",
    "20949",
    "20950",
    "20951",
    "20952",
    "20953",
    "20954",
    "20955",
    "20956",
    "20957",
    "20958",
    "20959",
    "20960",
    "20961",
    "20962",
    "20963",
    "20964",
    "20965",
    "20966",
    "20967",
    "20968",
    "20969",
    "20970",
    "20971",
    "20978",
    "20979",
    "20980",
    "20981",
    "20982",
    "20983",
    "20984",
    "20985",
    "20986",
    "20987",
    "20988",
    "20989",
    "20990",
    "20991",
    "20992",
    "20993",
    "20994",
    "20995",
    "20996",
    "20997",
    "20998",
    "20999",
    "21000",
    "21001",
    "21002",
    "21004",
    "21005",
    "21006",
    "21007",
    "21008",
    "21009",
    "21010",
    "21011",
    "21012",
    "21013",
    "21014",
    "21015",
    "21016",
    "21017",
    "21018",
    "21019",
    "21020",
    "21021",
    "21022",
    "21023",
    "21024",
    "21025",
    "21026",
    "21027",
    "21028",
    "21029",
    "21030",
    "21031",
    "21032",
    "21033",
    "21034",
    "21035",
    "21036",
    "21037",
    "21038",
    "21039",
    "21040",
    "21041",
    "21042",
    "21043",
    "21044",
    "21045",
    "21046",
    "21047",
    "21048",
    "21049",
    "21050",
    "21051",
    "21052",
    "21053",
    "21054",
    "21055",
    "21056",
    "21059",
    "21060",
    "21061",
    "21062",
    "21063",
    "21064",
    "21065",
    "21066",
    "21067",
    "21068",
    "21069",
    "21070",
    "21071",
    "21073",
    "21074",
    "21075",
    "21081",
    "21082",
    "21083",
    "21084",
    "21085",
    "21086",
    "21087",
    "21088",
    "21089",
    "21090",
    "21092",
    "21093",
    "21094",
    "21095",
    "21096",
    "21097",
    "21098",
    "21099",
    "21100",
    "21101",
    "21102",
    "21103",
    "21104",
    "21105",
    "21106",
    "21107",
    "21108",
    "21109",
    "21110",
    "21111",
    "21112",
    "21113",
    "21114",
    "21115",
    "21116",
    "21117",
    "21118",
    "21120",
    "21121",
    "21122",
    "21123",
    "21124",
    "21125",
    "21126",
    "21127",
    "21129",
    "21130",
    "21131",
    "21132",
    "21133",
    "21134",
    "21135",
    "21136",
    "21137",
    "21138",
    "21139",
    "21140",
    "21141",
    "4007A",
    "40548",
    "4154a",
    "4204a",
    "5192A",
    "5193A",
    "5259",
    "5321",
    "5322",
    "5355B",
    "5355C",
    "5381",
    "5384",
    "5397",
    "5742",
    "6153",
    "6154",
    "6155",
    "6216",
    "6337A",
    "6337B",
    "6491",
    "6499",
    "6745a",
    "6833",
    "6834",
    "6835",
    "7600",
    "7671",
    "7783",
    "7784",
    "7785",
    "7820",
    "7822",
    "7823",
    "8070",
    "8455",
    "8756",
    "8757",
    "8758",
    "8759",
    "8760",
    "8787",
    "8841",
    "8874",
    "8875",
    "8876",
    "8878",
    "8879",
    "8880",
    "8881",
    "8882",
    "8883",
    "8884",
    "8885",
    "8906",
    "8907",
    "8923",
    "8965",
    "8966",
    "8967",
    "8968",
    "8969",
    "8970",
    "8971",
    "8972",
    "8985",
    "9077",
    "9078",
    "9084",
    "9085",
    "9087",
    "9090",
    "9091",
    "9092",
    "9229",
    "9230",
    "9231",
    "9450",
    "9451",
    "9452",
    "9631B",
    "9632",
    "9656",
    "9661",
    "9717",
    "9718",
    "9719",
    "9720",
    "9801",
    "9802",
    "9803",
    "9804",
    "9805",
    "9806",
    "9906",
    "9907",
    "9908",
    "9954",
    "9955",
    "9956",
    "9959",
    "9960",
    "9999a",
    "BE_1"
]





const toFix = [
    "6800",
    "6801",
    "100870",
    "4707",
    "40976",
    "40977",
    "4204",
    "5183",
    "7179",
    "7180",
    "7604",
    "7924",
    "8799",
    "9949",
    "8722",
    "9142",
    "9144",
    "KER_E022410",
    "5885",
    "6868",
    "MOR_MO0029",
    "5874",
    "MOR_MO0006",
    "MOR_MO0053",
    "MOR_MO0054",
    "5022",
    "5023",
    "9797",
    "MOR_MO0075",
    "MOR_BUNDLE",
    "MOR_MO0098",
    "9058",
    "MOR_MO0040",
    "MOR_MOISTURE",
    "MOR_MO0018",
    "MOR_MO0020",
    "5873",
    "5877",
    "5878",
    "5879",
    "5880",
    "5884",
    "9059",
    "mor_mo0042",
    "MOR_P018823",
    "7898",
    "7900",
    "6192",
    "6193",
    "7748",
    "8283",
    "8027",
    "8028",
    "8774",
    "8775",
    "8776",
    "8777",
    "8778",
    "8935",
    "8937",
    "8949",
    "8950",
    "5051",
    "5056",
    "10188",
    "10189",
    "10190",
    "10191",
    "10192",
    "10193",
    "10194",
    "6508",
    "7601",
    "7602",
    "9454",
    "8223",
    "8224",
    "8225",
    "8226",
    "6200",
    "6246",
    "6298",
    "8621",
    "8622",
    "7992",
    "7993",
    "7994",
    "10256",
    "10257",
    "7507",
    "101106",
    "110631",
    "110700",
    "110625",
    "111598",
    "103605",
    "106053",
    "111006",
    "110542",
    "110616",
    "6244",
    "110910",
    "6797",
    "6798",
    "7603",
    "110634",
    "110905",
    "10319",
    "8615",
    "10361",
    "6481",
    "10362",
    "6471",
    "6481A",
    "10363",
    "6476",
    "10364",
    "8000",
    "10365",
    "6469",
    "6470",
    "10442",
    "9950",
    "10446",
    "REDK_P042690",
    "10445",
    "REDK_P029530",
    "9762",
    "9763",
    "9764",
    "10544",
    "9631a",
    "10147",
    "7494",
    "10490",
    "10541",
    "10542",
    "10543",
    "10688",
    "10730",
    "10733",
    "10732",
    "7657",
    "11045",
    "11046",
    "11038",
    "11040",
    "11039",
    "11041",
    "11042",
    "MOR_MO0008",
    "MOR_MO0011",
    "mor_mo0041",
    "11149",
    "11150",
    "11151",
    "11166a",
    "11172",
    "11167a",
    "11173",
    "11174",
    "11169a",
    "11175",
    "11170a",
    "11176",
    "11171a",
    "11177",
    "11286",
    "11374",
    "11375",
    "11376",
    "11377",
    "11378",
    "11358",
    "11359",
    "11393",
    "4976",
    "7654",
    "7655",
    "7988",
    "11553",
    "11553B",
    "9631",
    "11746",
    "11471",
    "11472",
    "11452",
    "11453",
    "11458",
    "11459",
    "11791",
    "11295",
    "8788",
    "5755",
    "5673",
    "9140",
    "5667",
    "8779",
    "8781",
    "11289",
    "11292",
    "6439",
    "6440",
    "11294",
    "8789",
    "KER_E1490200",
    "11290",
    "REDK_P027970",
    "REDK_P042820",
    "11468",
    "11469",
    "KER_4402026",
    "9135",
    "5207",
    "8780",
    "8782",
    "11477",
    "11479",
    "REDK_CCOND.",
    "REDK_CSHAM.",
    "9129",
    "KER_E046500",
    "5011",
    "9134",
    "7508",
    "7509",
    "12261",
    "12262",
    "6347",
    "9128",
    "11264",
    "11265",
    "9911",
    "9912",
    "9913",
    "6198",
    "6346",
    "11104",
    "11485A",
    "9123",
    "12255",
    "12256",
    "12257",
    "12258",
    "12259",
    "12260",
    "10918",
    "10919",
    "11476",
    "11695",
    "9122",
    "10935",
    "11026",
    "10497A",
    "11414",
    "11503",
    "12756",
    "12757",
    "12758",
    "10022",
    "10025",
    "12595",
    "12593",
    "12615",
    "12617",
    "12610",
    "10002",
    "12613",
    "12616",
    "8088",
    "12110",
    "8089",
    "10014",
    "12611",
    "10013",
    "10027",
    "10024",
    "10028",
    "10026",
    "12596",
    "12600",
    "12609",
    "12601",
    "11296",
    "12605",
    "5180",
    "12602",
    "5398",
    "KER_E1023000",
    "9143",
    "KER_4402082",
    "KER_4401984",
    "KER_44015370",
    "9130",
    "8793A",
    "11470",
    "REDK_P042560",
    "REDK_P042480",
    "8021",
    "8022",
    "REDK_P027920",
    "REDK_P027790",
    "6473",
    "11262",
    "7682",
    "7685",
    "7686",
    "6479",
    "13087",
    "13088",
    "13089",
    "13090",
    "11959",
    "12085",
    "12784",
    "12795",
    "12799",
    "12808",
    "12809",
    "12856",
    "13061",
    "9097",
    "12543",
    "12557",
    "11460",
    "12558",
    "11351",
    "11352",
    "11988",
    "12771",
    "12545",
    "11473",
    "12680",
    "12681",
    "13143",
    "12679",
    "12686",
    "13142",
    "12683",
    "13144",
    "11456",
    "11457",
    "12551",
    "11454",
    "12562",
    "11455",
    "13289",
    "13290",
    "13291",
    "13292",
    "12108",
    "12267",
    "12790",
    "12815",
    "12821",
    "13060",
    "13184",
    "20510",
    "13363",
    "13364",
    "13365",
    "11214",
    "11216",
    "13641",
    "13642",
    "9226",
    "13930",
    "13932",
    "7833",
    "7834",
    "14032",
    "12272",
    "13100",
    "13565",
    "13572",
    "20295",
    "20511",
    "20521",
    "11091",
    "12151",
    "12268",
    "12761",
    "12803",
    "8702",
    "13558",
    "13575",
    "13644",
    "11003",
    "12539",
    "13059",
    "10935A",
    "13559",
    "13574",
    "14050",
    "14051",
    "14052",
    "14053",
    "12828",
    "13323",
    "13213",
    "13214",
    "13284",
    "11462",
    "12682",
    "11474",
    "11667",
    "11031",
    "11033",
    "8785",
    "13247",
    "13312",
    "KER_E1121000",
    "11644",
    "6729",
    "6730",
    "9653",
    "KER_E057430",
    "KER_4402020",
    "11032",
    "11034",
    "14223",
    "8975",
    "6731",
    "6732",
    "9225",
    "13336",
    "9127",
    "11036",
    "13236",
    "11037",
    "9132",
    "KER_E029600",
    "11035",
    "9133",
    "10354",
    "5048",
    "5053",
    "5052",
    "5057",
    "5068",
    "6076",
    "6077",
    "5050",
    "5055",
    "12001",
    "13069",
    "12626",
    "10184",
    "13337",
    "8783",
    "9224",
    "13321",
    "14299",
    "14300",
    "6465",
    "12273",
    "13968",
    "13970",
    "13084",
    "6282",
    "7537",
    "7689",
    "100101",
    "5001",
    "9963",
    "14035",
    "14036",
    "14037",
    "10935B",
    "11140",
    "14022",
    "4705",
    "9014",
    "14038",
    "14039",
    "14040",
    "14141",
    "14142",
    "14143",
    "14144",
    "10121",
    "11311",
    "7453",
    "8282",
    "11259",
    "11260",
    "14519",
    "14686",
    "6474",
    "6482",
    "6475",
    "6478",
    "7999",
    "8001",
    "7687",
    "7688",
    "8714",
    "8717",
    "9895",
    "9898",
    "9899",
    "12266",
    "12816",
    "9102",
    "12269",
    "12279",
    "14362",
    "14355",
    "5365",
    "12278",
    "13867",
    "14348",
    "14612",
    "14683",
    "13580",
    "14341",
    "14351",
    "13080",
    "13082",
    "14153",
    "14602",
    "9115",
    "20109",
    "20110",
    "20111",
    "20112",
    "13249",
    "13248",
    "13250",
    "13253",
    "13969",
    "14078",
    "14110",
    "14111",
    "11666",
    "11772",
    "20270",
    "4007",
    "40188",
    "4247",
    "5939",
    "4860",
    "6338",
    "6339",
    "8611",
    "11688",
    "11929",
    "40182",
    "41530",
    "43379",
    "5288",
    "10023",
    "10764",
    "11838",
    "20060",
    "20102",
    "20358",
    "20079",
    "41470",
    "4634",
    "7250",
    "20383",
    "20384",
    "20386",
    "20387",
    "12046",
    "14032C",
    "8296",
    "11566",
    "9678",
    "13297",
    "13456",
    "9141A",
    "12109",
    "12271",
    "13664",
    "20117",
    "20122",
    "12948",
    "12950",
    "20118",
    "20119",
    "12949",
    "20114",
    "20516",
    "20517",
    "20518",
    "20519",
    "20520",
    "14090",
    "13405",
    "11417A",
    "14336",
    "20562",
    "20563",
    "20556",
    "20557",
    "20605",
    "20605A",
    "20581",
    "20582",
    "20544",
    "20575",
    "20590",
    "20591",
    "20573",
    "20574",
    "20547",
    "20548",
    "20600",
    "20601",
    "20568",
    "20569",
    "20570",
    "20571",
    "20564",
    "20535",
    "20536",
    "20537",
    "20554",
    "20555",
    "20597",
    "20604",
    "20538",
    "20565",
    "20583",
    "20549",
    "20561",
    "20587",
    "20594",
    "20596",
    "20546",
    "20577",
    "20580",
    "20543",
    "20578",
    "20541",
    "20642",
    "20643",
    "20644",
    "20645",
    "6466",
    "9894",
    "8713",
    "13296",
    "MOR_MO0094",
    "MOR_MO0096",
    "12277",
    "12290",
    "12153",
    "20805",
    "20808",
    "20809",
    "20810",
    "20814",
    "20819",
    "20813",
    "20815",
    "20820",
    "20646",
    "20647",
    "20648",
    "20649",
    "20870",
    "13387",
    "13406",
    "13413",
    "7215",
    "5887",
    "100851",
    "10280",
    "11234",
    "11088",
    "5756",
    "8203",
    "7165",
    "7634",
    "8533",
    "20379",
    "14790",
    "11427",
    "11431",
    "11428",
    "11425",
    "11430",
    "11432",
    "11433",
    "20939",
    "14413",
    "20955",
    "20465",
    "11483",
    "11484",
    "6258",
    "6259",
    "13332",
    "7692",
    "7608",
    "7609",
    "8490",
    "6443",
    "8493",
    "13313",
    "13314",
    "13315",
    "11200",
    "11201",
    "11199",
    "20285",
    "20286",
    "20287",
    "20288",
    "20289",
    "20290",
    "12627",
    "13311",
    "12628",
    "11740",
    "11741",
    "11992",
    "11993",
    "8248",
    "8249",
    "11991",
    "11994",
    "8250",
    "8251",
    "14568",
    "14570",
    "14569",
    "14565",
    "14527",
    "14528",
    "14555",
    "14556",
    "14538",
    "14539",
    "14540",
    "14541",
    "14546",
    "14547",
    "14548",
    "14551",
    "14552",
    "14553",
    "14554",
    "14561",
    "14562",
    "14563",
    "14549",
    "14550",
    "14560",
    "14571",
    "14572",
    "14573",
    "14574",
    "14566",
    "14567",
    "13955",
    "13956",
    "13946",
    "8729",
    "8730",
    "8727",
    "8728",
    "8725",
    "8726",
    "11258",
    "8731",
    "11230",
    "11231",
    "8723",
    "8724",
    "20239",
    "20240",
    "20249",
    "20244",
    "20245",
    "20238",
    "13961",
    "8732",
    "13945",
    "8735",
    "13944",
    "20265",
    "20266",
    "8740",
    "13936",
    "8741",
    "13951",
    "20264",
    "8736",
    "8742",
    "20258",
    "8733",
    "8739",
    "13939",
    "13943",
    "20246",
    "8737",
    "13942",
    "20251",
    "8738",
    "4681",
    "9699",
    "4154",
    "5192",
    "5193",
    "5317",
    "5260",
    "5304",
    "5355",
    "7116",
    "5303",
    "5396",
    "10317",
    "10901",
    "41463",
    "41467",
    "5185",
    "6215",
    "4636",
    "4217",
    "5176",
    "4175",
    "43904",
    "6340",
    "6337",
    "6490",
    "6498",
    "5752",
    "5670",
    "5668",
    "5759",
    "5985",
    "6754",
    "5669",
    "5753",
    "6264",
    "4290",
    "43838",
    "4881",
    "6032",
    "5988",
    "6188",
    "6728",
    "7538",
    "5757",
    "6260",
    "6261",
    "7492",
    "5032",
    "5881",
    "8490A",
    "6467",
    "6199",
    "6201",
    "40744",
    "40986",
    "8877",
    "40987",
    "41118",
    "7232",
    "7233",
    "6442",
    "7983",
    "7549",
    "8922",
    "KER_E053510",
    "KER_E053670",
    "5038",
    "5039",
    "8978",
    "8979",
    "8980",
    "MOR_MO0002",
    "9057",
    "100049",
    "9429",
    "100705",
    "7842",
    "13373",
    "9566",
    "6278",
    "6279",
    "9423",
    "7684",
    "8715",
    "8716",
    "8718",
    "6468",
    "9897",
    "6483",
    "6472",
    "6507"
]


async function fix(){
    try {
        require("./config/config").config("ah")
        for(let i = 0; i < toFix.length; i++) {
            console.log(i, toFix.length)
            const product = await getProductBySku(toFix[i])
            if(!product) {
                console.log(`no product for ${toFix[i]}`)
                continue
            }
            const categories = allhairCategoryRules(product,[])
            await updateProduct(product.id,{categories})
        }
    } catch(err){
        console.log(err)
    }
}
//fix()

const hairbrushes = [
    "20527",
    "20530",
    "20533",
    "20656",
    "20657",
    "20658",
    "20659",
    "20660",
    "20661",
    "20662",
    "20663",
    "20664",
    "20665",
    "20666",
    "20667",
    "20668",
    "20669",
    "20670",
    "20671",
    "20713",
    "20715",
    "20716",
    "20725",
    "20726",
    "20838",
    "20839",
    "20840",
    "20841",
    "20855",
    "20860",
    "20881",
    "20884",
    "20892",
    "20901",
    "20915",
    "20931",
    "20936",
    "20941",
    "20947",
    "20952",
    "20957",
    "20961",
    "20965",
    "20978",
    "20979",
    "20980",
    "20981",
    "20982",
    "20983",
    "20986",
    "21007",
    "21012",
    "21017",
    "21020",
    "21026",
    "21033",
    "21037",
    "21041",
    "21053",
    "21060",
    "21065",
    "21075",
    "21082",
    "21085",
    "21087",
    "21089",
    "21092",
    "21095",
    "21098",
    "21102",
    "21104",
    "21106",
    "21111",
    "21113",
    "21115",
    "21117",
    "21120",
    "21122",
    "21124",
    "21127",
    "21135"
]

async function brushes(){
    try {
        require("./config/config").config("ah")
        for(let i = 0; i < hairbrushes.length; i++) {
            console.log(i, hairbrushes.length)
            const product = await getProductBySku(hairbrushes[i])
            if(!product) {
                console.log(`no product for ${hairbrushes[i]}`)
                continue
            }
            const {categories} =product;
            categories.push(365)
            await updateProduct(product.id,{categories})
        }
    } catch(err){
        console.log(err)
    }
}
brushes()

async function test(){
    try {
        require("./config/config").config("ah")
        for(let i = 0; i < skus.length; i++) {
            console.log(i, skus.length)
            const product = await getProductBySku(skus[i])
            if(!product) {
                console.log(`no product for ${skus[i]}`)
                continue
            }
            const categories = [355]
            const map:{[key: number]: number} = {
                // alfaparf
                65:357,
                // color wow
                61:358,
                // kerastase
                73:359, 
                // loreal
                104:360,
                // milkshake
                139:361,
                // moroccanoil
                58:362,
                // pureology
                54:363,
                // redken
                68:364,
            }
            if(map[product.brand_id]) {
                categories.push(map[product.brand_id])
            }
            await updateProduct(product.id, {categories})
            
        }
    } catch(err){
        console.log(err)
    }
}

