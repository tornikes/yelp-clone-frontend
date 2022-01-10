import { RestaurantPreview } from "../../types";
import { Rating } from "react-simple-star-rating";
import classes from "./RestaurantCard.module.css";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  restaurant: RestaurantPreview;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  let { rating } = restaurant;
  if (rating === null) {
    rating = 3.5;
  }
  rating *= 20;

  return (
    <div>
      <div className={classes.cardImageAndRating}>
        <img
          className={classes.cardImage}
          alt={restaurant.name}
          src={restaurant.imageUrl}
        />
        <div className={classes.ratingsContainer}>
          <Rating
            initialValue={rating}
            ratingValue={rating}
            size={25}
            readonly
          />
        </div>
      </div>
      <h3>{restaurant.name}</h3>
      <div>
        <p>{restaurant.description.slice(0, 250)}...</p>
        <Link to="/places">read more</Link>
      </div>
    </div>
  );
}
