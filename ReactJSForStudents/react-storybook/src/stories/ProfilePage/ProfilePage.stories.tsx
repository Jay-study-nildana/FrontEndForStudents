// import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfilePage } from './ProfilePage';
import type { ProfileData } from './ProfilePage';

const SAMPLE_PROFILE: ProfileData = {
  id: 'driver-1',
  name: 'Ava Thompson',
  handle: 'avathompson',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60&auto=format&fit=crop',
  coverUrl: 'https://images.unsplash.com/photo-1503264116251-35a269479413?w=1600&q=60&auto=format&fit=crop',
  location: 'Monaco',
  role: 'Product Designer',
  bio:
    'Designer, photographer and coffee enthusiast. I love crafting delightful interfaces and documenting UX patterns. Currently exploring generative design systems and small indie tools.',
  stats: { followers: 12400, following: 312, posts: 84 },
  contacts: [
    { label: 'Email', value: 'ava@example.com', href: 'mailto:ava@example.com' },
    { label: 'Website', value: 'avathompson.design', href: 'https://avathompson.design' },
    { label: 'Twitter', value: '@avathompson', href: 'https://twitter.com/avathompson' }
  ],
  gallery: [
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=60&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=60&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=60&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=800&q=60&auto=format&fit=crop'
  ],
  activity: [
    { id: 'a1', type: 'post', title: 'Launching a new micro-interaction library', timeAgo: '2d', excerpt: 'Sharing some patterns and lessons from shipping...' },
    { id: 'a2', type: 'comment', title: 'Re: Design tokens debate', timeAgo: '4d', excerpt: 'I think tokens should map to both CSS vars and JS values...' },
    { id: 'a3', type: 'like', title: 'Liked: Accessible dropdowns', timeAgo: '6d' }
  ]
};

const meta: Meta<typeof ProfilePage> = {
  title: 'StoryDemos/ProfilePage',
  component: ProfilePage,
  tags: ['autodocs'],
  args: {
    profile: SAMPLE_PROFILE,
    initialFollowing: false
  },
  argTypes: {
    onFollow: { action: 'followed' },
    initialFollowing: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Default: Story = {};

export const FollowingState: Story = {
  args: { initialFollowing: true }
};

export const MinimalProfile: Story = {
  render: (args) => {
    const minimal = {
      id: 'user-2',
      name: 'Sam Lee',
      handle: 'samlee',
      avatarUrl: 'https://via.placeholder.com/160',
      bio: 'Minimal profile with no gallery or activity'
    } as ProfileData;
    return <ProfilePage {...(args as any)} profile={minimal} />;
  }
};

export const LongBioAndManyImages: Story = {
  render: (args) => {
    const long = {
      ...SAMPLE_PROFILE,
      bio:
        SAMPLE_PROFILE.bio +
        ' '.repeat(10) +
        'Additional long paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. ' +
        'More content to test wrapping and truncation behaviors across breakpoints. '.repeat(6),
      gallery: Array.from({ length: 12 }).map(
        (_, i) => `https://picsum.photos/seed/picsum-${i}/600/400`
      )
    } as ProfileData;
    return <ProfilePage {...(args as any)} profile={long} />;
  }
};