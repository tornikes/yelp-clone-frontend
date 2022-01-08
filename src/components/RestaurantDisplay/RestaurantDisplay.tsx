import ReactPaginate from "react-paginate";
import usePageQuery from "../../hooks/usePageQuery";

export default function RestaurantDisplay() {
  const { page, setPage } = usePageQuery();

  return (
    <div>
      Here we display restaurants You are on page <strong>{page}</strong>
      <ReactPaginate
        pageCount={5}
        onPageChange={({ selected }) => {
          setPage(selected + 1);
        }}
      />
    </div>
  );
}
