import React, { FC } from "react";
import DataTable from 'react-data-table-component';
import CustomTablePaginator from "./Paginator";

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 3,
        title: 'zxxxxxxxxxxxxxxx',
        year: '1988',
    },
    {
        id: 4,
        title: 'eeeeeeeeeeeeeeeeeeee',
        year: '1984',
    },
    {
        id: 5,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 6,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 7,
        title: 'zxxxxxxxxxxxxxxx',
        year: '1988',
    },
    {
        id: 8,
        title: 'eeeeeeeeeeeeeeeeeeee',
        year: '1984',
    },
    {
        id: 9,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 10,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 11,
        title: 'zxxxxxxxxxxxxxxx',
        year: '1988',
    },
    {
        id: 12,
        title: 'eeeeeeeeeeeeeeeeeeee',
        year: '1984',
    },
    {
        id: 13,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 14,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 15,
        title: 'zxxxxxxxxxxxxxxx',
        year: '1988',
    },
    {
        id: 16,
        title: 'eeeeeeeeeeeeeeeeeeee',
        year: '1984',
    },
    {
        id: 17,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 18,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 19,
        title: 'zxxxxxxxxxxxxxxx',
        year: '1988',
    },
    {
        id: 20,
        title: 'eeeeeeeeeeeeeeeeeeee',
        year: '1984',
    },
    {
        id: 21,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 22,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 23,
        title: 'zxxxxxxxxxxxxxxx',
        year: '1988',
    },
    {
        id: 24,
        title: 'eeeeeeeeeeeeeeeeeeee',
        year: '1984',
    },
    {
        id: 25,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 26,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 27,
        title: 'zxxxxxxxxxxxxxxx',
        year: '1988',
    },
    {
        id: 28,
        title: 'eeeeeeeeeeeeeeeeeeee',
        year: '1984',
    },
]

type Props = {
} 

const Music: FC<Props> = (props) => {
    return (
    <div>
        <DataTable
            columns={columns}
            data={data}
            pagination 
            paginationComponent={CustomTablePaginator}
            paginationRowsPerPageOptions={[1, 2, 5, 10, 20]}

        />
    </div>)
}

export default Music;