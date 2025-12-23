import { motion } from 'framer-motion';
import { IData, accuracyToCost } from '../../../../types';
import { RangeInput } from '../../Form/RangeInput/RangeInput';
//import { Badge } from '../../Badge/Badge';
import { useState } from 'react';

interface IAccuracyToCostProps {
  data: IData;
  updateValue: (name: string, value: string) => void;
}

export const AccuracyToCost = (props: IAccuracyToCostProps) => {
  const currentLevel = parseInt(
    props.data.accuracyToCost || '1'
  ) as keyof typeof accuracyToCost;
  // const currentConfig = accuracyToCost[currentLevel];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="accuracyToCost">
      {/* { 
      // <div className="badge-container">
      //   <Badge text={currentConfig.info} />
      //   {currentConfig.memoryCompression && (
      //     <Badge text={currentConfig.memoryCompression} />
      //   )}
      // </div>
      } */}

      <div className="accuracyToCost__slider">
        <RangeInput
          label="Accuracy/Cost"
          name="accuracyToCost"
          value={props.data.accuracyToCost}
          updateValue={props.updateValue}
          plan={props.data.plan}
          startExtra="Accuracy"
          endExtra="Cost"
          range={['1', '7']}
          step="1"
        />
        <div
          className="accuracyToCost__info-button-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            className="accuracyToCost__info-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ?
          </motion.button>
          {isHovered && (
            <motion.div
              className="accuracyToCost__tooltip"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p>
                Adjust this slider to prioritize either accuracy or cost by
                selecting among various index and compression configurations.
                Please note that, based on your current setup, adjustments to
                this slider may not impact the estimated cost.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
