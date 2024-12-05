const RESOURCES_KEY = 'ugc_cloud_resources';
const POSTS_KEY = 'ugc_cloud_posts';

export const localStorageService = {
  // Resources
  getResources: () => {
    const resources = localStorage.getItem(RESOURCES_KEY);
    return resources ? JSON.parse(resources) : [];
  },

  saveResource: (resource) => {
    const resources = localStorageService.getResources();
    const newResource = {
      ...resource,
      id: Date.now(),
      downloads: 0,
      views: 0,
      likes: 0,
      date: new Date().toISOString()
    };
    resources.push(newResource);
    localStorage.setItem(RESOURCES_KEY, JSON.stringify(resources));
    return newResource;
  },

  // Posts
  getPosts: () => {
    const posts = localStorage.getItem(POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
  },

  savePost: (post) => {
    const posts = localStorageService.getPosts();
    const newPost = {
      ...post,
      id: Date.now(),
      likes: 0,
      comments: 0,
      shares: 0,
      date: new Date().toISOString()
    };
    posts.push(newPost);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    return newPost;
  }
}; 