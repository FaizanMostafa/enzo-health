// @ts-nocheck
// Table.tsx
import React, { useState, useEffect } from 'react';
import { Table as BootstrapTable, Container, Row, Col } from 'react-bootstrap';
import { FaCheck, FaMinus } from 'react-icons/fa';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import Filters from './components/Filters';
import TagComponent from './components/Tag';
import { data, filterFields } from './data';
import { Schema } from './schema';

const Table: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Schema[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // const applyFilters = () => {
  //   let result = data;
  //   Object.entries(filters).forEach(([key, value]) => {
  //     if (Array.isArray(value)) {
  //       if(value.length){
  //       result = result.filter((item) => value.includes(item[key as keyof Schema]));
  //       }
  //     } else if (typeof value === 'boolean') {
  //       result = result.filter((item) => item[key as keyof Schema] === value);
  //     } else if (typeof value === 'string') {
  //       result = result.filter((item) => 
  //         String(item[key as keyof Schema]).toLowerCase().includes(value.toLowerCase())
  //       );
  //     }
  //   });
  //   setFilteredData(result);
  //   setCurrentPage(1);
  // };

  const applyFilters = () => {
    let result = data;
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // If the filter array is empty, don't filter this field
        if (value.length === 0) return;
        
        result = result.filter((item) => {
          const itemValue = item[key as keyof Schema];
          if (Array.isArray(itemValue)) {
            // For array fields (like regions or tags)
            return value.some(v => itemValue.includes(v));
          } else {
            // For non-array fields
            return value.includes(itemValue);
          }
        });
      } else if (typeof value === 'boolean') {
        result = result.filter((item) => item[key as keyof Schema] === value);
      } else if (typeof value === 'string' && value !== '') {
        result = result.filter((item) => 
          String(item[key as keyof Schema]).toLowerCase().includes(value.toLowerCase())
        );
      }
      // If value is an empty string, don't apply any filter for this field
    });
    setFilteredData(result);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);



  const handleFilterChange = (newFilters: Record<string, any>) => {
    console.log("handleFilterChange", {newFilters, all: { ...filters, ...newFilters }})
    setFilters({ ...filters, ...newFilters });
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  console.log("filters", filters)

  const handleSearch = (searchTerm: string) => {
    // Parse the search term and update filters
    const newFilters = parseSearchTerm(searchTerm);
    setFilters(newFilters);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Filters
            filters={filters}
            filterFields={filterFields}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </Col>
        <Col md={9}>
        <SearchBar filters={filters} onSearch={handleSearch} />
          <BootstrapTable striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Regions</th>
                <th>Tags</th>
                <th>Active</th>
                <th>Public</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.regions?.join?.(', ')}</td>
                  <td>
                    {row.tags.map((tag) => (
                      <TagComponent key={tag} tag={tag} />
                    ))}
                  </td>
                  <td>{row.active ? <FaCheck /> : <FaMinus />}</td>
                  <td>{row.public ? <FaCheck /> : <FaMinus />}</td>
                </tr>
              ))}
            </tbody>
          </BootstrapTable>
          <Pagination
            currentPage={currentPage}
            totalRows={filteredData.length}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Table;

function parseSearchTerm(searchTerm: string): Record<string, any> {
  // Split the search term into individual filters
  const filterPairs = searchTerm.match(/(\w+):([\w,]+)/g) || [];
  
  // Convert the filter pairs into an object
  return filterPairs.reduce((acc, pair) => {
    const [key, value] = pair.split(':');
    if (acc[key]) {
      // If the key already exists, make it an array or add to existing array
      acc[key] = Array.isArray(acc[key]) ? [...acc[key], value] : [acc[key], value];
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}