import React from 'react';
import { Table } from 'react-bootstrap';

interface Word {
  _id: string;
  wordfr: string;
  worddz: string;
  type: string;
}

interface WordTableProps {
  words: Word[];
}

const WordTable: React.FC<WordTableProps> = ({ words }) => (
  <Table 
    hover 
    className='mt-3 shadow-sm' 
    aria-label="Tableau des mots"
    style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}
  >
    <thead>
      <tr style={{ backgroundColor: '#e8f5e9' }}>
        <th className="text-primary">Mot en Français</th>
        <th className="text-primary">Mot en Algérien</th>
        <th className="text-primary">Type</th>
      </tr>
    </thead>
    <tbody>
      {words.map((word) => (
        <tr key={word._id}>
          <td>{word.wordfr}</td>
          <td>{word.worddz}</td>
          <td>{word.type}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default WordTable;