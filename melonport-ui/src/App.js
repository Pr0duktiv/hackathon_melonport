import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { AgGridReact, AgGridColumn} from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';

import FundChartCellRenderer from './FundChartCellRenderer.js'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /*
            columnDefs: [
                {headerName: "Address", field: "address"}, 
                {headerName: "Name", field: "name"},
                {headerName: "Price", field: "sharePrice", cellClass: 'number-cell', valueGetter: roundFormatter},
                {headerName: "Inception", field: "inception", valueGetter: dateFormatter}
            ]
*/
            onGridReady: function(params) {
                params.api.sizeColumnsToFit();
                window.addEventListener("resize", function() {
                  setTimeout(function() {
                    params.api.sizeColumnsToFit();
                  });
        });
      }
    };
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
          setTimeout(function() {
            params.api.sizeColumnsToFit();
          });
        });

        params.api.sizeColumnsToFit();
  }

    static roundFormatter(params){
        return Math.round(params.data.sharePrice * 100) / 100 + ' CHF'
    }

    static dateFormatter(params){
        return params.data.inception.substring(0,10)
    }
    
    componentDidMount(){
        fetch('https://ranking.melon.fund/')
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
        window.onresize = () => {
            this.gridApi.sizeColumnsToFit();
        }
}

    render() {
        return (
            <div  className="ag-theme-material"
            style={{ 
                height: '1200px', 
                width: '100%',
                margin: '0 auto'
            }}>
            <AgGridReact 
                enableSorting={true}
                enableFilter={true}
                enableColResizes={true}
                rowMultiSelectWithClick={true}
                onGridReady={this.state.onGridReady}
                onGridReady={this.onGridReady.bind(this)}

//                columnDefs={this.state.columnDefs} 
                rowData={this.state.rowData}>

                <AgGridColumn headerName="Fund Name" field="name"></AgGridColumn>
                <AgGridColumn headerName="Price" field="sharePrice" cellClass="number-cell" valueFormatter={App.roundFormatter}></AgGridColumn>
                <AgGridColumn headerName="1 YTD Performance" field="graph" enableValue cellRendererFramework={FundChartCellRenderer}></AgGridColumn>
                <AgGridColumn headerName="Inception" field="inception" valueFormatter={App.dateFormatter}></AgGridColumn>
            </AgGridReact>
            </div>
        );
    }
}

export default App;
