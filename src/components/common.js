import React, { useEffect, useState } from 'react';
import { useBlockstack } from 'react-blockstack'

export function useImage (url) {
  // fetch image as a blob
  // Todo: memoize?
  // TODO: Free the object url and blob -> url.revokeObjectURL()
  // TODO: Use undefined for image state until determined
  const [state, setState] = useState(null)
  useEffect(() => {
    if (url) {
      console.log("Fetch image into blob:", url)
      fetch(url.href, {method: "GET", mode: 'cors'})
      .then((response) => response.blob())
      .then((blob) => blob && setState(URL.createObjectURL(blob)))
          //.then((url) => setState(url))
      .catch((err) => console.warn("Failed fetching url:", err))
      }
    }, [url])
  return [state]
}

// soon to be in react-blockstack...
export function usePerson() {
  // Also see useProfile in react-blockstack
  // TODO: memoize avatar url so it is only fetched once
  const { userData, person } = useBlockstack()
  const { username } = userData || {}
  const [avatarUrl, setAvatar] = useState(null)
  useEffect(() => {
    const avatarUrl = (person && person.avatarUrl && person.avatarUrl())
    // const icon = avatarUrl && proxyUrl(avatarUrl)
    fetch(avatarUrl, {method: "GET", mode: 'cors'})
      .then((response) => {
        response.blob()
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => setAvatar(url))
      })
      .catch((err) => console.warn("Avatar Failed fetching url:", err))
  }, [person])
  // need better replace here!
  const username2 = username && username.replace(/.id.blockstack$/, "")

  return { avatarUrl , username: username2 }
}
