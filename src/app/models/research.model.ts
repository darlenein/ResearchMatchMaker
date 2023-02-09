import { SubDepartmentModel } from "./subdepartment.model";

export class ResearchModel {
    research_Id: number;
    faculty_Id: string;
    name: String;
    description: String;
    location: string;
    required_Skills: String;
    encouraged_Skills: String;
    start_Date: String;
    end_Date: String;
    active: boolean;
    studentID: String;
    address: String;
    
    // faculty first and last name 
    first_Name: String; 
    last_Name: String;

    splitEncouragedSkills: String;
    splitRequiredSkills: String;
    progress_Bar: number;
    isPaid: boolean;
    isNonpaid: boolean;
    isCredit: boolean;
    researchDepts: string[];
    departments: SubDepartmentModel[];
}