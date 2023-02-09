import { FacultyModel } from "./faculty.model";

export class FacultyFilterModel {
    faculty: FacultyModel[];
    facultyFilterValue: FacultyFilterValueModel[];
    psuID: string;
    keyword: string;
}

export class FacultyFilterValueModel {
    checkedValue: string;
    categoryValue: string;
}