/*
 *  Copyright 2022 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Drawer } from 'antd';
import classNames from 'classnames';
import Loader from 'components/Loader/Loader';
import { ThreadType } from 'generated/api/feed/createThread';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Thread } from '../../../generated/entity/feed/thread';
import { getEntityField, getEntityFQN } from '../../../utils/FeedUtils';
import ActivityFeedEditor from '../ActivityFeedEditor/ActivityFeedEditor';
import FeedPanelBodyV1 from '../ActivityFeedPanel/FeedPanelBodyV1';
import FeedPanelHeader from '../ActivityFeedPanel/FeedPanelHeader';
import { useActivityFeedProvider } from '../ActivityFeedProvider/ActivityFeedProvider';

interface ActivityFeedDrawerProps {
  open?: boolean;
  className?: string;
}

const ActivityFeedDrawer: FC<ActivityFeedDrawerProps> = ({
  open,
  className,
}) => {
  const { t } = useTranslation();
  const {
    focusReplyEditor,
    isDrawerLoading,
    hideDrawer,
    postFeed,
    selectedThread,
  } = useActivityFeedProvider();
  const entityField = selectedThread
    ? getEntityField(selectedThread.about)
    : '';
  const entityFQN = selectedThread ? getEntityFQN(selectedThread.about) : '';

  const onSave = (message: string) => {
    postFeed(message, selectedThread?.id ?? '').catch(() => {
      // ignore since error is displayed in toast in the parent promise.
      // Added block for sonar code smell
    });
  };

  return (
    <Drawer
      className={classNames('feed-drawer', className)}
      closable={false}
      open={open}
      title={
        isDrawerLoading ? (
          <div className="p-x-md p-y-sm">{t('label.activity-feed')}</div>
        ) : (
          <FeedPanelHeader
            className="p-x-md"
            entityFQN={entityFQN}
            entityField={entityField as string}
            threadType={selectedThread?.type ?? ThreadType.Conversation}
            onCancel={hideDrawer}
          />
        )
      }
      width={576}
      onClose={hideDrawer}>
      {isDrawerLoading ? (
        <Loader />
      ) : (
        <div id="feed-panel">
          <FeedPanelBodyV1 showThread feed={selectedThread as Thread} />
          <ActivityFeedEditor
            buttonClass="tw-mr-4"
            className="tw-ml-5 tw-mr-2 tw-mb-2"
            focused={focusReplyEditor}
            onSave={onSave}
          />
        </div>
      )}
    </Drawer>
  );
};

export default ActivityFeedDrawer;
