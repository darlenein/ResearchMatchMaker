import { ResearchModel } from "./research.model";

export class FilterModel {
    research: ResearchModel[];
    filterValue: FilterValueModel[];
    psuID: string;
    keyword: string;
}

export class FilterValueModel {
    checkedValue: string;
    categoryValue: string;
}