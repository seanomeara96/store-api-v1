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
  SCAN_DATE: string;
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

export interface FileContents {
  headerRecord: HeaderRecord;
  itemRecords: ItemRecord[];
  trailerRecord: TrailerRecord;
}

export function parseFileContents(content: string): FileContents {
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

  return new Date(year, month - 1, day, hours, minutes, seconds).toISOString()
}

(() => console.log(
  parseFileContents(`00+3709445+20230623010435+5+
01+CE+182183209+IE+GN423941/01+SORTED+20230623004243+MERRYWELL DSU LARGE PCLS+DUBLIN 6+++++
01+CE+182191409+IE+GN424965/01+SORTED+20230623001912+PORTLAOISE MAIL CENTRE+DUNMANWAY+++++
01+CE+182191562+IE+GN424925/01+SORTED+20230623004625+MERRYWELL DSU LARGE PCLS+DUBLIN 6+++++
01+CE+182192055+IE+GN424942/01+SORTED+20230623004549+MERRYWELL DSU LARGE PCLS+DUBLIN 6+++++
01+CE+182192965+IE+GN425021/01+SORTED+20230623002756+PORTLAOISE MAIL CENTRE+CLONAKILTY+++++
99+5`)))
