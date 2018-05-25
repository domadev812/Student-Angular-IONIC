export module MultiSelectUtil {

  export const genderList = [
    //TODO: populate with real data
    { 'id': 1, 'itemName': 'Male' },
    { 'id': 2, 'itemName': 'Female' },
    { 'id': 3, 'itemName': 'Prefer Not To Say' },
  ];

  export function setGradYear() {
    const gradYearList = [];
    const month = new Date().getMonth();
    if (month <= 5) {
      this.gradYear = new Date().getFullYear() - 1;
    } else {
      this.gradYear = new Date().getFullYear();
    }
    Array.from(Array(4)).map((_, index) => {
      const value = index + 1;
      gradYearList.push({ 'id': value, 'itemName': `${this.gradYear + value}` });
    });
    return gradYearList;
  }

  export class SelectItem {
    constructor(public itemName: string, public id: string) { }

    static model_values: any = {
      School: 'name'
    };

    static buildFromData(data: any, model_name: string): SelectItem[] {
      return data.map((item: any) => {
        return new SelectItem(item[this.model_values[model_name]], item.id);
      });
    }
  }


  export function selectOptions(options: SelectOptions): SelectOptions {
    return {
      text: options.text || 'MAKE SELECTION',
      enableCheckAll: options.enableCheckAll || false,
      enableSearchFilter: options.enableSearchFilter || true,
      classes: options.classes || 'kts-multiselect',
      unSelectAllText: options.unSelectAllText || 'UnSelect All',
      singleSelection: options.singleSelection || true
    };
  }


  export interface SelectOptions {
    singleSelection?: boolean;
    text?: string;
    enableCheckAll?: boolean;
    selectAllText?: string;
    unSelectAllText?: string;
    enableSearchFilter?: boolean;
    maxHeight?: number;
    badgeShowLimit?: number;
    classes?: string;
    limitSelection?: number;
    disabled?: boolean;
    searchPlaceholderText?: string;
    groupBy?: string;
    searchAutoFocus?: boolean;
  }


}