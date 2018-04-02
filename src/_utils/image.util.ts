import { ENV } from '../config/config.dev';

export module ImageUtil {
  export function createImageUrl(id: string, images: string) {
    return ENV.BASE_URL + `/assets/images/${id}/${images}`;

  }
}

export function getImage(page: string, iconBaseName: string): string {
  let link = location.hash.split('/')[1];
  if (page === link) {
    return iconBaseName + '-selected.svg';
  } else {
    return iconBaseName + '.svg';
  }
}