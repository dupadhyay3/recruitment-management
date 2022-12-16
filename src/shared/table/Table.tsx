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
          <button className="btn btn-sm btn-primary" onClick={clearAll}>Clear all</button>
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
                      <span onClick={() => handleSort(column.accessor)} className={sort.order === 'asc' ? "sorting sorting_asc" : "sorting sorting_desc"}>{column.label}</span>
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
                        <td
                          onClick={() => onClickName(row._id)}
                          key={column.accessor}
                        >
                          {row[column.accessor]}
                        </td>
                      );
                    })}
                    <td>
                      {actions &&
                        actions?.map((action: any, index: number) => (
                          <span
                            key={`${index}-result`}
                            onClick={() => onClickAction(row?._id, action?.name)}
                          >
                            {action?.name}
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
