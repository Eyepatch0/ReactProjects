import { useEffect, useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
function List() {
  let [type, setType] = useState("");
  let [data, setData] = useState([]);
  let [thead, setThead] = useState([]);

  //pagination
  // the page number is stored in the state
  let [currentPage, setCurrentPage] = useState(1);
  // setting the limit of data to be shown on a page
  let [itemsPerPage, setItemsPerPage] = useState(10);
  // useEffect is used to fetch data from api and set thead and tbody
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/${type}`
        );
        const json = await response.json();
        setData(json);
        setThead(Object.keys(json[0]));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [type]);
  // useEffect hook is used to fetch data from api and set data and thead state variables when type state variable changes.

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () =>
    setCurrentPage((nextPage) => {
      if (nextPage > 1) {
        return nextPage - 1;
      }
      return nextPage;
    });
  const nextPage = () =>
    setCurrentPage((prevPage) => {
      if (prevPage < Math.ceil(data.length / itemsPerPage)) {
        return prevPage + 1;
      }
      return prevPage;
    });
  return (
    <>
      <div id="button_container">
        <button
          onClick={() => {
            setType("posts");
            setItemsPerPage(10);
            setCurrentPage(1);
          }}
          className="button_click"
        >
          Posts
        </button>
        <button
          onClick={() => {
            setType("users");
            setItemsPerPage(5);
            setCurrentPage(1);
          }}
          className="button_click"
        >
          Users
        </button>
        <button
          onClick={() => {
            setType("comments");
            setItemsPerPage(50);
            setCurrentPage(1);
          }}
          className="button_click"
        >
          Comments
        </button>
      </div>
      <h1>{type}</h1>
      <Table thead={thead} tbody={currentItems} />
      {data.length > 0 ? (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
          className="nav-bar-style"
        />
      ) : null}
    </>
  );
}

export default List;
