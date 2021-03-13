import { Restaurant } from '../../../shared/models/restaurant/restaurant';

interface ViewModelParams {
  id: string;
  budget: string;
  address: string;
  phoneNumber: string;
  rating: number;
  isChecked: boolean;
  isFavorite: boolean;
}

export class RestaurantViewModel {
  constructor(private params: ViewModelParams) {
    //
  }

  get id(): string {
    return this.params.id;
  }

  get budget(): string {
    return this.params.budget;
  }

  get address(): string {
    return this.params.address;
  }

  get phoneNumber(): string {
    return this.params.phoneNumber;
  }

  get rating(): number {
    return this.params.rating;
  }

  get isChecked(): boolean {
    return this.params.isChecked;
  }

  get isFavorite(): boolean {
    return this.params.isFavorite;
  }

  toggleCheck(): RestaurantViewModel {
    return new RestaurantViewModel({
      ...this.params,
      isChecked: !this.params.isChecked,
    });
  }

  check(): RestaurantViewModel {
    return new RestaurantViewModel({
      ...this.params,
      isChecked: true,
    });
  }

  uncheck(): RestaurantViewModel {
    return new RestaurantViewModel({
      ...this.params,
      isChecked: false,
    });
  }

  toggleFavorite(): RestaurantViewModel {
    return new RestaurantViewModel({
      ...this.params,
      isFavorite: !this.isFavorite,
    });
  }
}

export const makeViewModel = (restaurant: Restaurant): RestaurantViewModel => {
  const budget = Array.from(Array(restaurant.budgetLevel)).reduce((output) => {
    return output + '￥';
  }, '');

  const params = {
    id: restaurant.id,
    budget,
    address: restaurant.location.displayAddress.join(' '),
    phoneNumber: restaurant.phoneNumber,
    rating: restaurant.rating,
    isFavorite: false,
    isChecked: false,
  };

  return new RestaurantViewModel(params);
};