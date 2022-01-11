import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import usePageQuery from "../../hooks/usePageQuery";
import { useApiContext } from "../ApiContext/ApiContext";
import { useQuery } from "react-query";
import classes from "./RestaurantDisplay.module.css";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import Paginage from "../Paginate/Paginate";
import Paginate from "../Paginate/Paginate";

export default function RestaurantDisplay() {
  const { page, setPage } = usePageQuery();
  const [totalPages, setTotalPages] = useState(1);
  const { restaurantCount, fetchRestaurantsPage } = useApiContext();

  useEffect(() => {
    (async () => {
      const count = await restaurantCount();
      const pages = Math.ceil(count / 9);
      if (page > pages) {
        setPage(1);
      }
      setTotalPages(pages);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { data, isLoading } = useQuery(
    ["restaurants", page],
    () => fetchRestaurantsPage(page),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className={classes.displayContainer}>
      <div className={classes.restaurantGrid}>
        {data?.map((item) => (
          <RestaurantCard key={item.id} restaurant={item} />
        ))}
      </div>
      <Paginate totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
