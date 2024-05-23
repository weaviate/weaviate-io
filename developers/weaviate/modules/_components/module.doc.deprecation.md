import Admonition from '@theme/Admonition';

export default function DocDeprecationNote({ provider }) {
  const url = `/developers/weaviate/model-providers/${provider}`;
  return (
    <div>
      <Admonition type="caution">
        This section of the documentation is deprecated and will be removed in the future.
        {provider && (
          <div>Please refer to the {``}<a href={url} target="_blank" rel="noreferrer">relevant model provider integration page</a> for the most up-to-date information.
          </div>
        )}
      </Admonition>
    </div>
  );
}
