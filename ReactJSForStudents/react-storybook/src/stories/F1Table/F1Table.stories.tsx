// import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { F1Table, type F1Driver } from './F1Table';

const SAMPLE_DATA: F1Driver[] = [
  { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', nationality: 'Netherlands', races: 22, wins: 17, podiums: 19, points: 454, bestFinish: 1 },
  { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes', nationality: 'United Kingdom', races: 22, wins: 1, podiums: 17, points: 240, bestFinish: 1 },
  { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', nationality: 'Monaco', races: 22, wins: 2, podiums: 9, points: 218, bestFinish: 1 },
  { position: 4, driver: 'Sergio Pérez', team: 'Red Bull Racing', nationality: 'Mexico', races: 22, wins: 1, podiums: 11, points: 290, bestFinish: 1 },
  { position: 5, driver: 'George Russell', team: 'Mercedes', nationality: 'United Kingdom', races: 22, wins: 0, podiums: 7, points: 170, bestFinish: 2 },
  { position: 6, driver: 'Carlos Sainz', team: 'Ferrari', nationality: 'Spain', races: 22, wins: 0, podiums: 6, points: 175, bestFinish: 2 },
  { position: 7, driver: 'Lando Norris', team: 'McLaren', nationality: 'United Kingdom', races: 22, wins: 0, podiums: 6, points: 160, bestFinish: 2 },
  { position: 8, driver: 'Fernando Alonso', team: 'Aston Martin', nationality: 'Spain', races: 22, wins: 0, podiums: 4, points: 110, bestFinish: 2 },
  { position: 9, driver: 'Esteban Ocon', team: 'Alpine', nationality: 'France', races: 22, wins: 0, podiums: 1, points: 80, bestFinish: 2 },
  { position: 10, driver: 'Pierre Gasly', team: 'Alpine', nationality: 'France', races: 22, wins: 0, podiums: 1, points: 66, bestFinish: 2 }
];

const meta: Meta<typeof F1Table> = {
  title: 'StoryDemos/F1Table',
  component: F1Table,
  tags: ['autodocs'],
  args: {
    data: SAMPLE_DATA,
    pageSize: 5,
    initialSortBy: 'points',
    initialSortDir: 'desc',
    showColumns: {}
  },
  argTypes: {
    pageSize: { control: { type: 'number' } },
    initialSortBy: { control: { type: 'select' }, options: ['position', 'driver', 'team', 'races', 'wins', 'podiums', 'points', 'pointsPerRace', 'winRate'] },
    initialSortDir: { control: { type: 'radio' }, options: ['asc', 'desc'] }
  }
};

export default meta;
type Story = StoryObj<typeof F1Table>;

export const Playground: Story = {
  args: {}
};

export const SortedByWinRate: Story = {
  args: {
    initialSortBy: 'winRate',
    initialSortDir: 'desc'
  }
};

export const FilteredExample: Story = {
  render: (args) => (
    <div>
      <F1Table {...(args as any)} />
      <p style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
        Tip: Use the filter box to search by driver, team, or nationality.
      </p>
    </div>
  ),
  args: {
    data: SAMPLE_DATA
  }
};

export const LargeDatasetPagination: Story = {
  render: (args) => {
    // create a larger dataset by duplicating with small variations
    const big: F1Driver[] = [];
    for (let i = 0; i < 45; i++) {
      const base = SAMPLE_DATA[i % SAMPLE_DATA.length];
      big.push({
        ...base,
        position: i + 1,
        driver: `${base.driver} ${Math.floor(i / SAMPLE_DATA.length) + 1}`,
        points: Math.max(0, base.points - i * 2)
      });
    }
    return <F1Table {...(args as any)} data={big} pageSize={10} />;
  }
};