"use client";

import React from 'react'
import { IStory } from '../../../services/stories';
import ApiClient from '../../../services/api-client';
import { Container } from './container';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';

type Props = {
  className?: string
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  }

  React.useEffect(() => {
    const fetchStories = async () => {
      const data = await ApiClient.stories.getAll();
      setStories(data);
      console.log(data);
    };

    fetchStories();
  }, []);

  return (
    <Container className={cn("flex items-center justify-between gap-2 my-10", className)}>
      {stories.length === 0 && [...Array(6)].map((_, index) => (
        <div key={index} className="w-[200px] h-[250px] bg-gray-200 animate-pulse rounded-md"></div>
      ))}

      {stories.map((story, index) => (
        <img
          key={index}
          src={story.previewImageUrl}
          alt={story.previewImageUrl}
          className="w-[200px] h-[250px] rounded-md cursor-pointer"
          onClick={() => onClickStory(story)}
        />
      ))}

      {open &&
        <div className='absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30'>
          <div className='relative' style={{ width: 520 }}>
            <button className='absolute -right-10 -top-5 z-30' onClick={() => setOpen(false)}>
              <X className='absolute top-0 right-0 w-8 h-8 text-white/50' />
            </button>

            <ReactStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={selectedStory?.items.map(item => ({ url: item.sourceUrl })) || []}
              defaultInterval={3000}
              width={520}
              height={800}
              />
          </div>
        </div>}
    </Container>
  )
}