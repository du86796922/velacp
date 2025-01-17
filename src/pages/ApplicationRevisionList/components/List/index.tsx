import React, { Component } from 'react';
import { Table } from '@b-design/ui';
import Empty from '../Empty';
import Translation from '../../../../components/Translation';
import type { ApplicationDetail, Revisions } from '../../../../interface/application';
import { statusList } from '../../constants';
import { momentDate } from '../../../../utils/common';
import { Link } from 'dva/router';
import './index.less';
import { If } from 'tsx-control-statements/components';
import locale from '../../../../utils/locale';

type Props = {
  list: Revisions[];
  getRevisionList: () => void;
  applicationDetail?: ApplicationDetail;
};

type State = {};

class TableList extends Component<Props, State> {
  //Todo
  onRollback = (record: Revisions) => {
    console.log(record);
  };

  getCloumns = () => {
    const { applicationDetail } = this.props;
    return [
      {
        key: 'version',
        title: <Translation>Release Number</Translation>,
        dataIndex: 'version',
        cell: (v: string) => {
          return <span>{v}</span>;
        },
      },
      {
        key: 'status',
        title: <Translation>Status</Translation>,
        dataIndex: 'status',
        cell: (v: string) => {
          const findObj = statusList.find((item) => item.value === v);
          if (findObj) {
            return <Translation>{findObj.label}</Translation>;
          }
          return '';
        },
      },
      {
        key: 'createTime',
        title: <Translation>Publish Time</Translation>,
        dataIndex: 'createTime',
        cell: (v: string) => {
          return <span>{v && momentDate(v)}</span>;
        },
      },
      {
        key: 'envName',
        title: <Translation>Environment</Translation>,
        dataIndex: 'envName',
        cell: (v: string) => {
          return (
            <span>
              <Link
                to={`/applications/${
                  applicationDetail && applicationDetail.name
                }/envbinding/${v}/instances`}
              >
                {v}
              </Link>
            </span>
          );
        },
      },
      {
        key: 'operation',
        title: <Translation>Actions</Translation>,
        dataIndex: 'operation',
        cell: (v: string, i: number, record: Revisions) => {
          return (
            <div>
              <If condition={record.status === 'complete'}>
                {/* <a
                  onClick={() => {
                    this.onRollback(record);
                  }}
                >
                  <Translation>Rollback</Translation>
                </a> */}
              </If>
            </div>
          );
        },
      },
    ];
  };

  render() {
    const { Column } = Table;
    const columns = this.getCloumns();
    const { list } = this.props;
    return (
      <div className="table-version-list  margin-top-20">
        <Table
          locale={locale.Table}
          primaryKey={'version'}
          className="customTable"
          rowHeight={40}
          dataSource={list}
          hasBorder={false}
          loading={false}
          emptyContent={<Empty />}
        >
          {columns && columns.map((col) => <Column {...col} key={col.key} align={'left'} />)}
        </Table>
      </div>
    );
  }
}

export default TableList;
