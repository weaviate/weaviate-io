import { motion } from 'framer-motion';
import { IData, accuracyToCost } from '../../../../types';
import { RangeInput } from '../../Form/RangeInput/RangeInput';
import { Badge } from '../../Badge/Badge';

interface IAccuracyToCostProps {
  data: IData;
  updateValue: (name: string, value: string) => void;
}

export const AccuracyToCost = (props: IAccuracyToCostProps) => {
  const currentLevel = parseInt(
    props.data.accuracyToCost || '1'
  ) as keyof typeof accuracyToCost;
  const currentConfig = accuracyToCost[currentLevel];

  return (
    <div className="accuracyToCost">
      <div className="badge-container">
        <Badge plan={props.data.plan} text={currentConfig.info} />
        {currentConfig.memoryCompression && (
          <Badge
            plan={props.data.plan}
            text={currentConfig.memoryCompression}
          />
        )}
      </div>

      <div className="accuracyToCost__slider">
        <RangeInput
          label="Accuracy/Cost"
          name="accuracyToCost"
          value={props.data.accuracyToCost}
          updateValue={props.updateValue}
          plan={props.data.plan}
          startExtra="Accuracy"
          endExtra="Cost"
          range={['1', '5']}
          step="1"
        />
      </div>
      <motion.div
        className="accuracyToCost__info"
        key={currentLevel}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      >
        <span className="accuracyToCost__info-label">Compression:</span>
        <span className="accuracyToCost__info-value">
          {currentConfig.compression}
        </span>
        <span className="accuracyToCost__info-separator">|</span>
        <span className="accuracyToCost__info-label">Index:</span>
        <span className="accuracyToCost__info-value">
          {currentConfig.index}
        </span>
      </motion.div>
    </div>
  );
};
