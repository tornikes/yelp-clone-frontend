import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import usePageQuery from "../../hooks/usePageQuery";
import { useApiContext } from "../ApiContext/ApiContext";
import { useQuery } from "react-query";
import classes from "./RestaurantDisplay.module.css";

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
  }, [restaurantCount, page, totalPages, setPage]);

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
      Here we display restaurants You are on page <strong>{page}</strong>
      data! {data?.length}
      <div className={classes.restaurantGrid}>
        {data?.map((item: any) => (
          <p key={item.name}>{item.name}</p>
        ))}
      </div>
      <ReactPaginate
        containerClassName={classes.paginationContainer}
        pageClassName={classes.pageIndicator}
        previousClassName={classes.pageIndicator}
        nextClassName={classes.pageIndicator}
        activeClassName={classes.activePage}
        pageCount={totalPages}
        onPageChange={({ selected }) => {
          setPage(selected + 1);
        }}
      />
    </div>
  );
}
