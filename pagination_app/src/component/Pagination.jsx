import { GoArrowRight, GoArrowLeft } from "react-icons/go";
const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  prevPage,
  nextPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="nav-bar-style">
      <li>
        <a href="!#" onClick={() => prevPage()}>
          <GoArrowLeft />
        </a>
      </li>
      {pageNumbers.map((num) => (
        <li key={num}>
          <a href="!#" onClick={() => paginate(num)}>
            {num}
          </a>
        </li>
      ))}
      <li>
        <a href="!#" onClick={() => nextPage()}>
          <GoArrowRight />
        </a>
      </li>
    </nav>
  );
};

export default Pagination;
