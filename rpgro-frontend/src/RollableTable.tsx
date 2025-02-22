import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { words } from './loremipsumDeck';


type Data =
{
    word: string
}

let data: Data[] = words.map((x) => {return {word: x}});
data = data.slice(0, 10);

/*const defaultData: Person[] = 
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
];*/


function Roll(data: Data[], setter)
{
    const value = Math.floor(Math.random()*data.length);
    setter(value);
    return value;
}


export  function RollableTable({reportResult, editor})
{
    const [roll, setRoll] = useState(-1);

    return (
        <TableContainer>
            <Button variant="contained" onClick={()=>{reportResult(editor, data[Roll(data, setRoll)].word)}}>Roll</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(((row, index) => (
                        <TableRow key={index} selected={index===roll ? true : false}>
                            <TableCell>{row.word}</TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}