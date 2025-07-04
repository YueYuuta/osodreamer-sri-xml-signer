import { IVA_PERCENTAGE_CODE_ENUM } from "../enums/iva-percent-code.enum";

export const IVA_PERCENTAGE_LABELS: Record<IVA_PERCENTAGE_CODE_ENUM, string> = {
  [IVA_PERCENTAGE_CODE_ENUM.IVA_0]: "0 (0%)",
  [IVA_PERCENTAGE_CODE_ENUM.IVA_12]: "2 (12%)",
  [IVA_PERCENTAGE_CODE_ENUM.IVA_14]: "3 (14%)",
  [IVA_PERCENTAGE_CODE_ENUM.IVA_15]: "4 (15%)",
  [IVA_PERCENTAGE_CODE_ENUM.IVA_5]: "5 (5%)",
  [IVA_PERCENTAGE_CODE_ENUM.NO_OBJETO_IVA]: "6 (No objeto de IVA)",
  [IVA_PERCENTAGE_CODE_ENUM.EXENTO_IVA]: "7 (Exento de IVA)",
  [IVA_PERCENTAGE_CODE_ENUM.IVA_DIFERENCIADO]: "8 (IVA diferenciado)",
  [IVA_PERCENTAGE_CODE_ENUM.IVA_13]: "10 (13%)",
};
