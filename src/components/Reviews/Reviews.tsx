import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { Review } from "../../types";
import Paginate from "../Paginate/Paginate";

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
      console.log(`COUNT IS ${count}`);
      const pages = Math.ceil(count / 5);
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
          <p>{item.reviewContents}</p>
        ))}
      </div>
      <Paginate totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
