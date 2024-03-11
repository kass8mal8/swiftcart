// import { Filter1Rounded, Sort } from "@mui/icons-material";
import { ArrowUpwardRounded, FilterList, ViewList, ViewModule } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material"; 
import { useState } from "react";

const FilterUI = ({ view, setView }) => {

    return (  
        <Stack direction='row' className='filter' spacing={2}>
            <Stack direction='row' spacing={1}>
                <FilterList />
                <Typography variant='body1'>Filters</Typography>
            </Stack>
            <Stack direction='row' spacing={2}>
                <ArrowUpwardRounded />
                <Typography>Price Lowest to High</Typography>
            </Stack>
            <IconButton>
                {view === 'module' ? <ViewList onClick={() => setView('list')} /> :
                <ViewModule onClick={() => setView('module')} />}
            </IconButton>
        </Stack>
    );
}
 
export default FilterUI;