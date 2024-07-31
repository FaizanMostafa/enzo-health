// Filters.tsx
import React from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';
import { DataTableFilterField } from '../types';
import { Schema } from '../schema';
import "./filters.css";

interface FiltersProps {
  filters: Record<string, any>;
  filterFields: DataTableFilterField<Schema>[];
  onFilterChange: (filters: Record<string, any>) => void;
  onResetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, filterFields, onFilterChange, onResetFilters }) => {
  const handleFilterChange = (field: string, value: any) => {
    onFilterChange({ [field]: value });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Filters</h5>
        {Object.keys(filters).length > 0 && (
          <Button variant="outline-secondary" size="sm" onClick={onResetFilters}>
            Reset
          </Button>
        )}
      </div>
      {filterFields.map((field) => (
        <Accordion>
          <Accordion.Header className="transparent-header">{field.label}</Accordion.Header>
          <Accordion.Body>
            <Form.Group key={field.value} className="mb-3">
              {field.options?.map((option) => (
                <Form.Check
                  key={String(option.value)}
                  type="checkbox"
                  label={field.component ? field.component(option) : option.label}
                  checked={filters[field.value]?.includes(option.value)}
                  onChange={(e) => {
                    const currentValues = filters[field.value] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: any) => v !== option.value);
                    handleFilterChange(field.value, newValues);
                  }}
                />
              ))}
            </Form.Group>
          </Accordion.Body>
        </Accordion>
      ))}
    </div>
  );
};

export default Filters;