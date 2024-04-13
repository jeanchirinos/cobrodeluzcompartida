import {Table as NextUiTable, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

type Props = React.ComponentProps<typeof NextUiTable>;

export function Table(props: Props) {
  return (
    <NextUiTable removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </NextUiTable>
  );
}
