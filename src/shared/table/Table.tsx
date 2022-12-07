import { useState, useMemo } from 'react'
import { sortRows, filterRows, paginateRows } from './helpers'
import { Pagination } from './Pagination'

export const Table = ({ columns, rows, onClickName} : any) => {
  const [activePage, setActivePage] = useState(1)
  const [filters, setFilters] = useState<any>({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 15

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)

  const handleSearch = (value : any, accessor : any) => {
    setActivePage(1)

    if (value) {
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters: any) => {
        const updatedFilters : any = { ...prevFilters }
        delete updatedFilters[accessor]

        return updatedFilters
      })
    }
  }

  const handleSort = (accessor : any) => {
    setActivePage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column : any) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return '⬆️'
                  }
                  return '⬇️'
                } else {
                  return '️↕️'
                }
              }
              return (
                <th key={`${column.accessor}-sort`}>
                  <span>{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                </th>
              )
            })}
          </tr>
          <tr>
            {columns.map((column : any,index : any) => {
              return (
                <th key={`${index}-search`}>
                  <input
                    type="search"
                    placeholder={`Search ${column.label}`}
                    value={filters[column.accessor]}
                    onChange={(event) => handleSearch(event.target.value, column.accessor)}
                  />
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row : any, index : any) => {
            return (
              <tr key={`${index}-row`}>
                {columns.map((column : any, index : any) => {
                  return <td onClick={() => onClickName(row._id)} key={column.accessor}>{row[column.accessor]}</td>
                })} 
              </tr>
            )
          })}
        </tbody>
      </table>

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

      <div>
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      </div>
    </>
  )
}
