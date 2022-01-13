import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useApiContext } from "../ApiContext/ApiContext";
import BasicButton from "../BasicButton/BasicButton";
import classes from "./ReviewForm.module.css";

interface ReviewFormProps {
  restaurantId: string;
  onClose(): void;
}

export default function ReviewForm({ onClose, restaurantId }: ReviewFormProps) {
  const [rating, setRating] = useState(2.5);
  const [text, setText] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const { createReview } = useApiContext();

  const textLength = 50;

  async function handleSubmit() {
    if (text.length >= textLength) {
      try {
        await createReview(restaurantId, rating, text);
        onClose();
      } catch (err) {
        console.log(err);
      }
    } else {
      setShowWarning(true);
    }
  }

  return (
    <div className={classes.formContainer}>
      <form className={classes.reviewForm} onSubmit={(e) => e.preventDefault()}>
        <Rating
          ratingValue={rating * 20}
          onClick={(value) => setRating(value / 20)}
        />
        <textarea
          className={classes.textarea}
          value={text}
          onChange={(e) => {
            setShowWarning(false);
            setText(e.target.value);
          }}
        ></textarea>
      </form>
      {showWarning && (
        <div>*The review text must be at least {textLength} characters.</div>
      )}
      <BasicButton
        onClick={handleSubmit}
        className={classes.submitButton}
        theme="primary"
      >
        Submit
      </BasicButton>
      <BasicButton theme="secondary" onClick={onClose}>
        Cancel
      </BasicButton>
    </div>
  );
}
