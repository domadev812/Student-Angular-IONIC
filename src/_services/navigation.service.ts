import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  public currentPage: string;
  public HOME = 'MyKtsPage';
  public LOGIN = 'LoginPage';
  public TUTORIAL = 'TutorialPage';

  constructor() { }

}