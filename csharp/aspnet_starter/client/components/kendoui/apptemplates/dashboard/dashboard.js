import React from 'react';
import * as kendo from '@progress/kendo-ui';
import '@progress/kendo-theme-default/dist/all.css';
import Layout from '../../../../components/Layout';

class About extends React.Component {
  componentDidMount() {
    document.title = 'About Us';
  }

  render() {
    return (
      <Layout>
        <div className="container-fluid">
          <div className="row row-offcanvas row-offcanvas-left">
            <div id="main-section" className="col-xs-12 column">
              <div id="main-section-header" className="row">
                <h2 id="team-efficiency" className="col-xs-3">Team efficiency</h2>
                <div id="dateFilter" className="col-xs-9">
                  <div className="period-wrapper">
                    <label htmlFor="StartDate" className="select-period">Stats from</label>
                    <input id="start-date" />
                    <span className="k-invalid-msg" data-for="StartDate" />
                  </div>
                  <div className="period-wrapper">
                    <label htmlFor="EndDate" className="select-period">To</label>
                    <input id="end-date" />
                    <span className="k-invalid-msg" data-for="EndDate" />
                  </div>
                </div>
                <div style="clear:both;" />
              </div>
              <div className="main-section-content row" style="">
                <div id="employee-list" className="col col-xs-2">
                  <h3>TEAM MEMBERS</h3>
                  <div id="employees-list" />
                </div>
                <div id="employee-details-wrapper" className="col col-xs-10">
                  <div id="employee-details" className="row">
                    <div id="employee-about" className="col-xs-12 placeholder">
                      <div className="row">
                        <div id="employeeBio" className="col-xs-12 col-sm-4" />
                        <div className="col-xs-12 col-sm-4">
                          <h3>Quarter to date sales</h3>
                          <span id="employee-quarter-sales-label" />
                          <div className="sparkline-container">
                            <div id="employee-quarter-sales" style="height:30px" />
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                          <h3>Monthly Average Sales</h3>
                          <span id="employee-average-sales-label" />
                          <div className="sparkline-container">
                            <div id="employee-average-sales" style="height:30px" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="employeeStats" className="col-xs-12">
                      <div id="team-sales" style="height:200px" />
                    </div>
                    <div id="employeeSchedule" className="col-xs-12">
                      <h3>Representative orders - schedule</h3>
                      <div id="employee-sales" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script>
          {($(document).ready(() => {
            let employeeAndTeamSales = [];
            let employeeAverageSales = [];
            let employeeQuarterSales = [];
            function onCriteriaChange() {
              const employeeList = $('#employees-list').data('kendoListView'),
                employee = employeeList.dataSource.getByUid(employeeList.select().attr('data-uid')),
                // employeeQuarterSales = $('#employee-quarter-sales').data('kendoChart'),
                // employeeAverageSales = $('#employee-average-sales').data('kendoChart'),
                teamSales = $('#team-sales').data('kendoChart'),
                employeeSales = $('#employee-sales').data('kendoScheduler'),
                startDate = $('#start-date').data('kendoDatePicker'),
                endDate = $('#end-date').data('kendoDatePicker'),
                filter = {
                  EmployeeID: employee.EmployeeID,
                  startDate: kendo.format('{0:MM/dd/yyyy hh:mm:ss}', startDate.value()),
                  endDate: kendo.format('{0:MM/dd/yyyy hh:mm:ss}', endDate.value()),
                },
                template = kendo.template($('#employeeBioTemplate').html());

              $('#employeeBio').html(template(employee));

              employeeSales.dataSource.filter({
                field: 'EmployeeID',
                operator: 'eq',
                value: employee.EmployeeID,
              });

              teamSales.dataSource.read(filter);
              employeeQuarterSales.dataSource.read(filter);
              employeeAverageSales.dataSource.read(filter);
            }
            function onListDataBound(e) {
              this.select($('.employee:first'));
            }
            function onQuarterSalesDataBound(e) {
              const data = this.dataSource.at(0);
              $('#employee-quarter-sales-label').text(kendo.toString(data.Current, 'c2'));
            }
            function onAverageSalesDataBound(e) {
              const data = this.dataSource.aggregates();
              if (data.EmployeeSales) {
                $('#employee-average-sales-label').text(kendo.toString(data.EmployeeSales.average, 'c2'));
              } else {
                $('#employee-average-sales-label').text(kendo.toString(0, 'c2'));
              }
            }
            function initWidgets() {
              $('#start-date').kendoDatePicker({
                value: new Date(1996, 0, 1),
                change: onCriteriaChange,
              });
              $('#end-date').kendoDatePicker({
                value: new Date(1998, 7, 1),
                change: onCriteriaChange,
              });
              $('#employees-list').kendoListView({
                template: $('#employeeItemTemplate').html(),
                dataSource: {
                  transport: {
                    read: {
                      url: './content/employees-list.json',
                      crossDomain: true,
                      dataType: 'jsonp',
                      jsonp: false,
                      jsonpCallback: 'callback_el',
                    },
                  },
                  pageSize: 9,
                },
                selectable: 'single',
                dataBound: onListDataBound,
                change: onCriteriaChange,
              });
              $('#employee-quarter-sales').kendoChart({
                theme: 'metro',
                autoBind: false,
                tooltip: false,
                dataBound: onQuarterSalesDataBound,
                dataSource: {
                  transport: {
                    read(options) {
                      const result = $.grep(employeeQuarterSales, e => e.EmployeeID === options.data.EmployeeID)[0];
                      options.success(result.Sales);
                    },
                  },
                },
                series: [{
                  type: 'bullet',
                  currentField: 'Current',
                  targetField: 'Target',

                }],
                legend: {
                  visible: false,
                },
                categoryAxis: {
                  labels: {
                    visible: false,
                  },
                  majorGridLines: {
                    visible: false,
                  },
                },
                valueAxis: {
                  type: 'numeric',
                  labels: {
                    visible: false,
                  },
                  majorTicks: {
                    visible: false,
                  },
                  majorGridLines: {
                    visible: false,
                  },
                },

              });
              $('#employee-average-sales').kendoChart({
                theme: 'metro',
                autoBind: false,
                dataBound: onAverageSalesDataBound,
                dataSource: {
                  transport: {
                    read(options) {
                      const result = $.grep(employeeAverageSales, e => e.EmployeeID === options.data.EmployeeID);
                      options.success(result);
                    },
                  },
                  aggregate: [{
                    field: 'EmployeeSales',
                    aggregate: 'average',
                  }],
                },
                series: [{
                  type: 'line',
                  field: 'EmployeeSales',
                  width: 1.5,
                  markers: {
                    visible: false,
                  },
                }],
                categoryAxis: {
                  type: 'date',
                  field: 'Date',
                  visible: false,
                  majorGridLines: {
                    visible: false,
                  },
                  majorTicks: {
                    visible: false,
                  },
                },
                legend: {
                  visible: false,
                },
                valueAxis: {
                  type: 'numeric',
                  visible: false,
                  labels: {
                    visible: false,
                  },
                  majorGridLines: {
                    visible: false,
                  },
                  majorTicks: {
                    visible: false,
                  },
                },
              });
              $('#team-sales').kendoChart({
                theme: 'metro',
                title: {
                  text: 'REPRESENTATIVE SALES VS. TOTAL SALES',
                  align: 'left',
                  font: '11px',
                  color: '#35373d',
                },
                autoBind: false,
                dataSource: {
                  transport: {
                    read(options) {
                      let result;
                      const startDate = options.data.startDate;
                      const endDate = options.data.endDate;
                      const employee = $.grep(employeeAndTeamSales, e => e.EmployeeID === options.data.EmployeeID)[0];
                      options.success(employee.Sales);
                    },
                  },
                },
                legend: {
                  position: 'bottom',
                },
                series: [{
                  field: 'EmployeeSales',
                  categoryField: 'Date',
                  name: 'Employee Sales',
                  aggregate: 'sum',
                }, {
                  field: 'TotalSales',
                  categoryField: 'Date',
                  name: 'Team Sales',
                  aggregate: 'sum',
                }],
                categoryAxis: {
                  type: 'date',
                  baseUnit: 'months',
                  majorGridLines: {
                    visible: false,
                  },
                },
                valueAxis: {
                  labels: {
                    format: '{0:c2}',
                    visible: false,
                  },
                  majorUnit: 25000,
                  line: {
                    visible: false,
                  },
                  majorGridLines: {
                    visible: false,
                  },
                },
                tooltip: {
                  visible: true,
                  format: '{0:c2}',
                },
              });

              $('#employee-sales').kendoScheduler({
                autoBind: false,
                date: new Date('1996, 7, 1'),
                views: ['month'],
                editable: false,
                timezone: 'Etc/UTC',
                dataSource: {
                  transport: {
                    read: {
                      url: './content/employee-sales.json',
                      crossDomain: true,
                      dataType: 'jsonp',
                      jsonp: false,
                      jsonpCallback: 'callback_es',
                    },
                  },
                  schema: {
                    model: {
                      fields: {
                        SaleID: {
                          type: 'number',
                        },
                        title: {
                          from: 'Title',
                          type: 'string',
                        },
                        description: {
                          from: 'Description',
                          type: 'string',
                        },
                        start: {
                          from: 'Start',
                          type: 'date',
                        },
                        startTimezone: {
                          from: 'StartTimezone',
                          type: 'string',
                        },
                        end: {
                          from: 'End',
                          type: 'date',
                        },
                        endTimezone: {
                          from: 'EndTimezone',
                          type: 'string',
                        },
                        recurrenceRule: {
                          from: 'RecurrenceRule',
                          type: 'string',
                        },
                        RecurrenceID: {
                          type: 'number',
                          defaultValue: null,
                        },
                        recurrenceException: {
                          from: 'RecurrenceException',
                          type: 'string',
                        },
                        isAllDay: {
                          from: 'IsAllDay',
                          type: 'boolean',
                        },
                        EmployeeID: {
                          type: 'number',
                          defaultValue: null,
                        },
                      },
                    },
                  },
                },
                resources: [{
                  field: 'EmployeeID',
                  title: 'Employee',
                  dataTextField: 'EmployeeName',
                  dataValueField: 'EmployeeID',
                  dataSource: {
                    transport: {
                      read: {
                        url: './content/employees-list-sales.json',
                        crossDomain: true,
                        dataType: 'jsonp',
                        jsonp: false,
                        jsonpCallback: 'callback_els',
                      },
                    },
                  },
                }],
              });
              $('#employeeBio').kendoTooltip({
                filter: 'a',
                content(e) {
                  return e.target.find('span').text();
                },
              });
            }

            $.when($.ajax({
              url: './content/employee-and-team-sales.json',
              crossDomain: true,
              dataType: 'jsonp',
              jsonp: false,
              jsonpCallback: 'callback_ets',
              success(data) {
                employeeAndTeamSales = data;
              },
            }),
              $.ajax({
                url: './content/employee-average-sales.json',
                crossDomain: true,
                dataType: 'jsonp',
                jsonp: false,
                jsonpCallback: 'callback_eas',
                success(data) {
                  employeeAverageSales = data;
                },
              }),
              $.ajax({
                url: './content/employee-quarter-sales.json',
                crossDomain: true,
                dataType: 'jsonp',
                jsonp: false,
                jsonpCallback: 'callback_eqs',
                success(data) {
                  employeeQuarterSales = data;
                },
              })).then(() => {
                initWidgets();
              });
            $('[data-toggle=offcanvas]').click(() => {
              $('.row-offcanvas').toggleClass('active');
            });
          }))}
        </script>
        <script type="text/x-kendo-tmpl" id="employeeItemTemplate">
          <div className="employee">
            <div className="employee-wrapper">
              <img src="./content/employees/#:EmployeeID#-t.png" className="img-responsive employee-list-image" />
              <dl className="employee-list-details">
                <dt className="name">#:FirstName# #:LastName# </dt>
                <dd className="title">#:Title# </dd>
              </dl>
            </div>
          </div>
        </script>
        <script type="text/x-kendo-tmpl" id="employeeBioTemplate">
          <div>
            <h3>ABOUT</h3>
            <img src="./content/employees/#:EmployeeID#.png" className="img-responsive employee-details-image" />
            <dl className="employee-bio-details">
              <dt className="name">#:FirstName# #:LastName#</dt>
              <dd className="title">#:Title#</dd>
              <dd className="phone"><span className="icon icon-mobile" />#:HomePhone#</dd>
              <dd>
                <a href="\\#" className="bioTooltip"> FULL BIO <span style="display:none;">#:Notes#</span></a>
              </dd>
            </dl>
          </div>
        </script>
      </Layout>
    );
  }
}

export default About;
