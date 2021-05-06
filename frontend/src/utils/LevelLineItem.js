import './LevelCustom.scss';
import {formatNumberCustom} from '../utils/commonFunctions'

function LeveLineItem({inputText,amount}) {

    return (
      <div className="LevelLineItem">
        <h4>
          {inputText}{` ${formatNumberCustom(Math.floor(amount))}`}
        </h4>
      </div>
    );
  }

export default LeveLineItem;