import { SubDepartmentModel } from "./subdepartment.model";

export class ResearchModel {
    id: number;
    faculty_Id: string;
    name: String;
    description: String;
    location: string;
    required_skills: String;
    encouraged_Skills: String;
    start_Date: String;
    end_Date: String;
    active: boolean;
    studentID: String;
    // incentive_type: String;
    address: String;
    faculty_FirstName: String;
    faculty_LastName: String;
    splitEncouragedSkills: String;
    splitRequiredSkills: String;
    progression: number;
    isPaid: boolean;
    isNonpaid: boolean;
    isCredit: boolean;
    researchDepts: string[];
    departments: SubDepartmentModel[];
}