//this is DEV MODE
// const base_url = 'https://staging.api.kts.slatedev.com/api'; // staging server
// const base_url = 'https://beta.api.kts.slatedev.com/api'; // beta server
const base_url = 'https://api.ktsutah.com/api'; // production server
export const ENV = {
  BASE_URL: base_url,
  API_URL: base_url,
  PRODUCTION: false
  // other properties with values for the dev environment
};
