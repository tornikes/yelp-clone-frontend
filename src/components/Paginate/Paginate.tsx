import ReactPaginate from "react-paginate";
import classes from "./Paginate.module.css";

interface PaginateProps {
  totalPages: number;
  setPage(page: number): void;
}

export default function Paginate({ totalPages, setPage }: PaginateProps) {
  return (
    <ReactPaginate
      containerClassName={classes.paginationContainer}
      pageClassName={classes.pageIndicator}
      previousClassName={classes.pageIndicator}
      nextClassName={classes.pageIndicator}
      activeClassName={classes.activePage}
      disabledClassName={classes.disabled}
      pageCount={totalPages}
      onPageChange={({ selected }) => {
        setPage(selected + 1);
      }}
    />
  );
}
