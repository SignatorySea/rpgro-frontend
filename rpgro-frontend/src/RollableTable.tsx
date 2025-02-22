import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


type Person =
{
    firstName: string
    lastName: string
    age: number
}

const defaultData: Person[] = 
[
    {
        firstName: 'Tanner',
        lastName: 'Linsley',
        age: 24
    },
    {
        firstName: 'Tandy',
        lastName: 'Miller',
        age: 40
    },
    {
        firstName: 'Joe',
        lastName: 'Dirte',
        age: 45
    }
];



export  function RollableTable()
{
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Age</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {defaultData.map((row => (
                        <TableRow key={row.firstName}>
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell>{row.age}</TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}