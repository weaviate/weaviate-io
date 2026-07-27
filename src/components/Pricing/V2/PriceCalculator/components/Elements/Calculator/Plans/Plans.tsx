import { ButtonGroup } from '../../Form/ButtonGroup/ButtonGroup';
import { Badge } from '../../Badge/Badge';
import type { IData, TPlan } from '../../../../types';
import { SHOW_PLUS_PLAN } from '../../../../../config/planVisibility';

interface IPlansProps {
  updateValue: (n: string, v: string) => void;
  data: IData;
  mini?: boolean;
}

const planDescriptions: Record<TPlan, string> = {
  flex: 'Pay-as-you-go with flexible scaling',
  plus: 'Annual commitment with predictable pricing',
  premium: 'Fixed capacity with predictable pricing',
};

export const Plans = (props: IPlansProps) => {
  const items: TPlan[] = SHOW_PLUS_PLAN
    ? ['flex', 'plus', 'premium']
    : ['flex', 'premium'];
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
