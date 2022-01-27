import React, { useEffect, useState } from 'react';
import Table from './Table';
import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default function File() {

    const [files, changeFiles] = useState([]);

    const [search, changeSearch] = useState('');

    const [options, changeOptions] = useState([])

    const [submit, changeSubmit] = useState(false);

    const headers = [
        {
            text: 'File Name',
            value: 'file'
        },
        {
            text: 'Text',
            value: 'text'
        },
        {
            text: 'Number',
            value: 'number'
        },
        {
            text: 'Hex',
            value: 'hex'
        },
    ];

    const spinner = (
        <div class="spinner-border text-dark spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    );

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const filesApi = await getFiles();
        const filesMap = [];

        for (const file of filesApi) {
            for (const line of file.lines) {
                filesMap.push({
                    file: file.file,
                    text: line.text,
                    number: line.number,
                    hex: line.hex
                });
            }
        }

        changeFiles(filesMap);

        const optionsApi = await getListFiles();
        const optionsMap = optionsApi.files.map(option =>
            <option value={option}>{option}</option>
        );

        changeOptions(optionsMap);
    }

    const handleChange = event => changeSearch(event.target.value);

    const searchFiles = async () => {
        changeSubmit(true);
        const searches = await getFiles(search);
        changeSubmit(false);

        if (searches.length === 0) {
            return alert(`There aren't files associated to that name`);
        }

        const filesMap = [];

        for (const file of searches) {
            for (const line of file.lines) {
                filesMap.push({
                    file: file.file,
                    text: line.text,
                    number: line.number,
                    hex: line.hex
                });
            }
        }

        changeFiles(filesMap);
    }

    /**
     * queries to the api's
     */
    const getFiles = async (name = '') => {
        return httpClient.get(`/files/data?fileName=${name}`)
            .then(response => response.data)
            .catch(error => []);
    };

    const getListFiles = async () => {
        return httpClient.get('/files/list')
            .then(response => response.data)
            .catch(error => []);
    }

    return (
        <div className="container-fluid p-0">
            <div class="navbar bg-danger bg-gradient">
                <h3 className='text-white'>React Test App</h3>
            </div>

            <div className='row pt-4'>
                <div className='col-8'>
                    <select className='form-select' value={search} onChange={handleChange}>
                        <option value="" selected>Select File</option>
                        {options}
                    </select>
                </div>

                <div className='d-grid gap-2 col-4 mx-auto'>
                    <button className='btn btn-primary' disabled={submit} onClick={searchFiles}>
                        {submit ? spinner: 'Search'}
                    </button>
                </div>
            </div>

            <div className='row pt-4'>
                <div className='col-12'>
                    <Table headers={headers} items={files} />
                </div>
            </div>
        </div>
    );
}