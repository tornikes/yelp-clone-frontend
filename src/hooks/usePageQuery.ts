import { useSearchParams } from "react-router-dom";

function validatePageParam(page: number) {
  if (Number.isNaN(page) || page <= 1) {
    page = 1;
  } else if (!Number.isInteger(page)) {
    page = Math.floor(page);
  }
  return page;
}

function usePageQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");

  let page = Number(pageParam);
  page = validatePageParam(page);

  function setPageParam(pageN: number) {
    const page = validatePageParam(pageN);
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  }

  return { page, setPage: setPageParam };
}

export default usePageQuery;
