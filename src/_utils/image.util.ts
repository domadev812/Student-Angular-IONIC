import { ENV } from '../config/config.dev';

export module ImageUtil {
  export function createImageUrl(id: string, images: string) {
    return ENV.BASE_URL + `/assets/images/${id}/${images}`;

  }
}