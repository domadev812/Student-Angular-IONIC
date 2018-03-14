import { Model } from '../app/app.models';


export module MultiSelectUtil {

  export const gradYearList = [
    //TODO: populate with real data
    { 'id': 1, 'itemName': '2020' },
    { 'id': 2, 'itemName': '2019' },
    { 'id': 3, 'itemName': '2018' },
    { 'id': 4, 'itemName': '2017' }
  ];

  export const genderList = [
    //TODO: populate with real data
    { 'id': 1, 'itemName': 'Male' },
    { 'id': 2, 'itemName': 'Female' },
    { 'id': 3, 'itemName': 'Other' },
  ];


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