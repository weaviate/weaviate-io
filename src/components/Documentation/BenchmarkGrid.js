import React, { useState, useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import { benchmarkData } from './benchmarkData';

const percenageFormatter = (params) => {
    return params.value + "%"
}
const secFormatter = (params) => {
    return params.value + "s"
}
const msecFormatter = (params) => {
    return params.value + "ms"
}

export default function BenchmarkGrid({ datasetLabel }) {
    const data = benchmarkData[datasetLabel]

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState(data);

    const [colDefs, setColDefs] = useState([
        { 
            field: "efConstruction",
            headerName: "efConstruction",
            width: 155,
            wrapHeaderText: true,
        },
        { 
            field: "maxConnections",
            headerName: "maxConnections",
            width: 150,
            wrapHeaderText: true,
        },
        { 
            field: "ef",
            headerName: "ef",
            width: 75,
        },
        { 
            field: "recall",
            headerName: "Recall",
            width: 100,
            sortingOrder: ["desc", "asc", null],
            valueFormatter: percenageFormatter,
        },
        { 
            field: "qps",
            headerName: "QPS",
            width: 100,
            sort: "desc",
            sortingOrder: ["desc", "asc", null],
        },
        { 
            field: "meanLatency",
            headerName: "Mean Latency",
            width: 125, 
            wrapHeaderText: true,
            valueFormatter: msecFormatter,
        },
        { 
            field: "p99Latency",
            headerName: "p99 Latency",
            width: 125,
            wrapHeaderText: true,
            valueFormatter: msecFormatter,
        },
        { 
            field: "importTime",
            headerName: "Import Time",
            width: 125,
            wrapHeaderText: true,
            valueFormatter: secFormatter,
        },
    ]);

    const sortingOrder = useMemo(() => {
        return ["asc", "desc", null];
    }, []);

    return (
        // wrapping container with theme & size
        <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                sortingOrder={sortingOrder}
            />
        </div>
    )
}
