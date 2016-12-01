async function handleError(response) {
  const resp = await response.json();
  throw new Error(resp.message);
}

function afterQuery(response) {
  if (!response.ok) {
    return handleError(response);
  }

  return response;
}

export default function query(params) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  return fetch('/api', {
    headers,
    mode: 'cors',
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ query: params })
  })
    .then(afterQuery)
    .then(response => response.json())
    .then(response => response.data);
}
