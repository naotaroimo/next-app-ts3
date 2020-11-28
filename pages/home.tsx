import AddVtuber from "../components/AddVtuber"
import axios from "axios";
import useSWR, { mutate, trigger } from "swr";
import { Box, Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Home = () => {
    const classes = useStyles();
    // const { data } = useSWR('http://localhost:4001/persons');
    const { data } = useSWR('/persons', {
        initialData: [{ name: 'name', details: 'about', id: -1 }]
    });

    //変数dataは型定義すべきだが今回は省略
    //dataにundefinedが返ってくる可能性があるが、
    //描画時に「?」をつけて対処data?.map(...)やあるいは(data || []).mapみたいなかき方でも可能
    return (
        <div>
            <Box marginBottom={2}>
                <AddVtuber />
            </Box>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">name</TableCell>
                            <TableCell align="left">details</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.details}</TableCell>
                                <TableCell align="left">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={async () => {
                                            // const deleteUrl = 'http://localhost:4001/persons/'+ row.id;
                                            // const url = 'http://localhost:4001/persons';
                                            const deleteUrl = '/persons/' + row.id;
                                            const url = '/persons';

                                            //mutateで画面を書き換える（削除予定のidを除いたデータにフィルタリング）
                                            mutate(url, data.filter(c => c.id !== row.id), false);

                                            //ここにaxiosで削除処理(サンプルとしてdeleteメソッド)
                                            await axios.delete(deleteUrl);

                                            //triggerでswr起動
                                            trigger(url);
                                        }}
                                    >
                                        delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Home