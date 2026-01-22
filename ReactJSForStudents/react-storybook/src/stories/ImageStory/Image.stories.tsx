// import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';

const meta: Meta<typeof Image> = {
  title: 'StoryDemos/Image',
  component: Image,
  tags: ['autodocs'],
  args: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Colors_of_Bishwa_Ijtema.jpg',
    alt: 'Mountain landscape',
    width: 360,              // ensure numeric
    height: 200,             // ensure numeric
    fit: 'cover',
    loading: 'eager',        // changed from 'lazy' -> 'eager' for testing
    placeholder: undefined,  // avoid null placeholder handling
    fallbackSrc: 'https://via.placeholder.com/360x200?text=Fallback' // add simple fallback
  },
  argTypes: {
    fit: { control: 'radio', options: ['cover', 'contain', 'fill', 'none', 'scale-down'] },
    loading: { control: 'radio', options: ['lazy', 'eager'] },
    placeholder: { control: { disable: true } },
    src: { control: 'text' },
    alt: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Playground: Story = {
  args: {}
};

export const WithPlaceholderAndRadius: Story = {
  render: (args) => (
    <Image
      {...args}
      placeholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23E5E7EB'/%3E%3C/svg%3E"
      radius={8}
    />
  )
};

export const FallbackOnError: Story = {
  render: (args) => (
    <Image
      {...args}
      src="https://example.invalid/this-image-does-not-exist.jpg"
      fallbackSrc="https://via.placeholder.com/600x400?text=Fallback"
      width={320}
      height={180}
    />
  )
};

export const Decorative: Story = {
  render: (args) => (
    <figure style={{ width: 320 }}>
      <Image {...args} alt="" />
      <figcaption style={{ marginTop: 8, color: '#6b7280', fontSize: 13 }}>Decorative image (alt="")</figcaption>
    </figure>
  ),
  args: { alt: '' }
};

export const ResponsiveSrcSet: Story = {
  render: (args) => (
    <Image
      {...args}
      src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=60&auto=format&fit=crop"
      srcSet={
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=60&auto=format&fit=crop 400w, ' +
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=60&auto=format&fit=crop 800w, ' +
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1200&q=60&auto=format&fit=crop 1200w'
      }
      sizes="(max-width: 600px) 100vw, 600px"
      width="100%"
      height={320}
      fit="cover"
    />
  )
};