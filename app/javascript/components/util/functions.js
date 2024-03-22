export function csrfToken() {
  return document.querySelector('meta[name=csrf-token]').content
}

export function requestJsonHeaders() {
  return {
    headers: {
      "Content-Type": "application/json"
    }
  }
}
