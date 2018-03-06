import { User as ApiUser } from '../_models/user.model';
import { UserProgress as ApiUserProgress } from '../_models/user-progress.model';
import { Scholarship as ApiScholarship } from '../_models/scholarship.model';
import { Notifications as ApiNotifications } from '../_models/notifications.model';

export module Model {
    export type User = ApiUser;
    export const User = ApiUser;
    export type UserProgress = ApiUserProgress;
    export const UserProgress = ApiUserProgress;
    export type Scholarship = ApiScholarship;
    export const Scholarship = ApiScholarship;
    export type Notifications = ApiNotifications;
    export const Notifications = ApiNotifications;

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
