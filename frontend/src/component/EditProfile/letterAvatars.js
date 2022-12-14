import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

function stringToColor(string) {
  let hash = 0
  let i
  
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 120,
      height: 120,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

const LetterAvatars = ({ name = 'Alice Wonderland' }) => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar className="bg-success text-black"  {...stringAvatar(name)} />

      </Stack>
    </>
  )
}

export default LetterAvatars