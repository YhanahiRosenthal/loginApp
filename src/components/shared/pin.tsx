import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import { getImage } from '../useHooks/GetImage';
interface RegisterProps {
    setPin: React.Dispatch<React.SetStateAction<string>>;
    textColor: string;
    backColor: string;
}

const GridContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    width: '330px',
    justifyContent:'center',
    alignItems:'center',
});

const Image = styled('img')({
    width: '70%',
    cursor:'pointer',
    transition:'all .2s',
    '&:hover': {
        filter:'brightness(1.05)',
        transform:'scale(1.05)'
    },
});

interface SquareProps {
    selected: boolean;
    color: string;
}

const Square = styled('div')<SquareProps>(({ selected, color }) => ({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '90px',
    height: '90px',
    backgroundColor: selected ? `${color}` : `${color}23`,
    border: '1px solid #999',
    borderRadius:'5px',
    boxSizing: 'border-box',
    margin: '5px',
    cursor:'pointer',
    transition:'all .2s',
    '&:hover': {
        filter:'brightness(1.05)'
    },
}));

const NumberLabel = styled('div')({
    position:'absolute',
});

const words: string[] = [
    "Ape1!",
    "Ban2@",
    "Che3#",
    "Dat4$",
    "Egg5%",
    "Fig6^",
    "Gra7&",
    "How8*",
    "ICe9(",
];

const Pin: React.FC<RegisterProps> = ({setPin, textColor, backColor }) => {

    const [selected, setSelected] = useState<number[]>([]);
    const [order, setOrder] = useState<number[]>([]);
    const [isPin, setIsPin] = useState<string[]>([]);

    useEffect(() => {
        setPin(isPin.join(''));
    }, [isPin]);

    const animals: string[] = getImage();

    const handleSelected = (index: number) => {
        setSelected(prevSelected => {
            const newSelected = [...prevSelected];
            const selectedIndex = newSelected.indexOf(index);
            if (selectedIndex === -1) {
                newSelected.push(index);
                return newSelected;
            } else {
                newSelected.splice(selectedIndex, 1);
                return newSelected;
            }
        });
        setOrder(prevOrder => {
            if (prevOrder.includes(index)) {
                return prevOrder.filter(orderIndex => orderIndex !== index);
            } else {
                return [...prevOrder, index];
            }
        });
        setIsPin(prevPin => {
            if (prevPin.includes(words[index])) {
                return prevPin.filter(pin => pin !== words[index]);
            } else {
                return [...prevPin, words[index]];
            }
        });
    };

    return(
        <>
            <GridContainer>
                {[...Array(9)].map((_, index) => {
                    return (
                    <Square
                        key={index}
                        onClick={()=> {handleSelected(index)}}
                        selected={selected.includes(index)}
                        color={backColor}
                        style={{
                            width: "90px",
                            height: "90px",
                            border: "1px solid #999",
                            borderRadius:"5px",
                            boxSizing: "border-box",
                            margin: "5px",
                        }}
                        >
                        <Image src={animals[index]} alt="icon" />
                        {order.includes(index) &&
                            <NumberLabel
                                style={{
                                    color: textColor,
                                    fontSize: '2rem',
                                    padding: "2px 5px",
                                    borderRadius: '30px',
                                    backgroundColor: "transparent"
                                }}
                            >{order.indexOf(index) + 1}</NumberLabel>}
                    </Square>
                )})}
            </GridContainer>
        </>
    )
}

export default Pin;
