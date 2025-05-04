
export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export type MoodType = 'informative' | 'funny' | 'support' | 'rant' | 'question';

export interface Mood {
  type: MoodType;
  label: string;
  color: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  subreddit: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  mood: MoodType;
  toxicityScore?: number;
  image?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  toxicityScore?: number;
  replies: Comment[];
}

export const MOODS: Mood[] = [
  {
    type: 'informative',
    label: 'Informative',
    color: 'bg-mood-informative',
  },
  {
    type: 'funny',
    label: 'Funny',
    color: 'bg-mood-funny',
  },
  {
    type: 'support',
    label: 'Support',
    color: 'bg-mood-support',
  },
  {
    type: 'rant',
    label: 'Rant',
    color: 'bg-mood-rant',
  },
  {
    type: 'question',
    label: 'Question',
    color: 'bg-mood-question',
  },
];

export const getMoodColor = (mood: MoodType) => {
  const foundMood = MOODS.find(m => m.type === mood);
  return foundMood ? foundMood.color : 'bg-gray-300';
};

export const getMoodLabel = (mood: MoodType) => {
  const foundMood = MOODS.find(m => m.type === mood);
  return foundMood ? foundMood.label : 'Unknown';
};

export const MOCK_USERS: User[] = [
  { id: '1', username: 'redditor123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=redditor123' },
  { id: '2', username: 'techGuru42', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techGuru42' },
  { id: '3', username: 'memeQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=memeQueen' },
  { id: '4', username: 'newsJunkie', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newsJunkie' },
  { id: '5', username: 'angryUser', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=angryUser' },
  { id: '6', username: 'helpfulPerson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=helpfulPerson' },
  { id: '7', username: 'wildSpeculator', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wildSpeculator' },
  { id: '8', username: 'cryptoEnthusiast', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cryptoEnthusiast' },
  { id: '9', username: 'gameDevPro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gameDevPro' },
  { id: '10', username: 'realDoctor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=realDoctor' },
  { id: '11', username: 'notARobot', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=notARobot' },
  { id: '12', username: 'kittyLover99', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kittyLover99' },
  { id: '13', username: 'politicalAnalyst', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politicalAnalyst' },
];

export const TOXIC_KEYWORDS = [
  'stupid',
  'idiot',
  'hate',
  'loser',
  'dumb',
  'terrible',
  'awful',
  'garbage',
  'trash',
  'worthless',
  'moron',
  'pathetic',
  'useless',
  'nonsense',
  'joke',
  'scam',
  'ridiculous',
  'waste',
  'shut up',
  'crap'
];

// This simulates a toxicity detection algorithm that would normally use ML
export const analyzeToxicity = (text: string): number => {
  const lowercaseText = text.toLowerCase();
  let score = 0;
  
  TOXIC_KEYWORDS.forEach(word => {
    if (lowercaseText.includes(word)) {
      score += 0.2; // Each toxic word increases score by 20%
    }
  });
  
  // Add some randomness to simulate more complex analysis
  score += Math.random() * 0.3;
  
  // Clamp between 0 and 1
  return Math.min(Math.max(score, 0), 1);
};

export const isToxic = (item: Post | Comment, threshold: number = 0.5): boolean => {
  return (item.toxicityScore ?? 0) > threshold;
};

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Just launched my new website after 6 months of hard work!',
    content: 'After learning React and working nights and weekends, I finally finished my portfolio site. Check it out and let me know what you think!',
    author: MOCK_USERS[0],
    subreddit: 'webdev',
    createdAt: '2023-05-15T12:30:00Z',
    upvotes: 352,
    downvotes: 21,
    commentCount: 43,
    mood: 'informative',
    toxicityScore: 0.1,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  },
  {
    id: '2',
    title: 'My cat figured out how to open the treat drawer and I caught him red-pawed',
    content: 'This little criminal has been stealing treats for weeks and I finally caught him on camera. Too funny not to share!',
    author: MOCK_USERS[2],
    subreddit: 'cats',
    createdAt: '2023-05-16T09:15:00Z',
    upvotes: 2891,
    downvotes: 42,
    commentCount: 215,
    mood: 'funny',
    toxicityScore: 0.05,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
  },
  {
    id: '3',
    title: 'I\'m so tired of companies requiring 5 years of experience for entry-level jobs',
    content: 'Just got rejected from another "junior" position that wanted 5 years of experience with technologies that haven\'t even existed that long. This job market is garbage and nobody cares about new graduates.',
    author: MOCK_USERS[4],
    subreddit: 'jobs',
    createdAt: '2023-05-14T18:45:00Z',
    upvotes: 943,
    downvotes: 76,
    commentCount: 312,
    mood: 'rant',
    toxicityScore: 0.6,
  },
  {
    id: '4',
    title: 'Has anyone tried the new mental health app that was featured on Shark Tank?',
    content: 'I\'m struggling with anxiety and saw this new app that claims to help. It\'s called MindEase I think? Has anyone here actually used it and found it helpful?',
    author: MOCK_USERS[5],
    subreddit: 'mentalhealth',
    createdAt: '2023-05-16T14:20:00Z',
    upvotes: 67,
    downvotes: 3,
    commentCount: 28,
    mood: 'question',
    toxicityScore: 0.1,
  },
  {
    id: '5',
    title: 'For anyone going through a tough breakup right now',
    content: 'I know how it feels. Two months ago my partner of 5 years left, and I thought I\'d never be okay again. But I promise it gets better. Here are the things that have helped me the most...',
    author: MOCK_USERS[5],
    subreddit: 'relationships',
    createdAt: '2023-05-13T22:10:00Z',
    upvotes: 1245,
    downvotes: 31,
    commentCount: 189,
    mood: 'support',
    toxicityScore: 0.05,
  },
  {
    id: '6',
    title: 'New study shows promising results for Alzheimer\'s treatment',
    content: 'Researchers at Stanford have published a new study showing that the experimental drug ALZ-472 reduced brain plaque by 47% in early trials. This could be a major breakthrough.',
    author: MOCK_USERS[3],
    subreddit: 'science',
    createdAt: '2023-05-16T07:30:00Z',
    upvotes: 4521,
    downvotes: 142,
    commentCount: 476,
    mood: 'informative',
    toxicityScore: 0.0,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69',
  },
  {
    id: '7',
    title: 'This game is absolute trash and the developers should be ashamed',
    content: 'I paid $60 for this stupid game and it\'s full of bugs. The graphics are terrible, gameplay is awful, and the developers clearly don\'t care about their players. What a bunch of idiots. Don\'t waste your money like I did.',
    author: MOCK_USERS[4],
    subreddit: 'gaming',
    createdAt: '2023-05-15T16:50:00Z',
    upvotes: 73,
    downvotes: 248,
    commentCount: 92,
    mood: 'rant',
    toxicityScore: 0.85,
  },
  {
    id: '8',
    title: 'What\'s your favorite hidden gem restaurant in your city?',
    content: 'I\'m always looking for new places to try. Share your favorite local spot that not enough people know about! What makes it special?',
    author: MOCK_USERS[11],
    subreddit: 'food',
    createdAt: '2023-05-17T11:22:00Z',
    upvotes: 329,
    downvotes: 14,
    commentCount: 87,
    mood: 'question',
    toxicityScore: 0.0,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
  },
  {
    id: '9',
    title: 'Why is cryptocurrency such a scam? Everyone involved is trying to rip off normal people',
    content: 'It\'s just a giant pyramid scheme full of idiots who don\'t understand economics. The whole market is manipulation and lies to steal money from regular folks. Anyone defending crypto is probably part of the scam.',
    author: MOCK_USERS[7],
    subreddit: 'CryptoCurrency',
    createdAt: '2023-05-17T09:45:00Z',
    upvotes: 127,
    downvotes: 318,
    commentCount: 241,
    mood: 'rant',
    toxicityScore: 0.75,
  },
  {
    id: '10',
    title: 'How to help a friend who lost their job during COVID and is still struggling?',
    content: 'My friend was laid off in 2020 and still hasn\'t found stable work. They\'re getting increasingly depressed and I want to help but don\'t know how beyond just listening. Any suggestions from people who\'ve been through similar situations?',
    author: MOCK_USERS[6],
    subreddit: 'advice',
    createdAt: '2023-05-17T13:12:00Z',
    upvotes: 215,
    downvotes: 4,
    commentCount: 53,
    mood: 'support',
    toxicityScore: 0.0,
  },
  {
    id: '11',
    title: 'Breakthrough in quantum computing achieved by MIT researchers',
    content: 'Scientists at MIT have developed a new approach to quantum error correction that could significantly advance practical quantum computing. The technique uses a novel form of topological protection that maintains quantum coherence 10x longer than previous methods.',
    author: MOCK_USERS[10],
    subreddit: 'science',
    createdAt: '2023-05-17T08:30:00Z',
    upvotes: 1782,
    downvotes: 41,
    commentCount: 112,
    mood: 'informative',
    toxicityScore: 0.0,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
  },
  {
    id: '12',
    title: 'My dog learned how to get treats by pretending to pee outside',
    content: 'Every time she wants a treat, she asks to go outside, walks around for 10 seconds pretending to sniff, and then squats without actually peeing. Then she runs back in and sits by the treat jar expectantly. I\'ve been bamboozled by a 15lb poodle.',
    author: MOCK_USERS[2],
    subreddit: 'dogs',
    createdAt: '2023-05-17T15:24:00Z',
    upvotes: 3921,
    downvotes: 28,
    commentCount: 204,
    mood: 'funny',
    toxicityScore: 0.0,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
  },
];

export const MOCK_COMMENTS: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      content: 'This looks really impressive! What tech stack did you use?',
      author: MOCK_USERS[3],
      createdAt: '2023-05-15T13:10:00Z',
      upvotes: 42,
      downvotes: 0,
      toxicityScore: 0.0,
      replies: [
        {
          id: 'c1-r1',
          content: 'Thanks! I used React, TypeScript, and Tailwind CSS for the frontend. The backend is built with Node.js and Express, with a MongoDB database.',
          author: MOCK_USERS[0],
          createdAt: '2023-05-15T13:25:00Z',
          upvotes: 28,
          downvotes: 0,
          toxicityScore: 0.0,
          replies: [
            {
              id: 'c1-r1-r1',
              content: 'Nice choices! How are you handling state management?',
              author: MOCK_USERS[1],
              createdAt: '2023-05-15T13:40:00Z',
              upvotes: 12,
              downvotes: 0,
              toxicityScore: 0.0,
              replies: [],
            }
          ],
        }
      ],
    },
    {
      id: 'c2',
      content: 'The design is pretty good but the mobile responsiveness needs work. The text gets cut off on smaller screens.',
      author: MOCK_USERS[1],
      createdAt: '2023-05-15T14:05:00Z',
      upvotes: 15,
      downvotes: 2,
      toxicityScore: 0.2,
      replies: [],
    },
    {
      id: 'c3',
      content: 'This is garbage. Nobody cares about another portfolio site. What a waste of time.',
      author: MOCK_USERS[4],
      createdAt: '2023-05-15T15:22:00Z',
      upvotes: 2,
      downvotes: 47,
      toxicityScore: 0.68,
      replies: [
        {
          id: 'c3-r1',
          content: 'That\'s a really unnecessary and mean comment. People build these to learn and showcase their skills.',
          author: MOCK_USERS[5],
          createdAt: '2023-05-15T15:30:00Z',
          upvotes: 56,
          downvotes: 1,
          toxicityScore: 0.15,
          replies: [],
        },
        {
          id: 'c3-r2',
          content: 'Shut up you idiot. If you don\'t have anything useful to say, don\'t say anything at all.',
          author: MOCK_USERS[2],
          createdAt: '2023-05-15T15:35:00Z',
          upvotes: 12,
          downvotes: 18,
          toxicityScore: 0.72,
          replies: [],
        }
      ],
    },
    {
      id: 'c4',
      content: 'Have you considered adding a dark mode? It would make the site even better for night browsing.',
      author: MOCK_USERS[6],
      createdAt: '2023-05-15T16:15:00Z',
      upvotes: 32,
      downvotes: 0,
      toxicityScore: 0.0,
      replies: [],
    }
  ],
  '3': [
    {
      id: 'c5',
      content: 'This is just how the industry works. Stop complaining and get some experience through internships or personal projects.',
      author: MOCK_USERS[6],
      createdAt: '2023-05-14T19:20:00Z',
      upvotes: 8,
      downvotes: 32,
      toxicityScore: 0.45,
      replies: [
        {
          id: 'c5-r1',
          content: 'What a stupid take. Not everyone has the privilege to work for free as an intern. The system is broken and we should acknowledge that.',
          author: MOCK_USERS[4],
          createdAt: '2023-05-14T19:35:00Z',
          upvotes: 67,
          downvotes: 5,
          toxicityScore: 0.7,
          replies: [
            {
              id: 'c5-r1-r1',
              content: 'Both of you have valid points. The system IS broken, but we also have to find ways to work within it until it changes.',
              author: MOCK_USERS[5],
              createdAt: '2023-05-14T19:50:00Z',
              upvotes: 45,
              downvotes: 3,
              toxicityScore: 0.1,
              replies: [],
            }
          ],
        }
      ],
    },
    {
      id: 'c6',
      content: 'I feel your pain. I applied to over 200 positions before finally getting a job. Keep at it and try to network as much as possible.',
      author: MOCK_USERS[2],
      createdAt: '2023-05-14T20:15:00Z',
      upvotes: 52,
      downvotes: 0,
      toxicityScore: 0.1,
      replies: [],
    },
    {
      id: 'c7',
      content: 'You\'re probably just bad at interviewing or have a terrible resume. Companies need experienced people, not whiners.',
      author: MOCK_USERS[7],
      createdAt: '2023-05-14T21:05:00Z',
      upvotes: 3,
      downvotes: 41,
      toxicityScore: 0.65,
      replies: [],
    },
    {
      id: 'c8',
      content: 'The job market is awful right now. I\'m seeing the same thing in my field (healthcare).',
      author: MOCK_USERS[10],
      createdAt: '2023-05-14T22:30:00Z',
      upvotes: 28,
      downvotes: 2,
      toxicityScore: 0.2,
      replies: [],
    }
  ],
  '7': [
    {
      id: 'c9',
      content: 'This game definitely has issues but calling the developers idiots is just childish and doesn\'t help anything.',
      author: MOCK_USERS[0],
      createdAt: '2023-05-15T17:10:00Z',
      upvotes: 86,
      downvotes: 12,
      toxicityScore: 0.35,
      replies: [
        {
          id: 'c9-r1',
          content: 'Oh shut up. If they take our money they should deliver a working product. These developers are lazy and incompetent.',
          author: MOCK_USERS[4],
          createdAt: '2023-05-15T17:25:00Z',
          upvotes: 7,
          downvotes: 41,
          toxicityScore: 0.75,
          replies: [],
        }
      ],
    },
    {
      id: 'c10',
      content: 'I agree this game is complete trash. I asked for a refund after 30 minutes. The controls are garbage and the story makes no sense.',
      author: MOCK_USERS[12],
      createdAt: '2023-05-15T18:15:00Z',
      upvotes: 15,
      downvotes: 9,
      toxicityScore: 0.58,
      replies: [],
    },
    {
      id: 'c11',
      content: 'They\'re already working on patches. Give them some time to fix the issues before completely writing it off.',
      author: MOCK_USERS[9],
      createdAt: '2023-05-15T19:05:00Z',
      upvotes: 42,
      downvotes: 18,
      toxicityScore: 0.1,
      replies: [
        {
          id: 'c11-r1',
          content: 'No, stop defending this practice! Games should be complete and functional at launch. This is why the industry is going downhill.',
          author: MOCK_USERS[8],
          createdAt: '2023-05-15T19:20:00Z',
          upvotes: 56,
          downvotes: 7,
          toxicityScore: 0.35,
          replies: [],
        }
      ],
    },
  ],
  '9': [
    {
      id: 'c12',
      content: 'You clearly don\'t understand blockchain technology or decentralized finance. Do some research before posting such ignorant opinions.',
      author: MOCK_USERS[8],
      createdAt: '2023-05-17T10:15:00Z',
      upvotes: 47,
      downvotes: 12,
      toxicityScore: 0.4,
      replies: [
        {
          id: 'c12-r1',
          content: 'I\'ve done plenty of research, and everything points to it being a speculative bubble. You crypto cultists are so brainwashed.',
          author: MOCK_USERS[7],
          createdAt: '2023-05-17T10:25:00Z',
          upvotes: 22,
          downvotes: 15,
          toxicityScore: 0.6,
          replies: [
            {
              id: 'c12-r1-r1',
              content: 'Calling people "cultists" doesn\'t help your argument. There are legitimate uses for blockchain beyond speculation.',
              author: MOCK_USERS[1],
              createdAt: '2023-05-17T10:40:00Z',
              upvotes: 31,
              downvotes: 5,
              toxicityScore: 0.25,
              replies: [],
            }
          ],
        }
      ],
    },
    {
      id: 'c13',
      content: 'This post is ridiculous. Crypto has created wealth for millions of people and is revolutionizing finance. You\'re just mad you didn\'t buy early.',
      author: MOCK_USERS[8],
      createdAt: '2023-05-17T11:05:00Z',
      upvotes: 38,
      downvotes: 29,
      toxicityScore: 0.45,
      replies: [],
    },
    {
      id: 'c14',
      content: 'While I don\'t agree with your tone, there are definitely legitimate concerns about market manipulation and lack of regulation in crypto.',
      author: MOCK_USERS[10],
      createdAt: '2023-05-17T11:30:00Z',
      upvotes: 72,
      downvotes: 8,
      toxicityScore: 0.15,
      replies: [],
    },
    {
      id: 'c15',
      content: 'This is such a stupid post. You\'re an idiot who probably lost money and is now whining about it. Stay poor, loser.',
      author: MOCK_USERS[9],
      createdAt: '2023-05-17T12:10:00Z',
      upvotes: 5,
      downvotes: 64,
      toxicityScore: 0.9,
      replies: [],
    },
  ],
  '11': [
    {
      id: 'c16',
      content: 'This could be revolutionary for computational chemistry if it scales. Excited to see where this goes!',
      author: MOCK_USERS[10],
      createdAt: '2023-05-17T09:10:00Z',
      upvotes: 45,
      downvotes: 0,
      toxicityScore: 0.0,
      replies: [
        {
          id: 'c16-r1',
          content: 'Agreed! Especially for simulating complex molecular interactions that are currently impossible with classical computers.',
          author: MOCK_USERS[3],
          createdAt: '2023-05-17T09:25:00Z',
          upvotes: 32,
          downvotes: 0,
          toxicityScore: 0.0,
          replies: [],
        }
      ],
    },
    {
      id: 'c17',
      content: 'Quantum computing is just a waste of research money. We\'ve been hearing about breakthroughs for decades with no practical applications.',
      author: MOCK_USERS[7],
      createdAt: '2023-05-17T10:05:00Z',
      upvotes: 4,
      downvotes: 38,
      toxicityScore: 0.45,
      replies: [
        {
          id: 'c17-r1',
          content: 'That\'s completely wrong. Quantum computing is still an emerging field, and significant progress is being made. Many technologies take decades to mature.',
          author: MOCK_USERS[1],
          createdAt: '2023-05-17T10:20:00Z',
          upvotes: 27,
          downvotes: 2,
          toxicityScore: 0.3,
          replies: [],
        }
      ],
    },
  ],
  '12': [
    {
      id: 'c18',
      content: 'Dogs are so much smarter than we give them credit for! My lab does something similar with pretending to have to go potty right after dinner so she can get an extra treat.',
      author: MOCK_USERS[11],
      createdAt: '2023-05-17T15:45:00Z',
      upvotes: 87,
      downvotes: 0,
      toxicityScore: 0.0,
      replies: [],
    },
    {
      id: 'c19',
      content: 'You should train your dog better. This is just bad pet ownership that encourages manipulation.',
      author: MOCK_USERS[9],
      createdAt: '2023-05-17T16:10:00Z',
      upvotes: 4,
      downvotes: 52,
      toxicityScore: 0.55,
      replies: [
        {
          id: 'c19-r1',
          content: 'It\'s just a funny story, not a confession of bad ownership. Dogs are smart and find ways to communicate their wants. No need to be judgmental.',
          author: MOCK_USERS[6],
          createdAt: '2023-05-17T16:25:00Z',
          upvotes: 64,
          downvotes: 2,
          toxicityScore: 0.2,
          replies: [
            {
              id: 'c19-r1-r1',
              content: 'I\"m so sick of people like you defending lazy pet owners. This is exactly why so many dogs have behavioral issues.',
              author: MOCK_USERS[9],
              createdAt: '2023-05-17T16:40:00Z',
              upvotes: 3,
              downvotes: 43,
              toxicityScore: 0.7,
              replies: [],
            }
          ],
        }
      ],
    },
    {
      id: 'c20',
      content: 'This is the cutest thing I\'ve read all day! Please pay the dog tax (share a photo)!',
      author: MOCK_USERS[2],
      createdAt: '2023-05-17T17:00:00Z',
      upvotes: 103,
      downvotes: 0,
      toxicityScore: 0.0,
      replies: [],
    },
  ]
};

export const getMoodStats = (posts: Post[]): Record<MoodType, number> => {
  return posts.reduce((stats, post) => {
    stats[post.mood] = (stats[post.mood] || 0) + 1;
    return stats;
  }, {} as Record<MoodType, number>);
};

export const getPostComments = (postId: string): Comment[] => {
  return MOCK_COMMENTS[postId] || [];
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else if (diffInSeconds < 604800) {
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  } else if (diffInSeconds < 31536000) {
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  } else {
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num.toString();
  }
};
