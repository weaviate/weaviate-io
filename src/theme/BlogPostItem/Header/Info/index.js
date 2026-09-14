import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {usePluralForm} from '@docusaurus/theme-common';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';

import styles from './styles.module.scss';

function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();

  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);

    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description: 'Pluralized label for the estimated blog reading time',
          message: 'One min read|{readingTime} min read',
        },
        {readingTime},
      ),
    );
  };
}

function Spacer() {
  return <>{' · '}</>;
}

export default function BlogPostItemHeaderInfo({className}) {
  const {metadata} = useBlogPost();
  const {date, frontMatter, readingTime} = metadata;
  const readingTimePlural = useReadingTimePlural();

  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const publishedDate = new Date(date);
  const modifiedDateValue = frontMatter?.last_update?.date;
  const modifiedDate = modifiedDateValue
    ? new Date(modifiedDateValue)
    : null;

  return (
    <div className={clsx(styles.container, 'margin-vert--md', className)}>
      <time dateTime={publishedDate.toISOString()} itemProp="datePublished">
        {dateTimeFormat.format(publishedDate)}
      </time>
      {modifiedDate && (
        <>
          <Spacer />
          <span>
            Updated{' '}
            <time dateTime={modifiedDate.toISOString()} itemProp="dateModified">
              {dateTimeFormat.format(modifiedDate)}
            </time>
          </span>
        </>
      )}
      {typeof readingTime !== 'undefined' && (
        <>
          <Spacer />
          <span>{readingTimePlural(readingTime)}</span>
        </>
      )}
    </div>
  );
}
