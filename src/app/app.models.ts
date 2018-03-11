import { User as ApiUser } from '../_models/user.model';
import { UserProgress as ApiUserProgress } from '../_models/user-progress.model';
import { Scholarship as ApiScholarship } from '../_models/scholarship.model';
import { Notifications as ApiNotifications } from '../_models/notifications.model';
import { Prize as ApiPrize } from '../_models/prize.model';
import { Opportunity as ApiOpportunity } from '../_models/opportunity.model';
import { Organization as ApiOrganization } from '../_models/organization.model';
import { Address as ApiAddress } from '../_models/address.model';
import { Keycard as ApiKeycard } from '../_models/keycard.model';


export module Model {
    export type User = ApiUser;
    export const User = ApiUser;
    export type UserProgress = ApiUserProgress;
    export const UserProgress = ApiUserProgress;
    export type Scholarship = ApiScholarship;
    export const Scholarship = ApiScholarship;
    export type Notifications = ApiNotifications;
    export const Notifications = ApiNotifications;
    export type Organization = ApiOrganization;
    export const Organization = ApiOrganization;
    export type Prize = ApiPrize;
    export const Prize = ApiPrize;
    export type Address = ApiAddress;
    export const Address = ApiAddress;
    export type Opportunity = ApiOpportunity;
    export const Opportunity = ApiOpportunity;
    export type Keycard = ApiKeycard;
    export const Keycard = ApiKeycard;

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
