import { User as ApiUser } from '../_models/user.model';
import { UserProgress as ApiUserProgress } from '../_models/user-progress.model';
import { Scholarship as ApiScholarship } from '../_models/scholarship.model';

export module Model {
    export type User = ApiUser;
    export const User = ApiUser;
    export type UserProgress = ApiUserProgress;
    export const UserProgress = ApiUserProgress;
    export type Scholarship = ApiScholarship;
    export const Scholarship = ApiScholarship;
    
    export function initializeArray<T>(array: T[], type: string): any[] {
        let newArray: T[] = [];
        if (array) {
            for (const instance of array) {
                newArray.push(new Model[type](instance));
            }
        }
        return newArray;
    }
}
  