import {useTranslation} from 'react-i18next';
import './LevelCustom.scss';

  
export const PRIMARY_STATISTICS_CUSTOM = [
  'monthly_2021',
  'overall_2021',
  'monthly_2020',
  'overall_2020',
];

export const STATISTIC_DEFINITIONS_CUSTOM = {
  monthly_2021: {
    displayName: 'Monthlhy 2021',
    format: 'int',
  },
  overall_2021: {
    displayName: 'Overall 2021',
    format: 'int',
  },
  monthly_2020: {
    displayName: 'Monthlhy 2020',
    format: 'int',
  },
  overall_2020: {
    displayName: 'Overall 2020',
    format: 'int',
  },
};

export const capitalizeCustom = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 1,
});


export const formatNumberCustom = (value, option, statistic) => {
  value = Math.floor(value);
  return numberFormatter.format(value) + (option === '%' ? '%' : '');
};

function PureLevelItemCustom({statistic, total, delta}) {
  const {t} = useTranslation();

 
  const statisticConfig = STATISTIC_DEFINITIONS_CUSTOM[statistic];

  return (
    <>
      <h5>{t(capitalizeCustom(statisticConfig.displayName))}</h5>
      <h4>
        {(delta > 0 ? (
                `+${formatNumberCustom(delta, statisticConfig.format, statistic)}`
          ) : (
            0
          )
        )}
      </h4>
      <h1>
        {
          formatNumberCustom(total, statisticConfig.format, statistic)
        }
      </h1>
    </>
  );
}

const LevelItemCustom = PureLevelItemCustom;

function LevelCustom({data}) {
  return (
    <div className="Level">
      {PRIMARY_STATISTICS_CUSTOM.map((statistic, index) => (
        <div
          key={index}
          className={`level-item is-${statistic}`}
        >
          <LevelItemCustom
            {...{statistic}}
            total={data.total[statistic]}
            delta={data.delta[statistic]}
            />
        </div>
      ))}
    </div>
  );
}

export default LevelCustom;
