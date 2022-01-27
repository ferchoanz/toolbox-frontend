import React from "react";

export default function Table(props) {

    const headers = props.headers.map(header => 
        <th>{ header.text }</th>
    );

    const columns = props.items.map(item =>
        <tr>
            { props.headers.map(header =>  <td> { item[header.value] } </td>) }
        </tr>
    );

    return (
        <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        { headers }
                    </tr>
                </thead>

                <tbody>
                    { columns }
                </tbody>
            </table>
        </div>
    );
}