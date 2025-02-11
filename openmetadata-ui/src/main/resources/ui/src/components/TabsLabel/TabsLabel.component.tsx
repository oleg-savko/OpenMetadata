/*
 *  Copyright 2023 Collate.
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
import { Space } from 'antd';
import React from 'react';
import { getCountBadge } from 'utils/CommonUtils';
import { TabsLabelProps } from './TabsLabel.interface';

const TabsLabel = ({ name, count, isActive }: TabsLabelProps) => {
  return (
    <Space className="w-full" data-testid={name}>
      {name}
      {count && (
        <span className="p-l-xs" data-testid="count">
          {getCountBadge(count, '', isActive)}
        </span>
      )}
    </Space>
  );
};

export default TabsLabel;
