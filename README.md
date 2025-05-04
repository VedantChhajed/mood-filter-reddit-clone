
# Reddit Clone with Toxicity Filter & Mood Tagging

This project is a functional web application that closely resembles Reddit's main feed and post pages, with added features for content moderation and mood categorization.

## Features

### Core Features

#### Toxicity Filter
- Toggle button to hide content identified as toxic
- Customizable toxicity threshold settings (strict, moderate, lenient)
- Visual indicators for potentially toxic content
- Blurred/hidden posts and comments when toxicity filter is enabled

#### Mood Tagging
- Posts are tagged with moods: Informative, Funny, Support, Rant, Question
- Color-coded mood badges on each post
- Filter system to view posts by specific moods
- Mood distribution statistics displayed in the sidebar

#### Visual Accuracy
- Faithful recreation of Reddit's layout and design
- Post feed with upvote/downvote functionality
- Comment threading system
- Sidebar with community information
- Post creation modal

#### Responsiveness
- Mobile and desktop friendly design
- Adaptive layout that works on various screen sizes

### Additional Features
- Dark mode support
- Simulated voting system with animations
- Comment collapsing functionality
- Toxicity warning when creating posts with potentially harmful content
- Mock data for demonstrating app functionality

## Tech Stack

- **Frontend Framework**: React
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **API Integration**: Mock data with simulated API calls

## Usage

### Toxicity Filtering
1. Toggle the "Hide Toxic Content" switch at the top of the feed
2. Adjust the toxicity threshold using the slider in the settings dropdown
3. Posts and comments detected as toxic will be hidden or visually marked

### Mood Filtering
1. Use the mood filter bar to select a specific mood
2. The feed will update to show only posts with the selected mood
3. Click "All" to see all posts regardless of mood

### Creating Posts
1. Click "Create Post" in the sidebar
2. Enter a title, content, and select a mood
3. If the content is detected as potentially toxic, you'll receive a warning

## Implementation Details

### Toxicity Detection
The app uses a simple keyword-based detection system for demonstration purposes. In a production environment, this could be replaced with:
- More sophisticated machine learning models
- Third-party toxicity detection APIs (like Perspective API)
- Community-based moderation systems

### Mood Tagging
The mood system is implemented with:
- Color-coded badges for visual distinction
- Filtering mechanism in the app context
- Distribution statistics calculated from post data

## Future Improvements

- User authentication system
- Real-time updates with WebSockets
- Actual backend integration with a database
- Enhanced toxicity detection using AI/ML models
- Expanded mood tagging with more categories and subcategories
- Community features like subreddits and user profiles

## License
This project is for demonstration purposes only.

