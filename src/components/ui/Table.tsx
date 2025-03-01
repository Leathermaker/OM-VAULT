import React from "react";
import { TableHeadingsTypes } from "../../types/types";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";



type TableProps = {
  tableHeadings: TableHeadingsTypes[];
  tableBody: any[];
};
const Table: React.FC<TableProps> = ({ tableHeadings, tableBody }) => {
  return (
    <div className="relative">
      <table className="table-fixed  rounded-t-lg border-spacing-x text-white w-full border-separate">
        <thead className="border bg-zinc-600 sticky top-0">
          <tr>
            {tableHeadings.map((heading, index) => (
              <th key={index} className="ps-2 py-2">
                {heading.label}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800">
          {tableBody.map((row, rowIndex) => (
            <tr key={rowIndex} className="py-2">
              {tableHeadings.map((heading, colIndex) => (
                <td key={colIndex} className="ps-2 py-2 truncate">
                  {row[heading.key]}{" "}
                  {/* Dynamically render the data for each column */}
                </td>
              ))}
              <tr className="mx-auto"> <IoEllipsisHorizontalSharp /></tr>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
