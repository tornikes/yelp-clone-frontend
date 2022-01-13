import { useState } from "react";
import { useQuery } from "react-query";
import { useParams, Navigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useApiContext } from "../../components/ApiContext/ApiContext";
import BasicButton from "../../components/BasicButton/BasicButton";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import RestaurantReviews from "../../components/Reviews/Reviews";
import classes from "./RestaurantPage.module.css";

export default function RestaurantPage() {
  const { id } = useParams();
  const { fetchRestaurant, reviewCount, fetchReviewsPage, isLoggedIn } =
    useApiContext();
  const { data, isError, isLoading } = useQuery(["restaurant", id], () =>
    fetchRestaurant(id!)
  );

  const [showReviewForm, setShowReviewForm] = useState(false);

  if (isError) {
    return <Navigate to="/places" />;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const rating = (data?.rating || 0) * 20;

  const lastRatedAtStr = data?.lastRatedAt
    ? new Date(data.lastRatedAt).toLocaleDateString("en-us")
    : "N/A";

  return (
    <>
      <div>
        <header className={classes.header}>
          <h1 className={classes.mainHeading}>{data?.name}</h1>
          <Rating ratingValue={rating} size={35} readonly />
        </header>
        <img
          className={classes.mainImage}
          src={data?.imageUrl}
          alt={data?.name}
        />
        <div className={classes.datesAndLocation}>
          <p>
            Created at: {new Date(data!.createdAt).toLocaleDateString("en-US")}
          </p>
          <p>Last rating: {lastRatedAtStr}</p>
          <p>{data?.location}</p>
        </div>
        <p className={classes.detailedDesc}>{data?.description}</p>
        {isLoggedIn && (
          <BasicButton theme="primary" onClick={() => setShowReviewForm(true)}>
            Write a review
          </BasicButton>
        )}
        {showReviewForm && (
          <ReviewForm
            restaurantId={id!}
            onClose={() => setShowReviewForm(false)}
          />
        )}
        <RestaurantReviews
          id={id!}
          countFetcher={reviewCount}
          pageFetcher={fetchReviewsPage}
        />
      </div>
    </>
  );
}
