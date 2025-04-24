import { ReactNode } from "react";

interface TableCellProps {
  children: ReactNode;
  className?: string;
  isHeader?: boolean;
  colSpan?: number;
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  className = "",
  isHeader = false,
  colSpan,
}) => {
  const Tag = isHeader ? "th" : "td";

  return (
    <Tag className={className} colSpan={colSpan}>
      {children}
    </Tag>
  );
};

export default TableCell; 