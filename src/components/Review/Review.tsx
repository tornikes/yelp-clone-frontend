import { Review } from "../../types";
import { Rating } from "react-simple-star-rating";
import classes from "./Review.module.css";

interface ReviewProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewProps) {
  const rating = review.rating * 20;

  return (
    <div className={classes.review}>
      <header className={classes.header}>
        <div>{review.user.userName}</div>
        <Rating ratingValue={rating} size={20} readonly />
        <p>{new Date(review.createdAt).toLocaleDateString("en-US")}</p>
      </header>
      <section>{review.reviewContents}</section>
    </div>
  );
}
