import { ButtonGroup } from '../../Form/ButtonGroup/ButtonGroup';
import { Badge } from '../../Badge/Badge';
import type { IData, TPlan } from '../../../../types';

interface IPlansProps {
  updateValue: (n: string, v: string) => void;
  data: IData;
  mini?: boolean;
}

const planDescriptions: Record<TPlan, string> = {
  flex: 'Pay-as-you-go with flexible scaling',
  plus: 'Fixed capacity with predictable pricing',
  premium: 'Custom enterprise solutions',
};

export const Plans = (props: IPlansProps) => {
  const items: TPlan[] = ['flex', 'plus', 'premium'];
  const selectItem = (item: string) => props.updateValue('plan', item);

  return (
    <div className="column">
      <div className="label-with-badge">
        <div className="label">Plans</div>
        <Badge text={planDescriptions[props.data.plan]} />
      </div>
      <ButtonGroup
        items={items}
        value={props.data.plan}
        selectItem={selectItem}
        mini={props.mini}
      />
    </div>
  );
};
