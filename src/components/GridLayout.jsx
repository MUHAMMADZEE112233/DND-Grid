import React, { useState } from 'react';
import { TiPlus } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { FaThumbsUp } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const GridLayout = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1', description: 'Description for Item 1' },
        { id: 2, name: 'Item 2', description: 'Description for Item 2' },
        { id: 3, name: 'Item 3', description: 'Description for Item 3' },
        { id: 4, name: 'Item 4', description: 'Description for Item 4' }
    ]);
    const [box, setBox] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [isDraggingOverBox, setIsDraggingOverBox] = useState(false);
    const [isDraggingOverFirst, setIsDraggingOverFirst] = useState(false);

    const handleDragStart = (index, from) => {
        setDraggedItem({ index, from });
    };

    const handleDragOver = (e, column) => {
        e.preventDefault();
        if (column === 'box') {
            setIsDraggingOverBox(true);
        } else if (column === 'first') {
            setIsDraggingOverFirst(true);
        }
    };

    const handleDragLeave = (column) => {
        if (column === 'box') {
            setIsDraggingOverBox(false);
        } else if (column === 'first') {
            setIsDraggingOverFirst(false);
        }
    };

    const handleDropInBox = () => {
        if (draggedItem?.from === 'items') {
            const itemToMove = items[draggedItem.index];
            setBox([...box, itemToMove]);
            setItems(items.filter((_, i) => i !== draggedItem.index));
        }
        setDraggedItem(null);
        setIsDraggingOverBox(false);
    };

    const handleDropInFirstColumn = () => {
        if (draggedItem?.from === 'box') {
            const itemToReturn = box[draggedItem.index];
            setItems(prevItems => {
                const newItems = [...prevItems, itemToReturn];
                return newItems.sort((a, b) => a.id - b.id);
            });
            setBox(box.filter((_, i) => i !== draggedItem.index));
        }
        setDraggedItem(null);
        setIsDraggingOverFirst(false);
    };

    const moveToNextBox = () => {
        if (box.length > 0) {
            setBoxes([...boxes, box]);
            setBox([]);
        }
    };

    const moveToFocused = (boxIndex) => {
        const boxToFocus = boxes[boxIndex];
        setBox([...box, ...boxToFocus]);
        setBoxes(boxes.filter((_, i) => i !== boxIndex));
    };

    const removeBox = (boxIndex) => {
        const removedItems = boxes[boxIndex];
        setItems(prevItems => {
            const newItems = [...prevItems, ...removedItems];
            return newItems.sort((a, b) => a.id - b.id);
        });
        setBoxes(boxes.filter((_, i) => i !== boxIndex));
    };

    const addEmptyBox = () => {
        setBoxes([...boxes, []]);
    };

    return (
        <div className="flex p-4 space-x-4 h-screen">
            <div
                className={`w-1/3 p-4 bg-gray-100 rounded ${isDraggingOverFirst ? 'border-2 border-dashed cursor-grab border-blue-500' : ''}`}
                onDragOver={(e) => handleDragOver(e, 'first')}
                onDragLeave={() => handleDragLeave('first')}
                onDrop={handleDropInFirstColumn}
            >
                <h2 className="text-xl font-bold mb-4">Items ({items.length})</h2>
                <ul>
                    {items.map((item, index) => (
                        <li
                            key={item.id}
                            draggable
                            onDragStart={() => handleDragStart(index, 'items')}
                            className="mb-2 bg-white rounded shadow flex w-full cursor-grab"
                        >
                            <div className="w-1/5 p-2 flex items-center justify-center bg-[#e4e6fb]">
                                <button
                                    onClick={() => {
                                        setBox([...box, item]);
                                        setItems(items.filter((_, i) => i !== index));
                                    }}
                                    className="bg-[#8f95e5] p-2 rounded-full"
                                >
                                    <TiPlus color='#e4e6fb' />
                                </button>
                            </div>
                            <div className="w-4/5 p-2">
                                <div className="font-bold">{item.name}</div>
                                <div className="text-sm text-gray-600">{item.description}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className={`w-1/3 p-4 bg-gray-100 rounded cursor-grab ${isDraggingOverBox ? 'border-2 border-dashed border-blue-500' : ''}`}
                onDragOver={(e) => handleDragOver(e, 'box')}
                onDragLeave={() => handleDragLeave('box')}
                onDrop={handleDropInBox}
            >
                <div className='flex flex-row justify-start gap-4 items-center'>
                    <span className='p-4 cursor-pointer' onClick={moveToNextBox}>
                        <FaChevronRight />
                    </span>
                    <h2 className="text-xl font-bold cursor-default">Focus Column</h2>
                </div>
                <div className="space-y-2">
                    {box.map((item, index) => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={() => handleDragStart(index, 'box')}
                            className="bg-white rounded shadow flex cursor-grab"
                        >
                            <div className="w-1/5 p-2 flex items-center justify-center bg-[#fddad4]">
                                <button
                                    onClick={() => {
                                        setItems(prevItems => {
                                            const newItems = [...prevItems, item];
                                            return newItems.sort((a, b) => a.id - b.id);
                                        });
                                        setBox(box.filter((_, i) => i !== index));
                                    }}
                                    className="bg-[#e94b2b] p-2 rounded-full"
                                >
                                    <ImCross size={12} color='#fddad4' />
                                </button>
                            </div>
                            <div className="w-4/5 p-2">
                                <div className="font-bold">{item.name}</div>
                                <div className="text-sm text-gray-600">{item.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-1/3 p-4 bg-gray-100 rounded">
                <h2 className="text-xl font-bold mb-4">Boxes</h2>
                <div className="space-y-2">
                    {boxes.map((box, boxIndex) => (
                        <div
                            key={boxIndex}
                            className="p-4 bg-white rounded shadow"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <button
                                        onClick={() => moveToFocused(boxIndex)}
                                        className="transition ease-in-out duration-300 transform hover:scale-110"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                </div>
                                <span>Box {boxIndex + 1}</span>
                                <div>
                                    <button
                                        onClick={() => removeBox(boxIndex)}
                                        className="transition ease-in-out duration-300 transform hover:scale-110"
                                    >
                                        <ImCross />
                                    </button>
                                </div>
                            </div>
                            <ul className="space-y-1">
                                {box.map((item, index) => (
                                    <li
                                        key={item.id}
                                        className="flex border border-slate-200 items-center rounded cursor-grab"
                                    >
                                        <div className="w-1/5 p-2 flex items-center justify-center bg-[#fbf9f9]">
                                            <button
                                                className="bg-[#e6e6e6] p-2 rounded-full"
                                            >
                                                <FaThumbsUp size={16} color='#fbf9f9' />
                                            </button>
                                        </div>
                                        <div className="w-4/5 p-2">
                                            <div className="font-bold">{item.name}</div>
                                            <div className="text-sm text-gray-600">{item.description}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className='flex justify-end items-center'>
                    <button
                        onClick={addEmptyBox}
                        className="mt-4 flex items-center gap-2 justify-center"
                    >
                        <span className='bg-[#7c86de] text-white p-1 rounded-sm'><TiPlus size={20} /></span>
                        Add Box
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GridLayout;
