import type { IData } from '../../../../types';
import { optimizationProfiles } from '../../../../types';
import type { TOptimizationProfile } from '../../../../types/priceValues';

interface IOptimizationProfileProps {
  data: IData;
  updateValue: (n: string, v: string) => void;
  mini?: boolean;
}

const VECTOR_INDEX_DOCS =
  'https://docs.weaviate.io/weaviate/concepts/vector-index';
const VECTOR_QUANTIZATION_DOCS =
  'https://docs.weaviate.io/weaviate/concepts/vector-quantization';

const tileMeta: Record<
  TOptimizationProfile,
  { title: string; icon: string; iconClass: string; spec: string }
> = {
  'cost-optimized': {
    title: 'Cost Optimized',
    iconClass: 'is-cost',
    spec: 'Vector Index: HFRESH · Compression: AUTO',
  },
  'performance-optimized': {
    title: 'Performance Optimized',
    iconClass: 'is-perf',
    spec: 'Vector Index: HNSW · Compression: RQ-8',
  },
};

export const OptimizationProfile = (props: IOptimizationProfileProps) => {
  const items: TOptimizationProfile[] = [
    'cost-optimized',
    'performance-optimized',
  ];
  const selected = props.data.optimizationProfile;

  return (
    <div className="column optimizationProfile">
      <div className="label-with-badge">
        <div className="label">Optimization profile</div>
      </div>

      <div className="optimizationProfile__tiles">
        {items.map((id) => {
          const meta = tileMeta[id];
          const profile = optimizationProfiles[id];
          const isSelected = selected === id;

          return (
            <button
              key={id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => props.updateValue('optimizationProfile', id)}
              className={`optimizationProfile__tile${
                isSelected ? ' is-selected' : ''
              }`}
            >
              <span className="optimizationProfile__tileTop">
                <span
                  className={`optimizationProfile__icon ${meta.iconClass}`}
                  aria-hidden="true"
                >
                  {meta.icon}
                </span>
                {isSelected && (
                  <span className="optimizationProfile__check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </span>
              <span className="optimizationProfile__title">{meta.title}</span>
              <span className="optimizationProfile__desc">
                {profile.description}
              </span>
              <span className="optimizationProfile__spec">{meta.spec}</span>
            </button>
          );
        })}
      </div>

      <p className="optimizationProfile__docs">
        Learn more about{' '}
        <a href={VECTOR_INDEX_DOCS} target="_blank" rel="noreferrer">
          vector index types
        </a>{' '}
        and{' '}
        <a href={VECTOR_QUANTIZATION_DOCS} target="_blank" rel="noreferrer">
          compression
        </a>
        .
      </p>
    </div>
  );
};
