// grabs location and returns active-link class if the page is equal to location
export module NavUtil {
  export const HOME = 'ProfilePage';
  export const LOGIN = 'LoginPage';

  export const NO_NAVBAR_PAGES = {
    'LoginPage': true,
    'SignupPage': true,
    'ForgotPasswordPage': true,
    'ResetPage': true,
    'MorePage': true,
    'TutorialPage': true
  };

  export const moreTabPages = [
    'account-settings',
    'my-careers',
    'notifications',
    'progress-tracker',
    'tools'
  ];

  export function getActiveLink(page: string): string {
    let link = location.hash.split('/')[1];
    let isMore: boolean = page === 'more' && this.isMorePage();
    if (page === link || isMore) {
      return 'active-link';
    }
  }

  export function getNavIcon(page: string, iconBaseName: string): string {
    let link = location.hash.split('/')[1];
    if (page === link) {
      return iconBaseName + '-selected.svg';
    } else {
      return iconBaseName + '.svg';
    }
  }


  export function isMorePage(): boolean {
    let link = location.hash.split('/')[1];
    let filter = this.moreTabPages.filter((page) => {
      if (page === link) {
        return page;
      }
    });
    if (filter.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  export function getMoreIcon(additional: string = ''): string {
    if (this.isMorePage()) {
      return 'icon/more' + additional + '-selected.svg';
    } else {
      return 'icon/more' + additional + '.svg';
    }
  }


}