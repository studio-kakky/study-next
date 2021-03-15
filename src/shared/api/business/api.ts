import { YelpBusinessApiGetInputModel } from './get-input-model';
import { YelpGetBusinessSearchApiResponse } from './response';
import { getAuthorizationHeader } from '../lib/get-authorized-header';

const endpointURL = 'https://api.yelp.com/v3/businesses/search';

export const getYelpBusiness = async (
  model: YelpBusinessApiGetInputModel,
): Promise<YelpGetBusinessSearchApiResponse> => {
  const params = new URLSearchParams(model.getQueries());
  const res = await fetch(`${endpointURL}?${params}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthorizationHeader(),
    },
  });

  return res.json();
};
