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
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import GlossaryVersion from './GlossaryVersion.component';

/* eslint-disable max-len */
const MOCK_VERSIONS_LIST = {
  entityType: 'glossary',
  versions: [
    '{"id":"305b0130-b9c1-4441-a0fc-6463fd019540","name":"Business_Glossary","fullyQualifiedName":"Business_Glossary","displayName":"Business Glossary","description":"Business Glossary","version":0.1,"updatedAt":1681762798036,"updatedBy":"suresh","reviewers":[],"owner":{"id":"eeca9594-abd5-4dde-bc38-8b411e821087","type":"user","name":"suresh","fullyQualifiedName":"suresh","displayName":"Suresh Srinivas","deleted":false},"tags":[],"deleted":false,"provider":"user","mutuallyExclusive":false}',
  ],
};

const MOCK_VERSION = {
  id: '305b0130-b9c1-4441-a0fc-6463fd019540',
  name: 'Business_Glossary',
  fullyQualifiedName: 'Business_Glossary',
  displayName: 'Business Glossary',
  description: 'Business Glossary',
  version: 0.1,
  updatedAt: 1681762798036,
  updatedBy: 'suresh',
  reviewers: [],
  owner: {
    id: 'eeca9594-abd5-4dde-bc38-8b411e821087',
    type: 'user',
    name: 'suresh',
    fullyQualifiedName: 'suresh',
    displayName: 'Suresh Srinivas',
    deleted: false,
  },
  tags: [],
  deleted: false,
  provider: 'user',
  mutuallyExclusive: false,
};

jest.mock('rest/glossaryAPI', () => ({
  getGlossaryVersionsList: jest
    .fn()
    .mockImplementation(() => Promise.resolve(MOCK_VERSIONS_LIST)),
  getGlossaryVersion: jest
    .fn()
    .mockImplementation(() => Promise.resolve(MOCK_VERSION)),
}));

jest.mock('components/Glossary/GlossaryV1.component', () => {
  return jest.fn().mockReturnValue(<>Glossary component</>);
});

jest.mock('components/containers/PageContainerV1', () => {
  return jest.fn().mockImplementation(({ children }) => <div>{children}</div>);
});
jest.mock('components/containers/PageLayoutV1', () => {
  return jest.fn().mockImplementation(({ children }) => <div>{children}</div>);
});

describe('GlossaryVersion', () => {
  it('renders glossary version', async () => {
    const glossaryName = '305b0130-b9c1-4441-a0fc-6463fd019540';
    const version = '0.1';

    render(
      <MemoryRouter
        initialEntries={[`/glossary/${glossaryName}/versions/${version}`]}>
        <Route path="/glossary/:glossaryName/versions/:version">
          <GlossaryVersion isGlossary />
        </Route>
      </MemoryRouter>
    );

    // Check that the version data is displayed
    expect(await screen.findByText('Glossary component')).toBeInTheDocument();

    // Check that the version timeline is displayed
    expect(
      screen.getByText('label.version-plural-history')
    ).toBeInTheDocument();

    // check active version visible
    expect(screen.getByText('v0.1')).toBeInTheDocument();
  });
});
