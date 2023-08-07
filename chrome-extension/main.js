const host = 'http://127.0.0.1:8787';

/**
 * @param {string} message
 */
const setMessage = (message) => {
  const messageEl = document.getElementById('message');
  messageEl.textContent = message;
};

/**
 *
 * @param {'saving' | 'success' | 'error'} state
 */
const toggleView = (state) => {
  switch (state) {
    case 'saving':
      document.getElementById('saving').classList.remove('hidden');
      document.getElementById('success').classList.add('hidden');
      document.getElementById('error').classList.add('hidden');
      break;
    case 'success':
      document.getElementById('saving').classList.add('hidden');
      document.getElementById('success').classList.remove('hidden');
      document.getElementById('error').classList.add('hidden');
      break;
    case 'error':
      document.getElementById('saving').classList.add('hidden');
      document.getElementById('success').classList.add('hidden');
      document.getElementById('error').classList.remove('hidden');
      break;
    default:
      throw new Error('Invalid state');
  }
};

chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  toggleView('saving');
  if (tabs.length > 0) {
    const tab = tabs[0];
    const title = tab.title;
    const url = tab.url;
    try {
      await saveArticle(title, url);
      toggleView('success');
      return;
    } catch (e) {
      toggleView('error');
      setMessage(e);
      return;
    }
  } else {
    toggleView('error');
    setMessage('No active tab found');
    return;
  }
});

/**
 *
 * @param {string} title
 * @param {string} url
 */
const saveArticle = async (title, url) => {
  await fetch(host + '/api/v1/articles', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, url }),
  });
};
