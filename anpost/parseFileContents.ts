export interface HeaderRecord {
  RECORD_TYPE: string;
  CUSTOMER_ID: number;
  FILE_DATE: string;
  NO_OF_RECORDS: number;
}

export interface ItemRecord {
  RECORD_TYPE: string;
  PRODUCT_CODE: string;
  ITEM_NUMBER: number;
  COUNTRY_CODE: string;
  CUSTOMER_ITEM_ID: string;
  SCAN_TYPE: string;
  SCAN_DATE: Date;
  LOCATION: string;
  DESTINATION_OFFICE?: string;
  DESTINATION_COUNTRY?: string;
  DELIVERY_STATUS?: string;
  RECEIVER_NAME?: string;
  ADDITIONAL_INFO?: string;
  GPS_LOCATION?: string;
}

export interface TrailerRecord {
  RECORD_TYPE: string;
  NO_OF_RECORDS: number;
}

export function parseFileContents(content: string) {
  const rows = content.split("\n").map((i) => i.split("+"));

  const headerRecord: HeaderRecord = (function () {
    const [RECORD_TYPE, CUSTOMER_ID, FILE_DATE, NO_OF_RECORDS] = rows[0];
    return {
      RECORD_TYPE,
      CUSTOMER_ID: parseInt(CUSTOMER_ID),
      FILE_DATE,
      NO_OF_RECORDS: parseInt(NO_OF_RECORDS),
    };
  })();

  const itemRecords: ItemRecord[] = [];
  for (let i = 1; i < rows.length - 1; i++) {
    const row = rows[i];

    const [
      RECORD_TYPE,
      PRODUCT_CODE,
      ITEM_NUMBER,
      COUNTRY_CODE,
      CUSTOMER_ITEM_ID,
      SCAN_TYPE,
      SCAN_DATE,
      LOCATION,
      DESTINATION_OFFICE,
      DESTINATION_COUNTRY,
      DELIVERY_STATUS,
      RECEIVER_NAME,
      ADDITIONAL_INFO,
      GPS_LOCATION,
    ] = row;

    const itemRecord: ItemRecord = {
      RECORD_TYPE,
      PRODUCT_CODE,
      ITEM_NUMBER: parseInt(ITEM_NUMBER),
      COUNTRY_CODE,
      CUSTOMER_ITEM_ID,
      SCAN_TYPE,
      SCAN_DATE: parseDateString(SCAN_DATE),
      LOCATION,
      DESTINATION_OFFICE,
      DESTINATION_COUNTRY,
      DELIVERY_STATUS,
      RECEIVER_NAME,
      ADDITIONAL_INFO,
      GPS_LOCATION,
    };

    itemRecords.push(itemRecord);
  }

  const trailerRecord: TrailerRecord = (function () {
    const [RECORD_TYPE, NO_OF_RECORDS] = rows[rows.length - 1];
    return {
      RECORD_TYPE,
      NO_OF_RECORDS: parseInt(NO_OF_RECORDS),
    };
  })();

  return { headerRecord, itemRecords, trailerRecord };
}

function parseDateString(dateString: string) {
  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(4, 6));
  const day = parseInt(dateString.substring(6, 8));
  const hours = parseInt(dateString.substring(8, 10));
  const minutes = parseInt(dateString.substring(10, 12));
  const seconds = parseInt(dateString.substring(12, 14));

  return new Date(year, month - 1, day, hours, minutes, seconds);
}

// console.log(
//   parseFileContents(`00+3701321+20180110140536+17+
// 01+CE+656087653+IE+ABC123+ITEM ON HAND+20180110132919+LITTLE ISLAND D.S.U.++++++
// 01+CE+656087653+IE+CE656087653IE+POD PROCESSED+20180110180000+LITTLE ISLAND D.S.U.+++DELIVERED+++
// 01+CE+789457748+IE+CE789457748IE+DELIVERED+20180110122619+NEWBRIDGE+++DELIVERED+J BENNETT++
// 01+CE+789457907+IE+CE789457907IE+DELIVERED+20180110130728+PORTLAOISE D.S.U.+++DELIVERED+ASHLING COOPER++
// 01+CE+789458496+IE+1354456904+DELIVERED+20180110130349+KILMALLOCK D.S.U.+++DELIVERED+H HANNI++
// 01+CE+789458726+IE+CE789458726IE+DELIVERED+20180110125729+GOREY D.S.U.+++DELIVERED+CLIONA WALSH++
// 01+CE+789458774+IE+CE789458774IE+DELIVERED+20180110125729+GOREY D.S.U.+++DELIVERED+CLIONA WALSH++
// 01+CE+789459647+IE+1354456905+DELIVERED+20180110132427+DUNSHAUGHLIN D.S.U.+++DELIVERED+INGA BERGEN++
// 01+CE+789459704+IE+CE789459704IE+DELIVERED+20180110133730+DUNSHAUGHLIN D.S.U.+++DELIVERED+ANGIE JONES++
// 01+CE+789459752+IE+CE789459752IE+DELIVERED+20180110125520+BALLYHAUNIS+++DELIVERED+BRENDAN FARRELL++
// 01+CE+789459885+IE+CE789459885IE+POD PROCESSED+20180110180000+CLAREMORRIS D.S.U.+++DELIVERED+J GREEN++
// 01+CE+789460115+IE+CE789460115IE+ATTEMPTED DELIVERY+20180110132923+LONGFORD D.S.U.+++GONE AWAY+++
// 01+CE+789460115+IE+CE789460115IE+ITEM ON HAND+20180110134005+LONGFORD D.S.U.++++++
// 01+CE+789461359+IE+CE789461359IE+DELIVERED+20180110114624+GLENGARRIFF+++DELIVERED+AISLING LONG++
// 01+CE+789461393+IE+CE789461393IE+ATTEMPTED DELIVERY+20180110134119+MIDLETON+++REFUSED+++
// 01+CE+789461420+IE+CE789461420IE+DELIVERED+20180110123935+EYERIES+++DELIVERED+GERALDINE O SULLIVAN++
// 01+CE+789462425+IE+CE789462425IE+DELIVERED+20180110131945+KILLARNEY D.S.U.+++DELIVERED+AIDAN BENSON++
// 99+17`)
// );
