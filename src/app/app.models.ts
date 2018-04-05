import { User as ApiUser } from '../_models/user.model';
import { UserProgress as ApiUserProgress } from '../_models/user-progress.model';
import { Scholarship as ApiScholarship } from '../_models/scholarship.model';
import { Notification as ApiNotification } from '../_models/notification.model';
import { Prize as ApiPrize } from '../_models/prize.model';
import { Opportunity as ApiOpportunity } from '../_models/opportunity.model';
import { Organization as ApiOrganization } from '../_models/organization.model';
import { Address as ApiAddress } from '../_models/address.model';
import { Keycard as ApiKeycard } from '../_models/keycard.model';
import { CareerGroup as ApiCareerGroup } from '../_models/career-group.model';
import { Career as ApiCareer } from '../_models/career.model';
import { MessageBoard as ApiMessageBoard } from '../_models/messageboard.model';

export module Model {
    export type User = ApiUser;
    export const User = ApiUser;
    export type UserProgress = ApiUserProgress;
    export const UserProgress = ApiUserProgress;
    export type Scholarship = ApiScholarship;
    export const Scholarship = ApiScholarship;
    export type Notification = ApiNotification;
    export const Notification = ApiNotification;
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
    export type CareerGroup = ApiCareerGroup;
    export const CareerGroup = ApiCareerGroup;
    export type Career = ApiCareer;
    export const Career = ApiCareer;
    export type MessageBoard = ApiMessageBoard;
    export const MessageBoard = ApiMessageBoard;

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
