import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import BasicButton from "../BasicButton/BasicButton";
import classes from "./ReviewForm.module.css";

interface ReviewFormProps {
  onClose(): void;
}

export default function ReviewForm({ onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(2.5);
  const [text, setText] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const textLength = 50;

  function handleSubmit() {
    if (text.length >= textLength) {
      console.log({ rating, text });
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
