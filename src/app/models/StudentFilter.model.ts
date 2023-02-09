import { StudentModel } from "./student.model";

export class StudentFilterModel {
    student: StudentModel[];
    filterValue: StudentFilterValueModel[];
    psuID: string;
    keyword: string;
}

export class StudentFilterValueModel {
    checkedValue: string;
    categoryValue: string;
}