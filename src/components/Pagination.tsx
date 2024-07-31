// Pagination.tsx
import React from 'react';
import { Pagination as BootstrapPagination, Form } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  totalRows: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalRows,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <Form.Select
        style={{ width: 'auto' }}
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
      </Form.Select>
      <BootstrapPagination>
        <BootstrapPagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
        <BootstrapPagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <BootstrapPagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </BootstrapPagination.Item>
        ))}
        <BootstrapPagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <BootstrapPagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
      </BootstrapPagination>
      <div>
        Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows} entries
      </div>
    </div>
  );
};

export default Pagination;