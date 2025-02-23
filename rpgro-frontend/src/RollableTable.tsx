import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, RefObject, useRef, useEffect, useReducer } from 'react';
import { words } from './loremipsumDeck';
import { Editor } from 'tldraw';


type Data =
{
    word: string
}

let data: Data[] = words.map((x) => {return {word: x}});
data = data.slice(0, 10);



interface SetterFunction
{
    (value: number): void
}


function Roll(data: Data[], setter: SetterFunction)
{
    const value = Math.floor(Math.random()*data.length);
    setter(value);
    return value;
}

function SetXY(inputRef: RefObject<any>, setterX: SetterFunction, setterY: SetterFunction)
{
    if(inputRef != null)
    {
        if(inputRef.current != null)
        {
            const rect = inputRef.current.getBoundingClientRect();
            setterX(rect.x);
            setterY(rect.y);
            return [rect.x, rect.y];
        }
    }
    return [0,0];
}

interface CardFunction
{
    (editor: Editor, result: string, pos: number[], width: number): void;
}

interface Props
{
    reportResult: CardFunction,
    editor: Editor,
    width: number,
    height: number
}

export function RollableTable({reportResult, editor, width, height}: Props)
{
    const [roll, setRoll] = useState(-1);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    
    const ref = useRef(null);
    //const forceUpdate = useReducer(() => ({}), {})[1] as () => void

    useEffect(() => {
        if(ref != null)
        {
            const rect = ref.current.getBoundingClientRect();
            setPosX(rect.x);
            setPosY(rect.y);
        }

    })
    

    return (
        <div ref={ref} >
            <TableContainer sx={{width: {width}, height: {height}, maxHeight: {height}}}>
                <Button variant="contained" onClick={()=>{reportResult(editor, data[Roll(data, setRoll)].word, SetXY(ref, setPosX, setPosY), width)}}>Roll</Button>
                <Table >
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
        </div>
    )
}