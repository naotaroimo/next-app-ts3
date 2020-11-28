import { Formik, Form, Field } from 'formik';
import { Button, Box, FormGroup, TextField } from '@material-ui/core';
import axios from 'axios';
import useSWR, { mutate, trigger } from 'swr';

const AddVtuber = () => {
    //mutate用に先にデータフェッチをしておく
    // const { data } = useSWR('http://localhost:4001/persons');
    const {data} = useSWR('/persons');

    return (
        <div>
            <Formik
                initialValues={
                    {
                        name: '',
                        details: ''
                    }
                }
                onSubmit={async (values, formikHelpers) => {
                    const url = '/persons';

                    //post前にフェッチしているデータに対し更新をいれる。
                    //第２引数にフェッチデータdataとformikでバインドしてるvaluesを連結させる
                    //ただし,
                    //revalidate=false⇒SWRでのデータ再取得はaxios.postの後にする
                    mutate(url, [...data, values], false);

                    await axios.post(url,values);
                   
                    formikHelpers.resetForm();//フォームリセット
                    // alert(` input data '${values.name}' and '${values.details}' added ! `)
                    trigger(url);
                }}
            >

                <Form>
                    <FormGroup>
                        <Field as={TextField} name="name" label="name" />
                    </FormGroup>

                    <FormGroup>
                        <Field as={TextField} name="details" label="about" />
                    </FormGroup>

                    <Box marginTop={1}>
                        <Button type="submit" variant="contained" color="primary"> Add  </Button>
                    </Box>
                </Form>
            </Formik>
        </div>
    );
}

export default AddVtuber