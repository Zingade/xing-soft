import './LevelCustom.scss';
import {formatNumberCustom} from '../utils/commonFunctions'

function LeveLineItem({amount}) {

    return (
      <div className="LevelLineItem">
        <h4>
          {`Current Month Expenses : ${formatNumberCustom(Math.floor(amount))}`}
        </h4>
      </div>
    );
  }

export default LeveLineItem;