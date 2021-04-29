import { lazy } from 'react';
import HeaderCellCustom from './HeaderCellCustom';
import {TABLE_COLUMNS} from '../constants/commonConstants'

// eslint-disable-next-line

const RowCustom = lazy(() => import('./RowCustom'));



function Table({
  data: states,
}) {

  const tableStatistics = TABLE_COLUMNS;
  return (
    <>

      <div className="table-container">
        <div
          className="table fadeInUp"
          style={{
            gridTemplateColumns: `repeat(${tableStatistics.length + 1}, auto)`,
          }}
        >
          <div className="row heading">
            <div className="cell heading">
              <div>Expense Category</div>
            </div>
            {tableStatistics.map((statistic) => (
              <HeaderCellCustom
                key={statistic}
                {...{statistic}}
              />
            ))}
          </div>

          {
            Object.keys(states)
            .filter(
              (stateCode) =>
                stateCode !== 'TT')
            .map((stateCode) => {
                return (
                  <RowCustom
                    key={stateCode}
                    data={states[stateCode]}
                    {...{
                      stateCode,
                    }}
                  />
                );
              })}
            <RowCustom
              key={'TT'}
              data={states['TT']}
              stateCode={'TT'}
              />
        </div>
      </div>
    </>
  );
}


export default Table;
