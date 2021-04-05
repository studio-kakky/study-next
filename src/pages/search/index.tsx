import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../layout/layout';
import Head from 'next/head';

import { Restaurant } from '../../shared/models/restaurant/restaurant';
import { getYelpBusiness } from '../../shared/api/business/api';
import { YelpBusinessApiGetInputModel } from '../../shared/api/business/get-input-model';
import { adapt } from '../../shared/models/restaurant/adapt';
import { makeViewModel } from '../../components/restaurants/view-model/view-model';
import { RestaurantViewModels } from '../../components/restaurants/view-model/view-models';
import Restaurants from '../../components/restaurants/restaurants';
import { executeExperience } from '../../shared/lib/kaizen-platform/execute-experience';

interface Props {
  location: string;
  locationName: string;
  restaurants: Restaurant[];
}

export default function Search(props: Props): JSX.Element {
  const initialList = props.restaurants.map(makeViewModel);
  const [viewModels, setViewModels] = useState(new RestaurantViewModels(initialList));
  const [page, setPage] = useState(1);
  const router = useRouter();

  const loadMore = async () => {
    const model = new YelpBusinessApiGetInputModel({ location: props.location, pageNumber: page + 1 });
    const res = await getYelpBusiness(model);
    const list = adapt(res);
    const viewModelList = list.map(makeViewModel);
    const nextViewModels = new RestaurantViewModels(viewModelList);
    setViewModels(viewModels.merge(nextViewModels));
    setPage(page + 1);
  };

  const onToggleChecked = (id: string) => {
    setViewModels(viewModels.toggleCheck(id));
  };

  useEffect(() => {
    executeExperience(router);
  }, []);

  return (
    <Layout>
      <Head>
        <title>{props.locationName}のお店の検索結果</title>
      </Head>
      <h1>{props.locationName}のお店の検索結果</h1>
      <Restaurants vms={viewModels} onToggleChecked={onToggleChecked} />
      <a onClick={loadMore}>もっと見る</a>
      <style jsx>{`
        a {
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: Props }> => {
  context.res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');

  const location = context.query.location as string;
  const model = new YelpBusinessApiGetInputModel({ location });
  const res = await getYelpBusiness(model);

  return {
    props: {
      location,
      locationName: res.locationName,
      restaurants: adapt(res),
    },
  };
};
