export interface BpProductInfo {
    productId: number;
    productName: string;
    SKU: string;
    barcode: string;
    EAN: string | null;
    UPC: string | null;
    ISBN: string | null;
    MPN: string | null;
    stockTracked: boolean;
    salesChannelName: string;
    createdOn: string;
    updatedOn: string;
    brightpearlCategoryCode: number;
    productGroupId: number;
    brandId: number;
    productTypeId: number;
    productStatus: string;
    primarySupplierId: number;
  }
  