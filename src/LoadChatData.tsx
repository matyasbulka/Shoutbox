import type {Chat} from './App'
export async function LoadChatData() : Promise<Chat> {
  const response = await fetch("https://bulkama23.sps-prosek.cz/React/Shoutbox/Backend/GetMessages.php");

  if (!response.ok)
  {
    throw new Error('Response status: {result}')

  }

  const result = await response.json();
  console.log(result);
  return result;

}
