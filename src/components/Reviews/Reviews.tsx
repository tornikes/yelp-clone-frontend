import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { Review } from "../../types";
import Paginate from "../Paginate/Paginate";
import ReviewItem from "../Review/Review";

interface ReviewsProps {
  id: string;
  countFetcher(id: string): Promise<number>;
  pageFetcher(id: string, page: number): Promise<Review[]>;
}

export default function RestaurantReviews({
  id,
  countFetcher,
  pageFetcher,
}: ReviewsProps) {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const { data, isError } = useQuery(["restaurant", id, page], () =>
    pageFetcher(id, page)
  );

  useEffect(() => {
    (async () => {
      const count = await countFetcher(id);
      const pages = Math.round(count / 5) + 1;
      setTotalPages(pages);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isError) {
    return <Navigate to="/places" />;
  }

  return (
    <div>
      <div>
        {data?.map((item) => (
          <ReviewItem key={item.id} review={item} />
        ))}
      </div>
      <Paginate totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
