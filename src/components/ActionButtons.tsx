import React from 'react';
import { Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="d-flex justify-content-end">
      <Button 
        variant="outline-primary" 
        size="sm" 
        onClick={onEdit} 
        className="me-2"
        style={{ 
          borderColor: '#2e7d32',
          color: '#2e7d32',
        }}
      >
        <Pencil size={16} />
      </Button>
      <Button 
        variant="outline-danger" 
        size="sm" 
        onClick={onDelete}
        style={{ 
          borderColor: '#f44336',
          color: '#f44336',
        }}
      >
        <Trash size={16} />
      </Button>
    </div>
  );
};

export default ActionButtons;