import React,{useState} from 'react'
import {useQuery} from 'react-query'
import Planet from './Planet';


const fetchPlanets = async ({queryKey}) =>{
    const [key,page] = queryKey;
    //console.log(key,name,page);
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    
    return res.json();
}
const Planets = () => {
    const [page, setPage] = useState(1);
    const {data,status,isPreviousData} = useQuery(['planets',page],fetchPlanets,{
        keepPreviousData: true,
    });
    console.log(data);
    if (data === undefined) {
        return null;
    }
    return (
        <div>
            <h2>Planets</h2>
            {/* <p>{status}</p> */}

            {/* <button onClick={()=>setPage(1)}>page 1</button>
            <button onClick={()=>setPage(2)}>page 2</button>
            <button onClick={()=>setPage(3)}>page 3</button> */}
            {status === 'error' && (
                <div>Error fetching data</div>
            )}
            {status === 'loading' && (
                <div>Loading data</div>
            )}
            {status === 'success' && (
                <>
                    <button onClick={()=>setPage(old=>Math.max(old-1,1))} disabled={page === 1}>Previous page</button>
                    <span>{page}</span>
                    
                    <button onClick={() => {if (!isPreviousData) {setPage(old => old + 1)}}} disabled={!data.next}>Next Page</button>
                    <div>
                        {data.results.map(planet=><Planet key={planet.name} planet={planet}/>)}
                    </div>
                </>
            )}
        </div>
    )
}

export default Planets
