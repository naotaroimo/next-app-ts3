import AddVtuber from "../components/AddVtuber"
// import {useEffect, useState} from 'react';
import axios from "axios";
import useSWR from "swr";

const Home = () => {
    //     const [data, setData] = useState([]);

    //     useEffect(
    //         () =>{
    //             async function loadData(){
    //                 const response = await axios('http://localhost:4001/persons');
    //                 setData(response.data);
    //             }

    //             loadData();
    //         }, []
    //     );

    const { data } = useSWR('http://localhost:4001/persons');
    //変数dataは型定義すべきだが今回は省略
    //dataにundefinedが返ってくる可能性があるが、
    //描画時に「?」をつけて対処data?.map(...)やあるいは(data || []).mapみたいなかき方でも可能
    return (
        <div>
            <AddVtuber />

            {data?.map(row => (
                <div key={row.id}>
                    {row.id}: {row.name}: {row.details}
                </div>
            ))
            }
        </div>
    );
}

export default Home