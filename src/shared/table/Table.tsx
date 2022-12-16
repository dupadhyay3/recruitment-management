import { useState, useMemo } from "react";
import { sortRows, filterRows, paginateRows } from "./helpers";
import { Pagination } from "./Pagination";

export const Table = ({
  columns,
  rows,
  actions,
  onClickName,
  onClickAction,
  rowsPerPage,
  heading,
}: any) => {
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState<any>({});
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });

  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch = (value: any, accessor: any) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters: any) => {
        const updatedFilters: any = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor: any) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const clearAll = () => {
    setSort({ order: "asc", orderBy: "id" });
    setActivePage(1);
    setFilters({});
  };

  return (
    <>
      <div className="card">
        <div className="card-header flex">
          <div>
            <h5 className="card-header-title">{heading}</h5>
          </div>
          <div className="ml-auto">
            <button className="btn btn-sm btn-primary" onClick={clearAll}>
              Clear all
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-scrollable">
            <table className="table">
              <thead>
                <tr>
                  {columns.map((column: any) => {
                    const sortIcon = () => {
                      if (column.accessor === sort.orderBy) {
                        if (sort.order === "asc") {
                          return "⬆️";
                        }
                        return "⬇️";
                      } else {
                        return "️↕️";
                      }
                    };
                    return (
                      <th key={`${column.accessor}-sort`}>
                        <span
                          onClick={() => handleSort(column.accessor)}
                          className={
                            sort.order === "asc"
                              ? "sorting sorting_asc"
                              : "sorting sorting_desc"
                          }
                        >
                          {column.label}
                        </span>
                      </th>
                    );
                  })}
                  <th>{actions && <span>Action</span>}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  {columns.map((column: any, index: any) => {
                    return (
                      <td key={`${index}-search`}>
                        <input
                          className="form-control form-control-sm"
                          type="search"
                          placeholder={`Search ${column.label}`}
                          value={filters[column.accessor]}
                          onChange={(event) =>
                            handleSearch(event.target.value, column.accessor)
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
                {calculatedRows.map((row: any, index: number) => {
                  return (
                    <tr key={`${index}-row`}>
                      {columns.map((column: any, index: any) => {
                        return (
                          <>
                            {column.accessor !== "isCorrect" && (
                              <td
                                onClick={() => onClickName(row._id)}
                                key={column.accessor}
                              >
                                {row[column.accessor]}
                              </td>
                            )}
                            {column.accessor === "isCorrect" && (
                              <td
                                onClick={() => onClickName(row._id)}
                                key={column.accessor}
                              >
                                {/* {row[column.accessor]}  */}
                                {row[column.accessor] === "true" ? (
                                  <span className="text-green-500 flex">
                                    <span className="pr-1">
                                      <svg
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20"
                                        width="20"
                                      >
                                        <path d="m8.938 13 4.958-4.938L12.833 7l-3.895 3.875-1.771-1.75-1.063 1.063ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                                      </svg>
                                    </span>
                                  </span>
                                ) : row[column.accessor] === "false" ? (
                                  <span className="text-red-500 flex">
                                    <span className="pr-1">
                                      <svg
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20"
                                        width="20"
                                      >
                                        <path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                                      </svg>
                                    </span>
                                  </span>
                                ) : (
                                  <span>Query</span>
                                )}
                              </td>
                            )}
                          </>
                        );
                      })}
                      <td>
                        {actions &&
                          actions?.map((action: any, index: number) => (
                            <span
                              className={`flex cursor-pointer text-blue-500`}
                              key={`${index}-result`}
                              onClick={() =>
                                onClickAction(row?._id, action?.name)
                              }
                            >
                              {action?.name}

                              <span className={`pl-2`}>
                                {" "}
                                <svg
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="20"
                                  width="20"
                                >
                                  <path d="M5.062 16 4 14.938 12.938 6H8V4.5h7.5V12H14V7.062Z" />
                                </svg>
                              </span>
                            </span>
                          ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer flex items-center">
          {count > 0 ? (
            <Pagination
              activePage={activePage}
              count={count}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
              setActivePage={setActivePage}
            />
          ) : (
            <p>No data found</p>
          )}
        </div>
      </div>
    </>
  );
};
