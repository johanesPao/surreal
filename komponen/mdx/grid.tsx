'use client'

import { AgGridReact } from 'ag-grid-react'
import { useState } from 'react';

type AgGridProps = {
    barisData: any[];
    definisiKolom: any[];
}

const Grid = ({barisData, definisiKolom, ...props}: AgGridProps) => {
    const [data, setData] = useState<AgGridProps["barisData"]>(barisData)
    const [kolom, setKolom] = useState<AgGridProps["definisiKolom"]>(definisiKolom)

    return (
        <div
            className="ag-theme-quartz-dark flex h-96 bg-[#282828] py-0.5 px-[5%] lg:px-[20%] items-center"
        >
            <AgGridReact 
                rowData={data} 
                columnDefs={kolom}
                className="py-6 grow"
                {...props}
            />
        </div>
    )
}

export default Grid